import {useAccordionContext} from "./Accordion.jsx";
import {useAccordionItemContext} from "./AccordionItem.jsx";

const AccordionTitle = ({className, children}) => {

    const {toggleItem} = useAccordionContext();
    const id = useAccordionItemContext()

    return (
        <h3
            className={className}
            onClick={() => toggleItem(id)}>
            {children}
        </h3>
    )
}
export default AccordionTitle;