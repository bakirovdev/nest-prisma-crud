import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.NODE_PORT || 3000;
  console.log(port, "hello");
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  await app.listen(port, () => {
    console.log(`Server running on ${port} port`);
  });
}
bootstrap();
