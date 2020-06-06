import shortid from 'shortid';

export default class WatchModel {
    constructor(name, timezone = 0) {
        this.id = shortid.generate();
        this.name = (name.trim() !== '') ? name : undefined;
        this.timezone = (parseInt(timezone)) ? parseInt(timezone) : 0;
    }
};