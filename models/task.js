import { v4 as uuidv4 } from 'uuid';


export default class Task {

    id = '';
    desc = '';
    completedAt = null;

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.completedAt = null;
    };
}