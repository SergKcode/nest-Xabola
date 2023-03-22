import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MaterialsModule } from './materials/materials.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [UsersModule, MaterialsModule, ModulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
