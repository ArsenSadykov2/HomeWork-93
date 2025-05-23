import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Request } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { Artist } from '../schemas/artist.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
    @InjectModel(Artist.name)
    private artistModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.albumModel.find();
  }

  @Get('artist/:artistId')
  async getByArtist(@Param('artistId') artistId: string) {
    return this.albumModel.find({ artist: artistId }).populate('artist').exec();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumModel.find({ _id: id });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      artist: albumDto.artist,
      title: albumDto.title,
      date: albumDto.date,
      image: file ? '/uploads/albums/' + file.filename : null,
    });

    return await album.save();
  }
}
