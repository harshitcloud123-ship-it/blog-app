import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { SignInInput } from './signin.input';

@InputType()
export class UpdateAuthInput extends PartialType(SignInInput) {
  @Field(() => Int)
  id: number;
}
