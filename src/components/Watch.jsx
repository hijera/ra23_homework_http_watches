import React, {Component} from 'react';
import PropTypes from 'prop-types';

const getMSSector = 360.0 / 1000;
const getSecondSector = 360.0 / 60;
const getMinuteSector = 360.0 / 60;
const getHourSector = 360.0 / 12;

class Watch extends Component {
    constructor(props) {
        super(props);

        this.interval =  null;
        this.state = {
            date: this.genNewDate(this.props.offset),
        };
    }

    getTimeArray(date) {
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const hours = date.getUTCHours();
        const ms = date.getUTCMilliseconds();
        return {hours: hours, minutes: minutes, seconds: seconds, ms: ms};
    };

    genNewDate(offset) {
        let date = new Date();
        const curHours = date.getUTCHours();
        const newOffset = parseInt(offset) + curHours;
        date.setUTCHours(newOffset);
        return date;
    }

    updateDate() {
        const date = this.genNewDate(this.props.offset);
        if (date!==this.state.date)
            this.setState({date: date});

    }

    getAngles()
    {
        const time = this.getTimeArray(this.state.date);
        const ms = time.ms;

        /* Производим сглаживание движения стрелок путем прибавления миллисекунд к секундам, секунд к минутам, минут к часам*/
        const secondAngle = (getSecondSector * time.seconds) + getSecondSector * (getMSSector * ms) / 360.0;
        const minuteAngle = (getMinuteSector * time.minutes) + getMinuteSector * secondAngle / 360.0;
        const hourAngle = (getHourSector * time.hours) + getHourSector * minuteAngle / 360.0;
        return {second:secondAngle,minute:minuteAngle,hour:hourAngle};
    }

    componentDidMount() {
        this.updateDate();
        this.interval = window.setInterval(() => this.updateDate(), this.props.intervalTime);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }


    getStyle(param) {
        return {transform: 'rotate(' + param + 'deg)'};
    }

    render() {
        return (
            <div className={"watch-element"}>
                <h3>{this.props.name}</h3>
                <div className="watch">
                    <div className="watch-face">
                        <div className="watch-face-outline">
                        </div>
                        <div className="watch-face-centre">
                            <div className="watch-face-centre-inner"/>
                        </div>
                        <div className="watch-face-hands">
                            <div className="watch-face-hand hour" style={this.getStyle(this.getAngles().hour)}/>
                            <div className="watch-face-hand minute" style={this.getStyle(this.getAngles().minute)}/>
                            <div className="watch-face-hand second" style={this.getStyle(this.getAngles().second)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Watch.defaultProps = {
    intervalTime: 100,
    offset: 0,
    name: 'Unknown'
};

Watch.propTypes = {
    intervalTime: PropTypes.number,
    offset: PropTypes.number,
    name: PropTypes.string
};

export default Watch;