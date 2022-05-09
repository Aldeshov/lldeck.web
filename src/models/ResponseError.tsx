export default interface ResponseError extends Error {
    data: any;
}

export class APIResponseError extends Error {
    data: any;

    constructor(msg: string, data: any) {
        super(msg);

        this.data = data;
        Object.setPrototypeOf(this, APIResponseError.prototype);
    }
}
