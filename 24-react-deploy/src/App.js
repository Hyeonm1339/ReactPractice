import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from './pages/Home';
import PostPage, {loader as postLoader} from './pages/Post';
import RootLayout from './pages/Root';
import {lazy, Suspense} from "react";
// import BlogPage, { loader as postsLoader } from './pages/Blog';

//import함수는 프로미스를 반환한다 (JSX코드가 아님. 그러므로 리액트에서 제공하는 lazy 함수를 사용하여야 정상적인 지연로딩이 가능)
const BlogPage = lazy(() => import('./pages/Blog'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'posts',
                children: [
                    // { index: true, element: <BlogPage />, loader: postsLoader },
                    {
                        index: true,
                        element: //Suspense 리액트에서 제공하는 컴포넌트로, 지연로딩이 필요한 컴포넌트를 감싸서 fallback 설정이 가능하다.
                        //즉 BlogPage가 로딩되는 시간동안 Suspense가 <p>..</p>를 대신보여주는 역할.
                            (<Suspense fallback={<p>Loading...</p>}>
                                <BlogPage/>
                            </Suspense>),
                        //import문을 통해 Promise객체가 반환되고, then을 통해 반환된 후 필요한 함수를 호출한다.(import문을 활용한 지연로딩)
                        loader: () =>
                            import('./pages/Blog').then(module => module.loader())
                    },
                    {path: ':id', element: <PostPage/>, loader: postLoader},
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
