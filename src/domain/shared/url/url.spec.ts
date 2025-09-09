import { Url } from './url';

describe('Url', () => {
    it('should create a valid Url', () => {
        const valid = 'https://example.com/article';
        const url = Url.create(valid);
        expect(url.value).toBe(valid);
    });

    it('should throw for invalid Url', () => {
        const invalid = 'not-a-url';
        expect(() => Url.create(invalid)).toThrowError('Invalid URL format');
    });

    it('should accept http and https', () => {
        expect(() => Url.create('http://foo.com')).not.toThrow();
        expect(() => Url.create('https://bar.com')).not.toThrow();
    });

    it('should reject unsupported protocols', () => {
        expect(() => Url.create('ftp://foo.com')).toThrowError(
            'Invalid URL format',
        );
    });
});
