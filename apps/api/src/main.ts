import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer: any;

async function bootstrapServer() {
  if (cachedServer) return cachedServer;

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors({
    origin: process.env.WEB_ORIGIN?.split(',') ?? ['http://localhost:5173', 'https://tharun-portfolio-web.vercel.app'],
  });
  await app.init();
  
  cachedServer = expressApp;
  return expressApp;
}

// For serverless environment (Vercel)
export default async (req: any, res: any) => {
  const server = await bootstrapServer();
  return server(req, res);
};

// For local running
if (!process.env.VERCEL) {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: process.env.WEB_ORIGIN?.split(',') ?? ['http://localhost:5173', 'https://tharun-portfolio-web.vercel.app'],
    });
    const port = Number(process.env.PORT ?? 3000);
    await app.listen(port);
    console.log(`Portfolio API running on http://localhost:${port}`);
  }
  void bootstrapLocal();
}
