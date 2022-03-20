export class ValidationError extends Error {
    name: string;
    constructor(message: string) {
        super(message);
        this.name = "Validation Error";
    }
}
