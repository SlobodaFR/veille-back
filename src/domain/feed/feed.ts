import { Identifier } from '@domain/shared/identifier';

type CreateFeedProps = {
    id?: string;
    title: string;
    url: string;
    fetchedAt?: Date;
};

export class Feed {
    private constructor(
        private readonly _id: Identifier,
        public readonly title: string,
        public readonly url: string,
        public readonly fetchedAt,
    ) {}

    public get id(): string {
        return this._id.value;
    }

    public static create(props: CreateFeedProps): Feed {
        const now = new Date();
        return new Feed(
            props.id ? Identifier.createFrom(props.id) : Identifier.create(),
            props.title,
            props.url,
            props.fetchedAt ?? now,
        );
    }

    public withFetchedAt(fetchedAt: Date): Feed {
        return new Feed(this._id, this.title, this.url, fetchedAt);
    }
}
