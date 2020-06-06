import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Watch extends Component {
    constructor(props) {
        super(props);
        this.offset=props.offset;
        this.date=this.genNewDate(this.offset);

        this.interval=null;
        this.getMSSector=360.0/1000;
        this.getSecondSector=360.0/60;
        this.getMinuteSector=360.0/60;
        this.getHourSector=360.0/12;
        this.state={
            date:this.genNewDate(props.offset),
        };
        this.secondAngle=0;
        this.minuteAngle=0;
        this.hourAngle=0;
        this.name=props.name;
        this.interval=props.interval;
    }

    getTimeArray(date)
    {
        const minutes=date.getUTCMinutes();
        const seconds=date.getUTCSeconds();
        const hours=date.getUTCHours();
        const ms=date.getUTCMilliseconds();
        return {hours:hours,minutes:minutes,seconds:seconds,ms:ms};
    };

    genNewDate(offset)
    {
        let date=new Date();
        const curOffset=date.getTimezoneOffset()/60;
        const curHours=date.getUTCHours();
//        console.log(offset+' '+curHours+' '+curOffset);
        const newOffset=parseInt(offset)+curHours;
        date.setUTCHours(newOffset);
        return date;
    }

    updateDate()
    {
        const date=this.genNewDate(this.offset);
        const time=this.getTimeArray(date);
        const ms=time.ms;

        this.secondAngle=(this.getSecondSector*time.seconds)+this.getSecondSector*(this.getMSSector*ms)/360.0;
        this.minuteAngle=(this.getMinuteSector*time.minutes)+this.getMinuteSector*this.secondAngle/360.0;
        this.hourAngle=(this.getHourSector*time.hours)+this.getHourSector*this.minuteAngle/360.0;

        if (this.state.date!==date)
            this.setState({date:date})

    }

    componentDidMount() {
        this.interval=window.setInterval(()=>this.updateDate(),this.interval);

    }


    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    getStyle(param)
    {

        return {transform:'rotate(' + param  + 'deg)'};
    }

    render() {
        return (
            <div>
                <h3>{this.name}</h3>
                <div className="watch">
                    <div className="watch-face">
                        <div className="watch-face-outline">
                        </div>

                        <div className="watch-face-centre">
                            <div className="watch-face-centre-inner" />
                        </div>

                        <div className="watch-face-hands">
                            <div className="watch-face-hand hour" style={this.getStyle(this.hourAngle)} />
                            <div className="watch-face-hand minute" style={this.getStyle(this.minuteAngle)} />
                            <div className="watch-face-hand second" style={this.getStyle(this.secondAngle)} />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

Watch.defaultProps= {
    interval: 100,
}

Watch.propTypes = {};

export default Watch;