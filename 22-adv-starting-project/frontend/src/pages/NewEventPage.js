import EventForm from "../components/EventForm";
import {redirect} from "react-router-dom";

export default function NewEventPage() {
    return <EventForm/>
}

export async function action({request, params}) {
    const data = await request.formData();

    const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        date: data.get("date"),
        description: data.get("description"),
    }
    console.log(eventData)

    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
    })

    if(!response.ok) {
        throw new Error({message: 'Could not save event.'},{
            status: 500
        })
    }

    return redirect('/events')
}