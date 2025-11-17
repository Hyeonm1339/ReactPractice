'use client';

import {useFormStatus} from "react-dom";

export default function MealsFormSubmit(props) {
    const {pending} = useFormStatus();
    return <button disabled={pending}>{pending ? '등록중...' : '등록하기'}</button>
}