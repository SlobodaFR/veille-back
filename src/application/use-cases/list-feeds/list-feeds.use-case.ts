import { FeedRepository } from '@ports/feed.repository.ts';

export class ListFeedsUseCase {
    constructor(private readonly feedRepository: FeedRepository) {}

    async execute() {
        return this.feedRepository.list();
    }
}
