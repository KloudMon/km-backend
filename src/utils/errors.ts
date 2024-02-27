export class CustomError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Not Found') {
        super(message, 404);
    }
}

export class ConflictError extends CustomError {
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}