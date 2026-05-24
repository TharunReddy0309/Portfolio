import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

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

export default async (req: any, res: any) => {
  const server = await bootstrapServer();
  return server(req, res);
};
