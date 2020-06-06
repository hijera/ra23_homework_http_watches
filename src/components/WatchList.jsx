import React from 'react';
import PropTypes from 'prop-types';
import Watch from "./Watch";

WatchList.propTypes = {

};

function WatchList(props) {
    const { onRemove,watches } =props;
    const removeHandler = (evt,id) => {
        evt.preventDefault();
        onRemove(id);
    };
    return (
        <div className={"watch-container"}>
            { watches.map(watch=><div className={"watch-item"} key={watch.id}><Watch offset={watch.timezone}  name={watch.name}/>
            <button onClick={(evt)=>removeHandler(evt,watch.id)}>x</button> </div>)}
        </div>
    );
}

export default WatchList;