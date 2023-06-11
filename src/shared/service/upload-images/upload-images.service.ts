import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { Storage } from '@google-cloud/storage';
import { catchError, from, switchMap, map, Observable } from 'rxjs';

@Injectable()
export class UploadImagesService {
  private readonly _logger = new Logger(UploadImagesService.name, {
    timestamp: true,
  });
  constructor(private readonly storage: Storage) {}

  saveImage(image: Express.Multer.File) {
    const bucketName = process.env.FIREBASE_BUCKET_URL;
    const fileName = `${Date.now()}_${image.originalname}`;
    const fireBaseStorage = this.storage.bucket(bucketName).file(fileName);

    return from(
      fireBaseStorage.save(image.buffer, {
        metadata: {
          contentType: image.mimetype,
        },
      }),
    ).pipe(
      switchMap((_) =>
        from(
          fireBaseStorage.getSignedUrl({
            action: 'read',
            expires: '03-01-2500', // Fecha de expiración opcional
          }),
        ),
      ),
      map((data) => ({url:data[0], fileName})),
      catchError((e) => {
        console.error(e);
        throw new HttpException(
          { message: `Error subiendo imagen` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  deleteImage(fileName: string): Observable<any> {
    const bucketName = process.env.FIREBASE_BUCKET_URL;
    const bucket = this.storage.bucket(bucketName);
    const file = bucket.file(fileName);

    return from(file.delete()).pipe(
      catchError((e) => {
        console.error(e);
        throw new HttpException(
          { message: `Error eliminando la imagen` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }
}
