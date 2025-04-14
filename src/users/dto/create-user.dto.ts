import { IsEmail, IsNotEmpty, IsUUID, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsUUID('all', { each: true })
  profileIds: string[];
}
