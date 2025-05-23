import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type TracksDocument = Tracks & Document;

@Schema()
export class Tracks {
  @Prop({ required: true })
  album: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, unique: true, type: Number })
  number: number;

  @Prop({ default: null, type: Boolean })
  isPublished: false;
}

export const TracksSchema = SchemaFactory.createForClass(Tracks);
