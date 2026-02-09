import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;
}
