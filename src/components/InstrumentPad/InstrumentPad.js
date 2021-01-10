import React from 'react';
import classes from './InstrumentPad.module.css';

const instrumentPad = (props) => {
    return (
        <div id={props.idForOuterDiv} className={classes.instrumentPad + " " + props.class} onClick={props.clicked}>
            {props.children}
            <audio 
            id={props.idForAudio}
            className="clip" 
            src={props.audio}>Your browser does not support the audio element</audio>
        </div>)
}

export default instrumentPad;