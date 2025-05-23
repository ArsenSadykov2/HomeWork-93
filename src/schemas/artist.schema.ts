import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop()
  name: string;

  @Prop({ default: null, type: String })
  image: string | null;

  @Prop({ default: null, type: String })
  description: string | null;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
