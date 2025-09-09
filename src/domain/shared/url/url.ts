export class Url {
    private constructor(public readonly value: string) {}

    public static create(url: string): Url {
        if (url.length > 2048) {
            throw new Error('URL too long');
        }
        const regexp = /^(https?:\/\/)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
        if (!regexp.test(url)) {
            throw new Error('Invalid URL format');
        }
        return new Url(url);
    }
}
