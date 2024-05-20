import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from '@fastify/helmet';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();
	app.setGlobalPrefix('api/');
	await app.register(helmet);
	await app.listen(3001);
}
bootstrap();
