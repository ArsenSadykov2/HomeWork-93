import { CreateArtist } from '../artists/create-artist.dto';

export class CreateAlbumDto {
  artist: CreateArtist;
  title: string;
  date: string;
  image: string;
}
