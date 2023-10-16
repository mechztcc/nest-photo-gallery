import { IsNotEmpty } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userId: number;
}
