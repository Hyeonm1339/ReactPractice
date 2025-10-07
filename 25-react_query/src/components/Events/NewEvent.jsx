import {Link, useNavigate} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import {useMutation} from "@tanstack/react-query";
import {createNewEvent, queryClient} from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";


export default function NewEvent() {
    const navigate = useNavigate();

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: createNewEvent,
        //mutationFn이 성공하면 발생하는 콜백이벤트 같은개념.
        onSuccess: () => {
            //exact(true) = 쿼리키가 완전히 일치하는 항목만 재요청.
            queryClient.invalidateQueries({queryKey: ['events'], exact: false})
            navigate("/events");
        }
    })

    function handleSubmit(formData) {
        mutate({
            event: formData
        })
    }

    return (
        <Modal onClose={() => navigate('../')}>
            <EventForm onSubmit={handleSubmit}>
                {isPending && 'Submitting...'}
                {!isPending &&
                    <>
                        <Link to="../" className="button-text">
                            Cancel
                        </Link>
                        <button type="submit" className="button">
                            Create
                        </button>
                    </>
                }
            </EventForm>
            {isError &&
                <ErrorBlock title="Filied to create event" message={error.info?.message || 'Failed to create event.'}/>}
        </Modal>
    );
}
