import { Article } from '@domain/article';

export interface ArticleRepository {
    save(article: Article): Promise<void>;
    listByFeed(feedId: string): Promise<Array<Article>>;
    markAsRead(articleId: string): Promise<void>;
}
