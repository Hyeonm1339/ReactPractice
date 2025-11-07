import {Link, redirect, useNavigate, useNavigation, useParams, useSubmit} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import {useQuery} from "@tanstack/react-query";
import {fetchEvent, updateEvent, queryClient} from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
    const navigate = useNavigate();
    const {state} = useNavigation() //현재 상태를 확인하기위해 state를꺼내온다.
    const submit = useSubmit();
    const params = useParams();

    const {data, isError, error} = useQuery({
        queryKey: ['events', params.id],
        queryFn: ({signal}) => fetchEvent({signal, id: params.id}),
        staleTime: 5000 //캐시된 데이터가 5초미만인경우는 조회X 시간이지나면 재조회하도록 처리.
    })

    // const {mutate} = useMutation({
    //     mutationFn: updateEvent,
    //     //mutate를 호출하는 즉시 실행됨(리턴 받기전에)
    //     onMutate: async (data) => {
    //         const newEvent = data.event;
    //
    //         await queryClient.cancelQueries({queryKey: ['events', params.id]});
    //         const previousEvent = queryClient.getQueryData(['events', params.id])
    //         queryClient.setQueryData(['events', params.id], newEvent);
    //         return {previousEvent}
    //     },
    //     onError: (error, data, context) => {
    //         queryClient.setQueryData(['events', params.id], context.previousEvent);
    //     },
    //     //mutate가 완료될때마다 실행
    //     onSettled: () => {
    //         queryClient.invalidateQueries(['events', params.id]);
    //     }
    // })

    function handleSubmit(formData) {
        // mutate({
        //     id: params.id,
        //     event: formData
        // })
        // navigate('../');
        submit(formData, {method: 'PUT'}); //HTTP통신을 하는것이 아닌 하단의 action함수를 호출할뿐이다.
    }

    function handleClose() {
        navigate('../');
    }

    let content;

    if (isError) {
        content = <>
            <ErrorBlock
                title="Failed to load event"
                message={error.info?.message || "Fail..."}/>
            <div className="form-actions">
                <Link to="../" className="button">
                    Okay
                </Link>
            </div>
        </>
    }

    if (data) {
        content =
            <EventForm inputData={data} onSubmit={handleSubmit}>
                {state === 'submitting' ? <p>Sending Data...</p> : <>
                    <Link to="../" className="button-text">
                        Cancel
                    </Link>
                    <button type="submit" className="button">
                        Update
                    </button>
                </>}
            </EventForm>
    }

    return (
        <Modal onClose={handleClose}>
            {content}
        </Modal>
    );
}

export function loader({params}) {
    return queryClient.fetchQuery({
        queryKey: ['events', params.id],
        queryFn: ({signal}) => fetchEvent({signal, id: params.id})
    })
}

export async function action({request, params}) {
    const formData = await request.formData(); //리액트라우터에 존재하는 내장함수 (전송된 데이터를 받을 수 있음)
    const updatedEventData = Object.fromEntries(formData); //키 밸류구조의 객체로변환

    await updateEvent({id: params.id, event: updatedEventData});
    await queryClient.invalidateQueries(['evnets']);
    return redirect('../'); //리액트 라우터에서 제공하는 함수로, 다른페이지로 이동처리함.(라우터)
}
