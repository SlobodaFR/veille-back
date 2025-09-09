import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { CreateFeedItemDto } from '@rest/feed/dto/create-feed-item.dto.ts';
import { FeedItemDto } from '@rest/feed/dto/feed-item.dto.ts';
import { RestFeedService } from '@rest/feed/rest.feed.service.ts';

@Controller('feed')
export class RestFeedController {
    constructor(private readonly feedService: RestFeedService) {}

    @Get()
    @ApiOkResponse({ type: FeedItemDto, isArray: true })
    async getFeeds(): Promise<Array<FeedItemDto>> {
        return (await this.feedService.getFeeds()).map(FeedItemDto.fromDomain);
    }

    @Post()
    @ApiBody({ type: CreateFeedItemDto })
    @ApiOkResponse({ type: FeedItemDto })
    async subscribeToFeed(
        @Body() { title, url }: CreateFeedItemDto,
    ): Promise<FeedItemDto> {
        return FeedItemDto.fromDomain(
            await this.feedService.subscribeToFeed(title, url),
        );
    }
}
