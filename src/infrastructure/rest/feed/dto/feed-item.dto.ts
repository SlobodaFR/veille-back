import { ApiProperty } from '@nestjs/swagger';

import { Feed } from '@domain/feed';

export class FeedItemDto {
    @ApiProperty({ example: '37756c03-e9d5-4fb8-a45e-09f41f931c9b' })
    public readonly id: string;
    @ApiProperty({ example: 'Tech News Daily' })
    public readonly title: string;
    @ApiProperty({ example: 'https://technewsdaily.com/rss' })
    public readonly url: string;
    @ApiProperty()
    public readonly fetchedAt: Date;

    constructor(id: string, title: string, url: string, fetchedAt: Date) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.fetchedAt = fetchedAt;
    }

    static fromDomain(domainItem: Feed): FeedItemDto {
        return new FeedItemDto(
            domainItem.id,
            domainItem.title,
            domainItem.url,
            domainItem.fetchedAt,
        );
    }
}
