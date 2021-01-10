import React, { Component } from 'react';
import classes from './DrumMachine.module.css';
import InstrumentPad from '../../components/InstrumentPad/InstrumentPad';
import VolumeSlider from '../../components/UI/VolumeSlider/VolumeSlider';
import PowerBtn from '../../components/UI/PowerBtn/PowerBtn';
import Switch from '../../components/UI/Switch/Switch';

class DrumMachine extends Component {
    state = {
        power: 100,
        powerSlideValue: 100,
        activeBank: "heaterKit",
        displayText: "Heater Kit",
        volume: 50,
        heaterKit: [
            {
                keyCode: 81,
                key: "Q",
                id: "Heater 1",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            },
            {
                keyCode: 87,
                key: "W",
                id: "Heater 2",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
            },
            {
                keyCode: 69,
                key: "E",
                id: "Heater 3",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
            },
            {
                keyCode: 65,
                key: "A",
                id: "Heater 4",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
            },
            {
                keyCode: 83,
                key: "S",
                id: "Clap",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
            },
            {
                keyCode: 68,
                key: "D",
                id: "Open HH",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
            },
            {
                keyCode: 90,
                key: "Z",
                id: "Kick n' Hat",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
            },
            {
                keyCode: 88,
                key: "X",
                id: "Kick",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
            },
            {
                keyCode: 67,
                key: "C",
                id: "Closed HH",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
            }
        ],
        smoothPianoKit: [
            {
                keyCode: 81,
                key: "Q",
                id: "Chord 1",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
            },
            {
                keyCode: 87,
                key: "W",
                id: "Chord 2",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
            },
            {
                keyCode: 69,
                key: "E",
                id: "Chord 3",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
            },
            {
                keyCode: 65,
                key: "A",
                id: "Shaker",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
            },
            {
                keyCode: 83,
                key: "S",
                id: "Open HH",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
            },
            {
                keyCode: 68,
                key: "D",
                id: "Closed HH",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
            },
            {
                keyCode: 90,
                key: "Z",
                id: "Punchy-Kick",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
            },
            {
                keyCode: 88,
                key: "X",
                id: "Side Stick",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
            },
            {
                keyCode: 67,
                key: "C",
                id: "Snare",
                audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            }
        ]
    }

    attachListenerToWindowHandler = () => {
        const keyPressListener = (event) => {
            const soundArray = this.state[this.state.activeBank];
            for (let sound of soundArray) {
                if (event.keyCode === sound.keyCode) {
                    const instrument = document.getElementById(sound.key);
                    let displayText;
                    if (this.state.power === 100) {
                        instrument.volume = this.state.volume/100;
                        displayText = sound.id;
                    } else {
                        instrument.volume = 0;
                        displayText = "";
                    }
                    instrument.currentTime=0;
                    instrument.play();
                    this.setState({
                        displayText: displayText
                    })
                    //Note play() is asynchronous. This means the sound will play while other code continues to run
                    //The result is you can press the key again to trigger the listener before the sound has finished
                    //playing. THe caveat is that the sound begins from where it left off, therefore we have to make
                    //it restart from the beginning using currentTime. 
                    
                }
            }
        }
        document.addEventListener("keydown", keyPressListener);
    }

    instrumentPadClickedHandler = (id, key) => {
        const instrument = document.getElementById(key);
        let displayText;
        if (this.state.power === 100) {
            instrument.volume = this.state.volume/100;
            displayText = id;
        } else {
            instrument.volume = 0;
            displayText = "";
        }
        instrument.play()
        this.setState({
            displayText: displayText
        })
    }

    volumeChangedHandler = (event) => {
        this.setState({
            volume: event.target.value
        })
    }

    volumeBtnClickedHandler = () => {
        let volume = this.state.volume;
        volume = volume > 0 ? 0 : 50;
        this.setState({
            volume: volume
        })
    }

    powerSwitchHandler = () => {
        let power = this.state.power < 100 ? 100 : 0;
        this.setState({
            power: power
        })
    }

    bankSwitchHandler = () => {
        let bank = this.state.activeBank === "heaterKit" ? "smoothPianoKit" : "heaterKit";
        let displayText = this.state.activeBank === "heaterKit" ? "Smooth Piano Kit" : "Heater Kit";
        this.setState({
            activeBank: bank,
            displayText: displayText
        })
    }

    powerSlideHandler = (event) => {
        this.setState({
            powerSlideValue: event.target.value
        })
    }

    updatePowerSlideToActualPowerHandler = () => {
        let displayText;
        if (this.state.power === 100) {
            displayText = this.state.activeBank === "heaterKit" ? "Heater Kit" : "Smooth Piano Kit";
        } else {
            displayText = "";
        }
        this.setState({
            powerSlideValue: this.state.power,
            displayText: displayText
        })
    }

    componentDidMount () {
        this.attachListenerToWindowHandler();
    }

    render () {    
        const instrumentPads = this.state[this.state.activeBank].map( sound => {
            return (
                <InstrumentPad 
                class="drum-pad"
                idForOuterDiv={sound.id}
                idForAudio={sound.key}
                key={sound.id}
                audio={sound.audioUrl}
                clicked={() => this.instrumentPadClickedHandler(sound.id, sound.key)}>
                    {sound.key}
                </InstrumentPad>)
        })

        return (
            <div className={classes.background}>
                <div id="drum-machine" className={classes.drumContainer}>
                <div className={classes.padContainer}>
                    {instrumentPads}
                </div>
                <div className={classes.controlsContainer}>
                    <PowerBtn 
                    slide={this.powerSlideHandler}
                    mouseDown={this.powerSwitchHandler}
                    powerSlideValue={this.state.powerSlideValue}
                    updatePower={this.updatePowerSlideToActualPowerHandler}
                    power={this.state.power}
                    />
                    <div id="display" className={classes.display}>{this.state.displayText}</div>
                    <VolumeSlider 
                    clicked={this.volumeBtnClickedHandler} 
                    changed={this.volumeChangedHandler}
                    volume={this.state.volume}/>
                    <Switch
                    activeBank={this.state.activeBank}
                    clicked={this.bankSwitchHandler}
                    power={this.state.power}/>
                </div> 
            </div>
            </div>

        );
    }
}

export default DrumMachine;