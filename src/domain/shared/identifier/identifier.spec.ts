import { Identifier } from './identifier';

describe('Identifier', () => {
    it('should create an identifier with a valid UUID', () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000';
        const identifier = Identifier.createFrom(uuid);
        expect(identifier.value).toBe(uuid);
    });

    it('should throw an error for an invalid UUID', () => {
        const invalidUuid = 'invalid-uuid';
        expect(() => Identifier.createFrom(invalidUuid)).toThrow(
            'Invalid UUID format',
        );
    });

    it('should throw an error for an empty string', () => {
        const emptyString = '';
        expect(() => Identifier.createFrom(emptyString)).toThrow(
            'Invalid UUID format',
        );
    });

    it('should throw an error for a malformed UUID', () => {
        const malformedUuid = '123e4567-e89b-12d3-a456-42661417400Z'; // Last character is not a hex digit
        expect(() => Identifier.createFrom(malformedUuid)).toThrow(
            'Invalid UUID format',
        );
    });

    it('should generate a valid UUID identifier', () => {
        const result = Identifier.create();

        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        expect(uuidRegex.test(result.value)).toBeTruthy();
    });
});
