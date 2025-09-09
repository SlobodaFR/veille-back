import { Article } from '@domain/article';

import { ArticleRepository } from '@ports/article.repository.ts';

export class RetrieveFeedArticlesUseCase {
    constructor(private readonly articleRepository: ArticleRepository) {}

    async execute(feedId: string): Promise<Array<Article>> {
        return this.articleRepository.listByFeed(feedId);
    }
}
