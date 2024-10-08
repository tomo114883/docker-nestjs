import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:8081', // accept requests from the browser.
  });
  app.use(cookieParser());
  app.use(csurf());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
