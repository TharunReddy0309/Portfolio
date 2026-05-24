import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.WEB_ORIGIN?.split(',') ?? ['http://localhost:5173', 'https://tharun-portfolio-web.vercel.app'],
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`Portfolio API running on http://localhost:${port}`);
}

void bootstrap();
