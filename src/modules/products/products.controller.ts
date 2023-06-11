import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	HttpCode,
	UseGuards
} from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductTypesDto } from './dto/create-product-types.dto copy';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { Products } from './entities/product.entity';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { RolAllowedGuard } from '../users/guards/administrator/administrator.guard';
import { Roles } from '../users/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
	constructor(private readonly _productsService: ProductsService) {}

	@Get()
	@ApiOperation({ summary: 'Get all products' })
	@HttpCode(200)
	getAllProducts() {
		return this._productsService.getAllProducts();
	}

	@Post()
	@ApiOperation({ summary: 'Create a new product' })
	@Roles('admin') 
	@UseGuards(RolAllowedGuard) 
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	create(@Body() product: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
		//TODO: ADD CONTROLLER TO VERIFY IS ADMIN ROLE
		return this._productsService.createNewProduct(product, file);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update product' })
	@Roles('admin') 
	@UseGuards(RolAllowedGuard) 
	@ApiParam({
		name: 'id',
		description: 'The id of the product',
		example: 'deejhdjfe3i2u'
	})
	@HttpCode(200)
	updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this._productsService.updateProduct(id, updateProductDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete one product' })
	@Roles('admin') 
	@UseGuards(RolAllowedGuard) 
	@ApiParam({
		name: 'id',
		description: 'The id of the product',
		example: 'deejhdjfe3i2u'
	})
	@HttpCode(200)
	removeProduct(@Param('id') id: string) {
		return this._productsService.removeProduct(id);
	}

	@Get('/types')
	@ApiOperation({ summary: 'Get all product types' })
	@HttpCode(200)
	getProductTypes() {
		return this._productsService.getProductTypes();
	}

	@Post('/types')
	@ApiOperation({ summary: 'Create new type of product' })
	@Roles('admin') 
	@UseGuards(RolAllowedGuard) 
	@HttpCode(200)
	createTypeProduct(@Body() productType: CreateProductTypesDto) {
		return this._productsService.createTypeProduct(productType);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one product by id' })
	@ApiParam({
		name: 'id',
		description: 'The id of the product',
		example: 'deejhdjfe3i2u'
	})
	@HttpCode(200)
	getOneProduct(@Param('id') id: string) {
		return this._productsService.getOneProduct(id);
	}

	@Get('/types/:id')
	@ApiOperation({ summary: 'Get one product by type product id' })
	@HttpCode(200)
	getProductsByType(@Param('id') id: string): Observable<Products[]> {
		return this._productsService.getProductsByType(id);
	}
}
