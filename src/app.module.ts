import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ModuleModule } from './module/module.module';
import { LessonModule } from './lesson/lesson.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
console.log('JWT_SECRET from app:', process.env.DATABASE_URL); // should not be undefined

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false, // Use with caution in production
      },
      synchronize: false, // true for dev only
    }),
    UserModule,
    AuthModule,
    CourseModule,
    ModuleModule,
    LessonModule,
    EnrollmentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // this ensures request.user is set
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
