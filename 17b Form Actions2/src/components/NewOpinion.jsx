import {useActionState, useContext} from 'react';
import {OpinionsContext} from "../store/opinions-context.jsx";
import Submit from "./Submit.jsx";

export function NewOpinion() {
    const {addOpinion} = useContext(OpinionsContext);


    async function shareOpinionAction(preveState, formData) {
        const title = formData.get('title');
        const body = formData.get('body');
        const userName = formData.get('userName');

        let errors = [];

        if (title.trim().length < 5) {
            errors.push('제목의 길이가 너무 짧습니다.');
        }
        if (body.trim().length < 10 || body.trim().length > 300) {
            errors.push('본문은 10자이상, 300자 이하여야 합니다.')
        }

        if (!userName.trim()) {
            errors.push('이름을 입력해주세요.');
        }
        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    title,
                    body,
                    userName
                }
            };
        }

        //서브밋처리는 이따가 진행.
        await addOpinion({title, body, userName});

        return {errors: null};
    }

    const [formState, formAction] = useActionState(
        shareOpinionAction, {errors: null}
    );

    return (
        <div id="new-opinion">
            <h2>Share your opinion!</h2>
            <form action={formAction}>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="userName">Your Name</label>
                        <input type="text" id="userName" name="userName"
                               defaultValue={formState.enteredValues?.userName}/>
                    </p>

                    <p className="control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
                    </p>
                </div>
                <p className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
                </p>

                {formState.errors &&
                    <ul className="errors">
                        {formState.errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                }
                <Submit/>

            </form>
        </div>
    );
}
