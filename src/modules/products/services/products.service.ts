import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Products } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadImagesService } from 'src/shared/service/upload-images/upload-images.service';
import {
  Observable,
  catchError,
  forkJoin,
  from,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ProductTypes } from '../entities/product-type.entity';
import { CreateProductTypesDto } from '../dto/create-product-types.dto copy';

@Injectable()
export class ProductsService {
  private readonly _logger = new Logger(ProductsService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Products)
    private _productsRepository: Repository<Products>,
    @InjectRepository(ProductTypes)
    private _productsTypeRepository: Repository<ProductTypes>,
    private _uploadImagesService: UploadImagesService,
  ) {}

  /* PRODUCTS */

  /**
   * Metodo para creación de un nuevo producto
   * @param data
   * @param image
   */
  createNewProduct(
    data: CreateProductDto,
    image: Express.Multer.File,
  ): Observable<Products> {
    const { typeId } = data;
    this._logger.debug(`Creating new container`);

    return this._uploadImagesService.saveImage(image).pipe(
      switchMap((image) => {
        const { url, fileName } = image;
        if (!image) {
          throw new HttpException(
            { message: `No se añadió ninguna imagen` },
            HttpStatus.BAD_REQUEST,
          );
        }
        return this._getOneProductType(typeId).pipe(
          switchMap((typeId) => {
            const product = Object.assign(
              {},
              data,
              { image: url },
              { typeId },
              { fileName },
            );
            console.log('product', product);
            return from(this._productsRepository.save(product));
          }),
        );
      }),
    );
  }

  /**
   * Metodo para recuperar todos los productos
   *
   */
  getAllProducts(): Observable<Products[]> {
    this._logger.debug(`Getting all products`);
    return from(this._productsRepository.find()).pipe(
      catchError((error) => {
        this._logger.error(`Error getting all products`, error);
        throw new HttpException(
          { message: `Ocurrió un error: ${error}` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  /**
   * Metodo para recuperar productos segun tipo seleccionado
   * @param id
   */
  private _getOneProductType(id: string): Observable<ProductTypes> {
    this._logger.log(`Getting product type with ${id}`);
    return from(this._productsTypeRepository.findOne({ where: { id } })).pipe(
      catchError((error) => {
        this._logger.error(`Error getting all products by type id`, error);
        throw new HttpException(
          { message: `Typo de producto no encontrado: ${error}` },
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  /**
   * Metodo para recuperar productos segun id
   * @param id
   */
  getOneProduct(id: string) {
    this._logger.log(`Getting product with ${id}`);
    return from(this._productsRepository.findOne({ where: { id } })).pipe(
      catchError((error) => {
        throw new HttpException(
          { message: `Producto con id ${id} no encontrado: ${error}` },
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  /**
   * Metodo actualizar un producto
   * @param id
   * @param product
   */
  updateProduct(id: string, product: UpdateProductDto): Observable<any> {
    const { name, size, value, typeId } = product;
    this._logger.debug(`Updating container with Id ${id}`);
    return forkJoin([
      from(this.getOneProduct(id)),
      typeId ? from(this._getOneProductType(typeId)) : of({}),
    ]).pipe(
      switchMap(([product, type]) => {
        if (!product) {
          throw new HttpException(
            { message: `Producto con id: ${id}, no encontrado` },
            HttpStatus.NOT_FOUND,
          );
        }

        return from(
          this._productsRepository
            .createQueryBuilder()
            .update(Products)
            .set({
              ...(name && { name }),
              ...(size && { size }),
              ...(value && { value }),
              ...(typeId && type),
            })
            .where('id = :id', { id })
            .execute(),
        );
      }),
    );
  }

  /**
   * Metodo actualizar eliminar un  producto
   * @param id
   */

  removeProduct(id: string): Observable<any> {
    this._logger.debug(`Removing product with Id ${id}`);

    return from(this._productsRepository.findOneBy({ id })).pipe(
      switchMap((product) => {
        const { fileName } = product;
        if (fileName) {
          return this._uploadImagesService
            .deleteImage(fileName)
            .pipe(switchMap((_) => from(this._productsRepository.delete(id))));
        }
        return from(this._productsRepository.delete(id));
      }),
    );
  }

  /* PRODUCT TYPES */

  /**
   * Metodo para recuperar todos los tipos de producto
   *
   */
  getProductTypes(): Observable<ProductTypes[]> {
    this._logger.log(`Getting products types`);
    return from(this._productsTypeRepository.find());
  }

  /**
   * Metodo para recuperar productos segun tipo seleccionado
   * @param typeId
   */
  getProductsByType(id: string): Observable<Products[]> {
    this._logger.log(`Getting products by type ${id}`);
    return from(this._productsTypeRepository.findOne({ where: { id } })).pipe(
      switchMap((typeId) =>
        from(this._productsRepository.find({ where: { typeId } })),
      ),
    );
  }

  /**
   * Metodo para creacion de tipos de producto
   * @param newProductType
   */
  createTypeProduct(
    newProductType: CreateProductTypesDto,
  ): Observable<ProductTypes> {
    const type = Object.assign({}, newProductType);
    return from(this._productsTypeRepository.save(type));
  }
}
