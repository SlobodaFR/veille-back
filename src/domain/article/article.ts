type CreateArticleProps = {
    id: string;
    feedId: string;
    title: string;
    url: string;
    content: string;
    publishedAt: Date;
    read?: boolean;
};

export class Article {
    private constructor(
        public readonly id: string,
        public readonly feedId: string,
        public readonly title: string,
        public readonly url: string,
        public readonly content: string,
        public readonly publishedAt: Date,
        public readonly read: boolean,
    ) {}

    static create(props: CreateArticleProps): Article {
        return new Article(
            props.id,
            props.feedId,
            props.title,
            props.url,
            props.content,
            props.publishedAt,
            props.read ?? false,
        );
    }

    markAsRead(): Article {
        return new Article(
            this.id,
            this.feedId,
            this.title,
            this.url,
            this.content,
            this.publishedAt,
            true,
        );
    }
}
