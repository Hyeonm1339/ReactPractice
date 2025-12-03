import {useAccordionContext} from "./Accordion.jsx";
import {useAccordionItemContext} from "./AccordionItem.jsx";

const AccordionContent = ({children, className}) => {

    const {openItemId} = useAccordionContext();
    const id = useAccordionItemContext();

    const isOpen = openItemId === id;

    return <div
        className={
            isOpen ? `${className ?? ''} open` : `${className ?? ''} close`
        }>
        {children}
    </div>

}
export default AccordionContent;