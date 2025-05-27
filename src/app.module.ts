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
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './local.strategy';
import { TokenAuthGuard } from './token-auth/token-auth.guard';
import { AdminGuard } from './role-auth/role-auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/homework-85'),
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Artist.name, schema: ArtistSchema },
      { name: Tracks.name, schema: TracksSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    UsersController,
  ],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    TokenAuthGuard,
    AdminGuard,
  ],
})
export class AppModule {}
