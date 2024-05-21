import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AUTHORIZED_CLIENTS } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: AUTHORIZED_CLIENTS,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  });
  await app.listen(8000, () => {
    console.info('NestJS server is listening on port http://localhost:8000');
  });
}
bootstrap();
