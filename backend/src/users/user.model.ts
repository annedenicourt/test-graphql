import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
@ObjectType()
@Schema({ timestamps: true, collection: 'user' })
export class User {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop()
  firstName: string;

  @Field(() => String, { nullable: true })
  @Prop()
  lastName: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => [String])
  @Prop()
  roles: string[];

  /* @Field(() => String, { nullable: true })
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  
 */
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
