import React, { useEffect } from 'react';
import classes from './PowerBtn.module.css';

const PowerBtn = (props) => {
    const handler = props.updatePower;
    useEffect (() => {
        //Using the slide prop, we are just making sure transition is smooth.
        //Here, we actually change the power value. 
        const powerSlider = document.getElementById("powerSlider");
        const text = document.getElementById("text");
        powerSlider.addEventListener("mouseup", () => {
            handler();
        })
        text.addEventListener("mouseup", () => {
            handler();
        })
    }, [handler]);
    
    let positionText;
    let backgroundColor;
    if (props.powerSlideValue === 100) {
        positionText = "42%";
        backgroundColor = "#3dbe41";
    }
    else {
        positionText = "49%";
        backgroundColor = "rgb(250, 25, 25)" 
    }
    

    return (
        <React.Fragment>
            <input 
            style={{
                backgroundColor: backgroundColor
            }}
            id="powerSlider"
            value={props.powerSlideValue}
            onChange={props.slide}
            onMouseDown={props.mouseDown}
            className={classes.slider} type="range"></input>
            <p 
            style={{
                left: positionText
            }}
            id="text"
            onMouseDown={props.mouseDown}
            className={classes.text}>{props.powerSlideValue ===  100 ? "ON" : "OFF"}</p>
        </React.Fragment>
    );
}

export default PowerBtn;