import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE CORS ---
  // Define las opciones de CORS para permitir SÓLO tu app de Angular
  const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  
  // Aplica la configuración de CORS a tu aplicación
  app.enableCors(corsOptions);
  
  // --- FIN DE CORS ---

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('API del Proyecto')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Tu API Doc estará en /api

  // Inicia la aplicación
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();