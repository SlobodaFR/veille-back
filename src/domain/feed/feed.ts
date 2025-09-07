type CreateFeedProps = {
    id: string;
    title: string;
    url: string;
    fetchedAt?: Date;
};

export class Feed {
    private constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly url: string,
        public readonly fetchedAt,
    ) {}

    static create(props: CreateFeedProps): Feed {
        const now = new Date();
        return new Feed(
            props.id,
            props.title,
            props.url,
            props.fetchedAt ?? now,
        );
    }

    withFetchedAt(fetchedAt: Date): Feed {
        return new Feed(this.id, this.title, this.url, fetchedAt);
    }
}
