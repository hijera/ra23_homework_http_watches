import React, {useState} from 'react';
import PropTypes from 'prop-types';
import WatchList from "./WatchList";
import WatchForm from "./WatchForm";
import WatchModel from "../models/WatchModel";

WatchApp.propTypes = {};

function WatchApp(props) {
    const [watches, setWatches] = useState([]);
    const handleAdd = item => {
        setWatches([...watches, new WatchModel(item.name, item.timezone)]);
    };

    const handleRemove = id => {
        setWatches([...watches.filter(watch => (watch.id !== id))]);
    };
    return (
        <div>
            <WatchForm onAdd={handleAdd}/>
            <WatchList onRemove={handleRemove} watches={watches}/>
        </div>
    );
}

export default WatchApp;