import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracks, TracksDocument } from '../schemas/tracks.schema';
import mongoose, { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { AdminGuard } from '../role-auth/role-auth.guard';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Tracks.name)
    private trackModel: Model<TracksDocument>,
  ) {}
  @Get('album/:albumId')
  async getAll(@Param('albumId') albumId: mongoose.Schema.Types.ObjectId) {
    return this.trackModel.find({ album: albumId }).populate('album').exec();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackModel.find({ _id: id });
  }
  @UseGuards(TokenAuthGuard)
  @Post()
  create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      album: trackDto.album,
      title: trackDto.title,
      duration: trackDto.duration,
      number: trackDto.number,
    });
    return track.save();
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.trackModel.deleteOne({ _id: id });
  }
}
