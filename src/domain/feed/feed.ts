import { Identifier } from '@domain/shared/identifier';
import { Url } from '@domain/shared/url/url';

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
        public readonly _url: Url,
        public readonly fetchedAt,
    ) {}

    public get id(): string {
        return this._id.value;
    }

    public get url(): string {
        return this._url.value;
    }

    public static create(props: CreateFeedProps): Feed {
        const now = new Date();
        return new Feed(
            props.id ? Identifier.createFrom(props.id) : Identifier.create(),
            props.title,
            Url.create(props.url),
            props.fetchedAt ?? now,
        );
    }

    public withFetchedAt(fetchedAt: Date): Feed {
        return new Feed(this._id, this.title, this._url, fetchedAt);
    }
}
