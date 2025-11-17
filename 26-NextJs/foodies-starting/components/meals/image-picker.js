'use client'
import classes from './image.picker.module.css'
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {

    const [pickedImage, setPickedImage] = useState()

    const imageInputRef = useRef();

    function handlePickClick() {
        imageInputRef.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null)
            return;
        }
        const fileReader = new FileReader();

        //파일리더에 파일이 들어올때, 실행된다.(readAsDataURL에 의해.
        fileReader.onload = () => {
            //파일의 경로(url)
            const url = fileReader.result;
            setPickedImage(url);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>이미지가 선택되지 않았습니다.</p>}
                    {pickedImage && <Image src={pickedImage} alt="Picked" fill/>}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg"
                    ref={imageInputRef}
                    multiple
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>
                    이미지 선택
                </button>
            </div>
        </div>
    )
}