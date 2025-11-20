import MeetupDetail from "@/components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";

export default function MeeupDetails(props) {
    // const router = useRouter();
    // const meetupId = router.query.meetupId;
    return <>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </>
}

export async function getStaticPaths() {
    const uri = "mongodb+srv://jhjimess_db_user:XUBRhmVJSZ7w5DJY@cluster0.dr7andv.mongodb.net/meetups?appName=Cluster0";
    const client = new MongoClient(uri);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

    client.close();

    return {
        // paths: [
        //     {params: {meetupId: 'm1'}},
        //     {params: {meetupId: 'm2'}}
        // ],
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        })),
        fallback: true //false로 설정하면, 지원되는 모든 path를 전달한다, (m3와 같은값이 들어오면 에러가발생함.)
        //true로 설정하면 넥스트가 들어오는 요청을 확인해서 동적으로 생성한다. 없는값이 들어와도 동적설정함. 즉 페이지가 자주변동되는경우 true설정이 필요하다.
    }
}

//페이지가 빌드될때 작동한다. 동적페이지이므로, 모든 페이지를 미리 동적 생성 할 수가없다.(빌드시점에)
export async function getStaticProps(context) {
    //데이터를 조회하는 코드를 작성한다.
    const meetupId = context.params.meetupId;

    const uri = "mongodb+srv://jhjimess_db_user:XUBRhmVJSZ7w5DJY@cluster0.dr7andv.mongodb.net/meetups?appName=Cluster0";
    const client = new MongoClient(uri);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId)
    });

    client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }

}