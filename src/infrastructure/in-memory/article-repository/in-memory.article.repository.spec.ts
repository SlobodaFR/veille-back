import { Article } from '@domain/article';

import { InMemoryArticleRepository } from './in-memory.article.repository';

describe('InMemoryArticleRepository', () => {
    let repository: InMemoryArticleRepository;

    beforeEach(() => {
        repository = new InMemoryArticleRepository();
    });
    it('should save and retrieve articles by feed id', async () => {
        const article1 = {
            id: '1',
            feedId: 'feed1',
            title: 'Article 1',
            content: 'Content 1',
            read: false,
        } as unknown as Article;
        const article2 = {
            id: '2',
            feedId: 'feed1',
            title: 'Article 2',
            content: 'Content 2',
            read: false,
        } as unknown as Article;
        const article3 = {
            id: '3',
            feedId: 'feed2',
            title: 'Article 3',
            content: 'Content 3',
            read: false,
        } as unknown as Article;
        await repository.save(article1);
        await repository.save(article2);
        await repository.save(article3);
        const articlesFeed1 = await repository.listByFeed('feed1');
        expect(articlesFeed1).toHaveLength(2);
        expect(articlesFeed1).toContainEqual(article1);
        expect(articlesFeed1).toContainEqual(article2);
        const articlesFeed2 = await repository.listByFeed('feed2');
        expect(articlesFeed2).toHaveLength(1);
        expect(articlesFeed2).toContainEqual(article3);
    });

    it('should mark an article as read', async () => {
        const article = {
            id: '1',
            feedId: 'feed1',
            title: 'Article 1',
            content: 'Content 1',
            read: false,
            markAsRead() {
                return { ...this, read: true };
            },
        } as unknown as Article;
        await repository.save(article);
        await repository.markAsRead('1');
        const articles = await repository.listByFeed('feed1');
        expect(articles[0].read).toBe(true);
    });

    it('should do nothing when marking a non-existent article as read', async () => {
        await repository.markAsRead('non-existent-id');
    });
});
