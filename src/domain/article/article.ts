import { Identifier } from '@domain/shared/identifier';
import { Url } from '@domain/shared/url/url';

type CreateArticleProps = {
    id?: string;
    feedId: string;
    title: string;
    url: string;
    content: string;
    publishedAt: Date;
    read?: boolean;
};

export class Article {
    private constructor(
        private readonly _id: Identifier,
        public readonly _feedId: Identifier,
        public readonly title: string,
        public readonly _url: Url,
        public readonly content: string,
        public readonly publishedAt: Date,
        public readonly read: boolean,
    ) {}

    public get id(): string {
        return this._id.value;
    }

    public get feedId(): string {
        return this._feedId.value;
    }

    public get url(): string {
        return this._url.value;
    }

    public static create(props: CreateArticleProps): Article {
        return new Article(
            props.id ? Identifier.createFrom(props.id) : Identifier.create(),
            Identifier.createFrom(props.feedId),
            props.title,
            Url.create(props.url),
            props.content,
            props.publishedAt,
            props.read ?? false,
        );
    }

    public markAsRead(): Article {
        return new Article(
            this._id,
            this._feedId,
            this.title,
            this._url,
            this.content,
            this.publishedAt,
            true,
        );
    }
}
