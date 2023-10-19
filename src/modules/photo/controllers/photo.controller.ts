import {
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HttpInterceptor } from 'src/shared/interceptors/http/http.interceptor';
import { PhotoService } from '../services/photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(HttpInterceptor)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          cb(null, `${new Date().toISOString()}${file.originalname}`);
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
  create(@Headers() headers, @UploadedFile() file: Express.Multer.File) {
    const user = headers.user;

    return this.photoService.create({ name: file.filename, userId: user.id });
  }

  @Get('list')
  @UseInterceptors(HttpInterceptor)
  async findAll(@Headers() headers) {
    const user = headers.user;

    return await this.photoService.findAll(user.id);
  }

  @Get(':path')
  findOne(@Param('path') path: string, @Res() res) {
    return res.sendFile(path, { root: './uploads' });
  }
}
