import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from '@common/filters/http-exception.filter';
import { TimeOutInterceptor } from '@common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  const options = new DocumentBuilder()
    .setTitle('ZoomGraphiK')
    .setDescription('The ZoomGraphiK API description')
    .setVersion('1.0.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true
    },
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
