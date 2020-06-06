import React, {useState} from 'react';
import PropTypes from 'prop-types';

WatchForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

function WatchForm(props) {
    const { onAdd } = props;
    const [form,setForm] = useState({
        name:'',
        timezone:'',
    });

    const numHandler = item => {
        const numMatch=item.match(/^\-?(0|[1-9]|[1-2][0-9])?$/i);
        const emptyMatch=(item.length===0);
        if (emptyMatch)
            return true;
        if (numMatch)
        {
            if (!numMatch[1])
                return true;
            return (numMatch[1]>=0 && numMatch[1]<=24) ? true : false;
        }
        else return false;

    };

    const handlers={
        name:null,
        timezone:numHandler,
    };

    const onFormChange = evt => {
        const { target }= evt;
        if (!handlers[target.name] || (handlers[target.name] && handlers[target.name](target.value)))
            setForm({...form,[target.name]:target.value});
    };
    const onSubmit = evt => {
        evt.preventDefault();
        onAdd(form);
    };

    return (
        <div>
            <form className="add-form" onSubmit={onSubmit} >
                <div className="form-field">
                    <label htmlFor="name">Название</label>
                    <input name="name" value={form.name} onChange={onFormChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="timezone">Временная зона</label>
                    <input name="timezone" value={form.timezone} onChange={onFormChange} />
                </div>
                <div className="form-field">
                    <label>&nbsp;</label>
                    <button>Добавить</button>
                </div>
            </form>
        </div>
    );
}

export default WatchForm;