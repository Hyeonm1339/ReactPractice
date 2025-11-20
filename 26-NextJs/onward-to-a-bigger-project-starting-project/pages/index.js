import MeetupList from "@/components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is a second meetup'
//     }
// ]


export default function HomePage(props) {
    //useEffect를 통한 데이터 조회방식은, 검색엔진 최적화가 불가능, 우선 빈배열로 초기화하여 코드가 생성되고 이후 클라이언트 사이드 렌더링처리로 인해
    // 이후에 데이터를 불러와 보여주므로, 검색엔진, 크롤러등이 조회시에는 비어있는 HTML만 존재한다.
    // const [loadedMeetups, setLoadedMeetups] = useState([])
    // useEffect(() => {
    //     //가상의 백엔드 요청이 이루어지고, 데이터를 받아온다.
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);


    return <>
        <Head>
            <title>React Meetups</title>
            <meta name="descriptiopn" content="browse a huge list of highly active React meetups!"/>
        </Head>
        <MeetupList meetups={props.meetups}/>
    </>
}
//정적렌더링 방식 (함수명은 불변이다.)
//컴포넌트를 렌더링하기 전에 Next가 먼저 해당 함수를 호출해서 처리한다. (async 처리를 통해, 함수가 종료될때까지 기다리게된다)
//캐싱처리에 용이하고, 불변에 데이터가 존재하는경우 정적프롭스 사용이 유용하다.
export async function getStaticProps() {
    //여기에 작성하는 모든코드는 클라이언트에 표기되지 않는다, (빌드중에만 실행된다. 서버에도, 클라이언트에도 작성되지 않는다.)

    const uri = "mongodb+srv://jhjimess_db_user:XUBRhmVJSZ7w5DJY@cluster0.dr7andv.mongodb.net/meetups?appName=Cluster0";
    const client = new MongoClient(uri);

    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    //.toArray()를 처리해야 배열로 받는다.
    const meetups = await meetupsCollection.find().toArray();

    client.close()

    //모든처리가 끝난후 항상 객체만을 반환해야 한다.
    return {
        props: { //여기서 작성된 props는 HomePage의 props로 전달된다.
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        //점진적 정적생성
        revalidate: 10 //초단위로 표시한다. -> 10초라면 10초마다 서버에서 페이지를 다시 정적으로 빌드한다는 의미.
    };
}

//빌드중에는 실행되지 않는다. (요청이 들어올떄마다 실행된다)
//매 요청마다 작업을 진행하나, 요청이 들어올떄까지는 페이지가 만들어지지않고 기다리는 단점이 있다.
//또한 바뀌는 데이터가 없다면 궂이 사용할 필요가 없다.
// export async function getServerSideProps(context){
//     //필요한 처리를 진행한다... getStaticProps와 마찬가지로, 서버에서 실행된다. 사용자노출은 없다.
//
//     //컨텍스트를 파라미터로 받아서, 요청과 응답으로 분리해서 인증등과 같은 작업을 처리가 가능하다.
//     const req = context.req;
//     const res = context.res;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }