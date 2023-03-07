import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptorInterceptor } from './config/transform-interceptor/transform-interceptor.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('a simple blog server api')
    .setDescription('has post blog、user、collection、functions')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new TransformInterceptorInterceptor());
  await app.listen(3000);
}
bootstrap();
