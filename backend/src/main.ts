import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 👇 خلي التطبيق يستخدم NestExpressApplication عشان نقدر نخدم ملفات ثابتة
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  // ✅ فعل الوصول للصور (serve static files)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 🔓 فعّل الـ CORS
  app.enableCors({
    origin: '*',
  });

  // 🚀 شغّل السيرفر على كل الشبكة المحلية
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
