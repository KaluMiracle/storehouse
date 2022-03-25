
import { useRef } from 'react';
import React from 'react';
import styles from './input-container.module.scss';

//A Component for geting user Input

const InputContianer = ({
    inputId = '',
    labelText,
    handler,
    displayProp = '',
}) => {

    

    return (
        <div className={styles.inputContainer} style= {{display: displayProp, ...styles}}>
            <label>{`${labelText}`}</label>
            <input id={inputId} type={inputId==='price'? 'number' : 'text'} onMouseOut={
                (e) => handler(e.target.value)
            }/>
        </div>
    )
};

export default InputContianer;