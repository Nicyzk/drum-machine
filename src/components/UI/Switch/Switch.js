import React from 'react';
import classes from './Switch.module.css';

const Switch = (props) => {
    return (
        <div className={classes.switchContainer}>
            <label className={classes.label}>Heater Kit</label>
            <label 
            className={classes.switch}>
                <input 
                type="checkbox" 
                disabled={props.power === 100 ? false : true}/>
                <span 
                onClick={props.power === 100 ? props.clicked : null}
                className={classes.slider + " " + classes.round}></span>
            </label>
            <label className={classes.label}>Smooth Piano Kit</label>
        </div>
    );
}

export default Switch;