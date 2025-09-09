import { Article } from '@domain/article';

import { ArticleRepository } from '@ports/article.repository.ts';

import { RetrieveFeedArticlesUseCase } from './retrieve-feed-articles.use-case';

describe('RetrieveFeedArticlesUseCase', () => {
    let useCase: RetrieveFeedArticlesUseCase;
    let articleRepository: ArticleRepository;

    beforeEach(() => {
        articleRepository = {
            listByFeed: vi.fn().mockResolvedValue([
                Article.create({
                    id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
                    feedId: '3f178b6d-dba8-4477-8010-ff752d2f926d',
                    title: 'Article 1',
                    url: 'https://example.com/a1',
                    content: 'Content 1',
                    publishedAt: new Date(),
                }),
            ]),
        } as unknown as ArticleRepository;
        useCase = new RetrieveFeedArticlesUseCase(articleRepository);
    });

    it('should retrieve articles for a feed', async () => {
        const feedId = '3f178b6d-dba8-4477-8010-ff752d2f926d';
        const articles = await useCase.execute(feedId);
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBe(1);
        expect(articles[0].feedId).toBe(feedId);
    });
});
