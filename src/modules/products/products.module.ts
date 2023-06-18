import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { RolAllowedGuard } from '../users/guards/rol-allowed/rolAllowed.guard';
import { FirebaseImageService } from 'src/shared/service/firebase-images/firebase-images.service';
import { PassportModule } from '@nestjs/passport';
import { Storage } from '@google-cloud/storage';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypes } from './entities/product-type.entity';
import { Products } from './entities/product.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([ProductTypes, Products]), ConfigModule.forRoot(), AuthModule],
	controllers: [ProductsController],
	providers: [
		ProductsService,
		FirebaseImageService,
		PassportModule,
		RolAllowedGuard,
		{
			provide: Storage,
			useValue: new Storage({
				projectId: process.env.FIREBASE_PROJECT_ID,
				credentials: {
					client_email: process.env.FIREBASE_CLIENT_EMAIL,
					private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
				}
			})
		}
	]
})
export class ProductsModule {}
