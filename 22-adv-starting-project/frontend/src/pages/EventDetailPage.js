import {Link, useLoaderData, useParams, useRouteLoaderData} from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {

    const data = useRouteLoaderData('event-detail')

    // const data = useLoaderData();
    console.log(data)


    return <>
        <EventItem event={data.event}/>
    </>
}

export async function loader({request, params}) {
    const id = params.eventId

    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw new Error({message: 'Could not fetch details for selected event.'}, {
            status: 500
        })
    } else {
        return response;
    }
}