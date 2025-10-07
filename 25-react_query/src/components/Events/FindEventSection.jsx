import {useRef, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchEvents} from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";

export default function FindEventSection() {
    const searchElement = useRef();

    const [searchTerm, setSearchTerm] = useState()

    //isPending과 isLoading차이
    //isLoading - 처음 데이터를 불러올때,(첫렌더링시사용)
    //isPending - 데이터를 요청중일때(refetch)
    const {data,isLoading, isError, error} = useQuery({
        queryKey: ['events', {search: searchTerm}],
        queryFn: ({signal}) =>
            fetchEvents({signal, searchTerm}),
        //최초 화면진입시에는 searchTerm이 undefined이므로, false(쿼리실행X 이후에는 검색을 통해 값이 들어가므로 항시 true값이된다.)
        enabled: searchTerm !== undefined
    })

    function handleSubmit(event) {
        event.preventDefault();
        setSearchTerm(searchElement.current.value);
    }

    let content = <p>Please enter a search term and to find events.</p>

    if (isLoading) {
        content = <LoadingIndicator/>
    }

    if (isError) {
        content =
            <ErrorBlock
                title="An error occurred"
                message={error.info?.message || 'Failed to fetch Events.'}
            />
    }

    if (data) {
        content = <ul className="events-list">
            {data.map(event => (
                <li key={event.id}>
                    <EventItem event={event}/>
                </li>
            ))}
        </ul>
    }

    return (
        <section className="content-section" id="all-events-section">
            <header>
                <h2>Find your next event!</h2>
                <form onSubmit={handleSubmit} id="search-form">
                    <input
                        type="search"
                        placeholder="Search events"
                        ref={searchElement}
                    />
                    <button>Search</button>
                </form>
            </header>
            {content}
        </section>
    );
}
