import {useAccordionContext} from "./Accordion.jsx";
import AccordionTitle from "./AccordionTitle.jsx";
import AccordionContent from "./AccordionContent.jsx";
import {createContext, useContext} from "react";

const AccordItemContext = createContext();

export function useAccordionItemContext() {
    const ctx = useContext(AccordItemContext);

    if(!ctx){
        throw new Error('useAccordionItemContext는 AccordionItem 내에서 사용해야 합니다.');
    }

    return ctx;

}

const AccordionItem = ({id,className, children}) => {


    return <AccordItemContext.Provider value={id}>
        <li className={className}>
            {children}
        </li>
    </AccordItemContext.Provider>
}

export default AccordionItem;