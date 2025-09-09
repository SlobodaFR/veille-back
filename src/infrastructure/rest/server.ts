import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { RestFeedModule } from '@rest/feed/rest.feed.module';

@Module({
    imports: [RestFeedModule],
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Veille backend API')
        .setDescription('API for managing feeds and articles')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    const host = process.env.HOST || '0.0.0.0';
    await app.listen(port, host);
}
(() => bootstrap())();
