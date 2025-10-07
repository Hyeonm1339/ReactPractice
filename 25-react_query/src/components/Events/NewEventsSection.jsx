
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import {useQuery} from "@tanstack/react-query";
import {fetchEvents} from "../../util/http.js";

export default function NewEventsSection() {

    //구조분해 가능, data에는 결과값이 담겨있다.
    //isPending에는 처리중인지 여부값이 담겨있다.
    //isError에는 에러가 발생했는지 여부. ( queryFn함수에서 error를 발행하도록 구성되어야 확인가능)
    //그외에도 다양한 리턴값이 존재
    const {data, isPending, isError, error} = useQuery({
        //실제 요청을 처리할때 사용할 함수를 정의.(프로미스를 반환해야함)
        queryFn: fetchEvents,
        //useQuery를 사용할때 입력한 쿼리키로 데이터를 캐시처리함.(동일한 요청을 전송하면 이전응답을 재사용가능)
        //신규 데이터가 넘어오기 전까지 이전데이터를 사용한다.
        queryKey: ['events'],
        //캐시된 데이터가 있을때 업데이트된 데이터를 전송하기전에 대기시간 설정(기본값 0)
        //5000으로 설정시, 화면에 5초이상 머무르고 돌아오는경우에만 재 호출을 한다 와 같은 개념으로 이해.(불필요한 요청 방지)
        staleTime: 5000,
        //가비지 수집시간, 데이터와 캐시를 얼마나 오랫동안 보관할지 (기본값은 5분)
        //30초가 지나면 삭제한다.
        // gcTime: 30000
    });

    let content;

    if (isPending) {
        content = <LoadingIndicator/>;
    }

    if (isError) {
        content = (
            <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events.'}/>
        );
    }

    if (data) {
        content = (
            <ul className="events-list">
                {data.map((event) => (
                    <li key={event.id}>
                        <EventItem event={event}/>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <section className="content-section" id="new-events-section">
            <header>
                <h2>Recently added events</h2>
            </header>
            {content}
        </section>
    );
}
