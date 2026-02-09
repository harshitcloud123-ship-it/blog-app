import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

// Flow of the authentication and authorization with the two step verification approach
//so basicaally user login request bhejega that will be detected by the auth.resolver.ts the input fields as signinput will be sent to the validate local user and then validate the user then generate the token  and then that user will be logged in that will return us the id, name , avatar , accesstoken , now this accesstoken will be with user and then to add one more layer of security so that no other user can check the posts of another user we implement auth guard and jwt strategy since we automatically wantb that user should see post as he logs in so we have to perform this with out user interaction that s why we will use jwt strategy and implement that by  the access token that is with loggedin user and the jwt.authguard.ts will get the req and then the passport strategy will be implemented and we will validate the user , so it enables two step of verification and then the validated jwt user gets to see the user data and then through that user data we are able to get the acess to the posts from the db.


