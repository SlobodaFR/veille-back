export class Url {
    private constructor(public readonly value: string) {}

    public static create(url: string): Url {
        // Simple regexp for http/https URLs
        const regexp =
            /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+$/;
        if (!regexp.test(url)) {
            throw new Error('Invalid URL format');
        }
        return new Url(url);
    }
}
