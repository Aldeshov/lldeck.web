export default class ResponseError extends Error {
    data: any;

    constructor(msg: string, data: any) {
        super(msg);
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }

    detail(): string {
        return this.data && this.data.detail ? this.data.detail : this.message;
    }
}
