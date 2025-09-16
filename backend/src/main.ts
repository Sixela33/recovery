import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { corsOrigins } from './lib/corsOrigins';

async function bootstrap() {
  const logger = new Logger('HTTP');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: corsOrigins, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie']
    });

  app.useGlobalPipes(new ValidationPipe());
    app.use((req, res, next) => {
      const { method, originalUrl } = req;
      const userAgent = req.get('user-agent') || '';
      
      res.on('finish', () => {
        const { statusCode } = res;
        logger.log(
          `${method} ${originalUrl} ${statusCode} - ${userAgent}`
        );
      });
      
      next();
    });
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
