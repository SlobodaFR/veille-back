import { Article } from '@domain/article';

import { ArticleRepository } from '@ports/article.repository.ts';

export class InMemoryArticleRepository implements ArticleRepository {
    private articles: Array<Article> = [];

    async save(article: Article) {
        this.articles.push(article);
    }

    async listByFeed(feedId: string) {
        return this.articles.filter((a) => a.feedId === feedId);
    }

    async markAsRead(articleId: string) {
        this.articles = this.articles.map((a) => {
            if (a.id === articleId) return a.markAsRead();
            return a;
        });
    }
}
