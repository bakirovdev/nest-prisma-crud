import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.NODE_PORT || 3000;
  console.log(port, "hello");
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
  }))
  await app.listen(port, () => {
    console.log(`Server running on ${port} port`);
  });
}
bootstrap();
