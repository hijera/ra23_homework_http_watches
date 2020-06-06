import shortid from 'shortid';
export default class WatchModel {
    constructor(name,timezone=0)
    {
        this.id=shortid.generate();
        this.name=name;
        this.timezone=timezone;
    }
};