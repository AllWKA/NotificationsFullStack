export class User {
    id: number;
    name: string;
    pwd: string;
    status: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    appId: number;
    app: JSON;
    constructor(values: Object = {}) {
         Object.assign(this, values);
    }
}