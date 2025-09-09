import { randomUUID } from 'crypto';

export class Identifier {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    public static createFrom(value: string): Identifier {
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
            throw new Error('Invalid UUID format');
        }
        return new Identifier(value);
    }

    public static create() {
        return new Identifier(randomUUID());
    }
}
