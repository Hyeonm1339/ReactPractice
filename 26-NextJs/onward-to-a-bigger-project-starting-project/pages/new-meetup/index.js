import NewMeetupForm from "@/components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
    function addMeetupHeandler(enteredMeetupData) {
        console.log(enteredMeetupData);

    }

    return <NewMeetupForm onAddMeetup={addMeetupHeandler}/>
}