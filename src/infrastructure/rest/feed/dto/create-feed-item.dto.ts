import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedItemDto {
    @ApiProperty({ example: 'Tech News Daily' })
    public readonly title: string;
    @ApiProperty({ example: 'https://technewsdaily.com/rss' })
    public readonly url: string;
}
