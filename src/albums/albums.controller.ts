import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Request } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { Artist } from '../schemas/artist.schema';

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
  async create(@Body() albumDto: CreateAlbumDto) {
    const album = new this.albumModel({
      artist: albumDto.artist,
      title: albumDto.title,
      date: albumDto.date,
      image: albumDto.image,
    });

    return await album.save();
  }
}
