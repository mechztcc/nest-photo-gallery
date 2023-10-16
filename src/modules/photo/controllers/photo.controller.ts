import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotoService } from '../services/photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    return this.photoService.create({ name: file.originalname, userId: 1 });
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }
}
