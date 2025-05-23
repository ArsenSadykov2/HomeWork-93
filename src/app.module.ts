import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { Album, AlbumSchema } from './schemas/album.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsController } from './albums/albums.controller';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { TracksController } from './tracks/tracks.controller';
import { Tracks, TracksSchema } from './schemas/tracks.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/homework-85'),
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Artist.name, schema: ArtistSchema },
      { name: Tracks.name, schema: TracksSchema },
    ]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
  ],
  providers: [AppService],
})
export class AppModule {}
