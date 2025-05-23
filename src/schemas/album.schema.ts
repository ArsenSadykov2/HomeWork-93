import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  artist: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  date: string;

  @Prop()
  image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
