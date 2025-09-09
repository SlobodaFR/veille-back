import { Module } from '@nestjs/common';

import { RestFeedController } from '@rest/feed/rest.feed.controller.ts';
import { RestFeedService } from '@rest/feed/rest.feed.service.ts';

@Module({
    controllers: [RestFeedController],
    providers: [RestFeedService],
})
export class RestFeedModule {}
