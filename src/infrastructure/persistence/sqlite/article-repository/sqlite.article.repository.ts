import { Article } from '@domain/article';

import { ArticleRepository } from '@ports/article.repository';

import { prisma } from '../database';

export class SqliteArticleRepository implements ArticleRepository {
    async save(article: Article): Promise<void> {
        await prisma.article.upsert({
            where: { id: article.id },
            update: {
                feedId: article.feedId,
                title: article.title,
                url: article.url,
                content: article.content,
                publishedAt: article.publishedAt,
                read: article.read,
            },
            create: {
                id: article.id,
                feedId: article.feedId,
                title: article.title,
                url: article.url,
                content: article.content,
                publishedAt: article.publishedAt,
                read: article.read,
            },
        });
    }

    async listByFeed(feedId: string): Promise<Array<Article>> {
        const dbArticles = await prisma.article.findMany({ where: { feedId } });
        return dbArticles.map((dbArticle) =>
            Article.create({
                id: dbArticle.id,
                feedId: dbArticle.feedId,
                title: dbArticle.title,
                url: dbArticle.url,
                content: dbArticle.content,
                publishedAt: dbArticle.publishedAt,
                read: dbArticle.read,
            }),
        );
    }

    async markAsRead(articleId: string): Promise<void> {
        await prisma.article.update({
            where: { id: articleId },
            data: { read: true },
        });
    }
}
