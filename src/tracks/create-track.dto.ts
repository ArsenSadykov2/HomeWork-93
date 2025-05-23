import { CreateAlbumDto } from '../albums/create-album.dto';

export class CreateTrackDto {
  album: CreateAlbumDto;
  title: string;
  duration: string;
  number: number;
}
