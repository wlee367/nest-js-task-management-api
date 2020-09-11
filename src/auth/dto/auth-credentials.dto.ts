import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

//Passwords will contain at least 1 upper case letter
// Passwords will contain at least 1 lower case letter
// Passwords will contain at least 1 number or special character

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
