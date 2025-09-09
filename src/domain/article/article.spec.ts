import { Article } from './article';

describe('Article', () => {
    it('should create an article with default read status as false', () => {
        const article = Article.create({
            id: 'ea4b7066-8d55-41ec-9422-bf2926ff51ad',
            feedId: '3f70d053-1563-428d-9f34-48ccf7eb5986',
            title: 'Test Article',
            url: 'http://example.com/article',
            content: 'This is a test article.',
            publishedAt: new Date('2024-01-01T00:00:00Z'),
        });

        expect(article.id).toBe('ea4b7066-8d55-41ec-9422-bf2926ff51ad');
        expect(article.feedId).toBe('3f70d053-1563-428d-9f34-48ccf7eb5986');
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
            id: '1685a787-4565-450d-9957-bc2079e2ff58',
            feedId: '1d2ea149-72da-498c-a639-9c4b6d2fb1fe',
            title: 'Another Article',
            url: 'http://example.com/another-article',
            content: 'This is another test article.',
            publishedAt: new Date('2024-02-01T00:00:00Z'),
            read: true,
        });

        expect(article.url).toBe('http://example.com/another-article');
        expect(article.read).toBe(true);
    });

    it('should mark an article as read', () => {
        const article = Article.create({
            id: '46c6ac21-fccf-476a-8b39-6b3eb45b53a5',
            feedId: 'd9b99f04-25f0-4ed7-a393-7a69db63f09a',
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
