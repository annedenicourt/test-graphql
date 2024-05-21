import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => [String], { nullable: true })
  roles: string[];
}
