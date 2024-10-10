import * as cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:8081', // accept requests from the browser.
  });
  app.use(cookieParser());

  // Configure csrf-csrf
  const { doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET, // using dotenv
    cookieName: 'csrf-token', // '__Host-' prefix to set httpOnly true and secure true, so it's not accessible from postman.
    cookieOptions: {
      sameSite: 'none',
      path: '/',
    },
    size: 64,
    getTokenFromRequest: (req) => req.headers['csrf-token'] as string,
  });

  app.use(doubleCsrfProtection);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
