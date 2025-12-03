import {createContext, useContext, useState} from "react";
import AccordionItem from "./AccordionItem.jsx";
import AccordionTitle from "./AccordionTitle.jsx";
import AccordionContent from "./AccordionContent.jsx";

/**
 * Accordion 컴포넌트에서 사용할 Context를 생성합니다.
 * 이 Context는 하위 컴포넌트들(Accordion.Item, .Title, .Content) 간에
 * 상태와 핸들러 함수를 공유하기 위해 사용됩니다.
 */
const AccordionContext = createContext();

/**
 * Accordion 컴포넌트의 Context를 사용하기 위한 커스텀 훅입니다.
 * @returns {Object} - openItemId와 toggleItem 함수를 포함한 컨텍스트 값
 * @throws {Error} - Accordion 컴포넌트 외부에서 사용될 경우 에러 발생
 */
export function useAccordionContext() {
    const ctx = useContext(AccordionContext);

    if (!ctx) {
        throw new Error('useAccordionContext는 반드시 Accordion 컴포넌트 내부에서 사용되어야 합니다.');
    }
    return ctx;
}

/**
 * 아코디언 UI를 구현하는 메인 컴포넌트입니다.
 * 컴포지션 패턴을 사용하여 유연한 컴포넌트 구조를 제공합니다.
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {React.ReactNode} props.children - 하위 컴포넌트들 (Accordion.Item, .Title, .Content)
 * @param {string} [props.className] - ul 요소에 적용할 추가 CSS 클래스명
 * @returns {React.ReactElement} - 아코디언 UI를 렌더링하는 React 엘리먼트
 */
export default function Accordion({children, className}) {
    // 현재 열려있는 아코디언 아이템의 ID를 관리하는 상태
    const [openItemId, setOpenItemId] = useState(null);

    /**
     * 아코디언 아이템을 토글하는 함수
     * @param {string|number} id - 토글할 아이템의 고유 식별자
     */
    function toggleItem(id) {
        // 클릭한 아이템이 이미 열려있다면 닫고, 닫혀있다면 해당 아이템을 엽니다.
        setOpenItemId(prevState => prevState === id ? null : id);
    }

    // Context를 통해 하위 컴포넌트에 전달할 값들
    const contextValue = {
        openItemId,    // 현재 열려있는 아이템의 ID
        toggleItem,    // 아이템 토글 함수
    };

    // Context.Provider로 하위 컴포넌트들을 감싸서 상태와 핸들러를 공유
    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={className} role="region" aria-label="아코디언 메뉴">
                {children}
            </ul>
        </AccordionContext.Provider>
    );
}

// 컴포지션 API를 사용하여 서브 컴포넌트들을 연결
// 이렇게 하면 <Accordion.Item>과 같은 형태로 사용할 수 있습니다.
Accordion.Item = AccordionItem;     // 개별 아코디언 아이템을 감싸는 컨테이너
Accordion.Title = AccordionTitle;   // 아코디언 제목(클릭 가능)
Accordion.Content = AccordionContent; // 아코디언 내용(토글 가능)