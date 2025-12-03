import {useRef, useState} from "react";

export default function SearchableList({items, children, itemKeyFn}) {
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    const searchResults = items.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()));

    function handleChange(event) {
        //setTimeout이 존재한다면 비워준다. 즉 0.5밀리초이내에 글자가 계속입력될경우 렌더링을 처리하지 않는다.
        lastChange.current && clearTimeout(lastChange.current);
        lastChange.current = setTimeout(() => {
            lastChange.current = null;
            setSearchTerm(event.target.value)
        }, 500);
    }

    return <div className="searchable-list">
        <input type="search" placeholder="검색어를 입력하세요." onChange={handleChange}/>
        <ul>
            {searchResults.map((item, index) =>
                <li key={itemKeyFn(item)}>
                    {children(item)}
                </li>
            )}
        </ul>
    </div>
}
