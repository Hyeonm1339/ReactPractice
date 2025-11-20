import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from "next/head";

export default function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHeandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        router.push('/');

    }

    return <>
        <Head>
            <title>Add a New Meetup</title>
            <meta name="descriptiopn"
                  content="신규 등록화면."/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHeandler}/></>
}