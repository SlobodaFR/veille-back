import { Article } from '@domain/article';

import { SqliteArticleRepository } from './sqlite.article.repository';

describe('SqliteArticleRepository', () => {
    const repo = new SqliteArticleRepository();
    const articleData = {
        id: 'ac89decf-e07b-4e99-9970-fb08c8c51704',
        feedId: '68c6f737-d95e-4a81-98ad-772e12f4ac22',
        title: 'Test Article',
        url: 'https://test.com/article',
        content: 'Lorem ipsum',
        publishedAt: new Date(),
        read: false,
    };
    let article: Article;

    beforeEach(() => {
        article = Article.create(articleData);
    });

    it('should save an article', async () => {
        await expect(repo.save(article)).resolves.toBeUndefined();
    });

    it('should list articles by feed', async () => {
        await repo.save(article);
        const articles = await repo.listByFeed(article.feedId);
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBeGreaterThan(0);
        expect(articles[0].id).toBe(article.id);
    });

    it('should mark an article as read', async () => {
        await repo.save(article);
        await expect(repo.markAsRead(article.id)).resolves.toBeUndefined();
    });
});
