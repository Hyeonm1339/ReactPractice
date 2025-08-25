import {Link, useParams} from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

export default function EventDetailPage() {

    //Link객체로 넘어온 값을 받을수있는 라우터 함수.
    const params = useParams();

    console.log(params)


    return <>
        <EventsNavigation/>
        <h1>Event Details!</h1>
        <p>Event Id: {params.eventId}</p>
    </>
}