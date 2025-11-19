import Link from "next/link";

export default function NewsPage() {
    return <>
        <h1>뉴스 페이지</h1>
        <ul>
            <li>
                <Link href="/news/nextjs-is-a-greate-framework">
                    NextJS Is A Greate Framework
                </Link>
            </li>
            <li>SomeThing Else</li>
        </ul>
    </>
}