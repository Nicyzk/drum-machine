import React, { useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import classes from './VolumeSlider.module.css';


const VolumeSlider = (props) => {
    
    useEffect(() => {
        //Hover over volumeBtn and show slider
        const volumeBtn = document.getElementById("volumeBtn");
        const blockingDiv = document.getElementById("blockingDiv");
        const volumeContainer = document.getElementById("volumeContainer");
        volumeBtn.addEventListener("mouseover", () => {
            blockingDiv.style.width = "0";
            blockingDiv.style.transform = "translateX(130px)";
        });
        volumeContainer.addEventListener("mouseleave", () => {
            blockingDiv.style.transform = "translateX(0)";
            blockingDiv.style.width = "140px";
        //
        })
    }, []);

    return (
    <div id="volumeContainer" className={classes.volumeContainer}>
        <i 
        id="volumeBtn" 
        className={"fa fa-volume-up " + classes.volumeBtn} 
        onClick={props.clicked}></i>
        <div className={classes.sliderContainer}>
            <input 
            className={classes.slider} 
            type="range" 
            value={props.volume} 
            onChange={props.changed}></input>
            <div id="blockingDiv" className={classes.blockingDiv}></div>
        </div>
    </div>
    )
}

export default VolumeSlider;