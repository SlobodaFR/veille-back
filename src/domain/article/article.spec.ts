import { Article } from './article';

describe('Article', () => {
    it('should create an article with default read status as false', () => {
        const article = Article.create({
            id: '1',
            feedId: 'feed1',
            title: 'Test Article',
            url: 'http://example.com/article',
            content: 'This is a test article.',
            publishedAt: new Date('2024-01-01T00:00:00Z'),
        });

        expect(article.id).toBe('1');
        expect(article.feedId).toBe('feed1');
        expect(article.title).toBe('Test Article');
        expect(article.url).toBe('http://example.com/article');
        expect(article.content).toBe('This is a test article.');
        expect(article.publishedAt.toISOString()).toBe(
            '2024-01-01T00:00:00.000Z',
        );
        expect(article.read).toBe(false);
    });

    it('should create an article with read status as true', () => {
        const article = Article.create({
            id: '2',
            feedId: 'feed2',
            title: 'Another Article',
            url: 'http://example.com/another-article',
            content: 'This is another test article.',
            publishedAt: new Date('2024-02-01T00:00:00Z'),
            read: true,
        });

        expect(article.read).toBe(true);
    });

    it('should mark an article as read', () => {
        const article = Article.create({
            id: '3',
            feedId: 'feed3',
            title: 'Unread Article',
            url: 'http://example.com/unread-article',
            content: 'This article is initially unread.',
            publishedAt: new Date('2024-03-01T00:00:00Z'),
        });

        const readArticle = article.markAsRead();

        expect(readArticle.read).toBe(true);
        expect(article.read).toBe(false);
    });
});
