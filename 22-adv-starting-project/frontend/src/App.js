// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
// 도전/연습

// 1. 5개의 새로운 (더미) 페이지 구성 요소를 추가합니다(콘텐츠는 간단한 <h1> 요소일 수 있음).
// - HomePage
// - EventsPage
// - EventDetailPage
// - NewEventPage
// - EditEventPage
// 2. 이 5개 페이지에 대한 라우팅 및 경로 정의를 추가합니다.
// - / => HomePage
// - /events => EventsPage
// - /events/<some-id> => EventDetailPage
// - /events/new => NewEventPage
// - /events/<some-id>/edit => EditEventPage
// 3. 모든 페이지 구성 요소 위에 <MainNavigation> 구성 요소를 추가하는 루트 레이아웃을 추가합니다.
// 4. MainNavigation에 제대로 작동하는 링크를 추가합니다.
// 5. MainNavigation의 링크가 활성화될 때 "active" 클래스를 받는지 확인합니다.
// 6. 더미 이벤트 목록을 출력합니다. EventsPage
// 모든 목록 항목에는 해당 EventDetailPage 링크가 포함되어야 합니다.
// 7. EventDetailPage에서 선택한 이벤트의 ID를 출력합니다.
// 보너스: 모든 /events... 페이지 구성 요소 위에 <EventNavigation> 구성 요소를 추가하는 또 다른 (중첩된) 레이아웃 경로를 추가합니다.
import {createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage,{loader as eventsLoader} from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/RootLayout";
import EventsRootLayout from "./pages/EventsRootLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {
                path: 'events', element: <EventsRootLayout/>, children: [
                    {
                        index: true, element: <EventsPage/>, loader: eventsLoader
                    },
                    {path: ':eventId', element: <EventDetailPage/>},
                    {path: 'new', element: <NewEventPage/>},
                    {path: ':eventId/edit', element: <EditEventPage/>},
                ]
            }
        ]

    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App;
