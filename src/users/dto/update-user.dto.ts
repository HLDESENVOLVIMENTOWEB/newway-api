import { IsOptional, IsEmail, IsArray, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  profileIds?: string[];
}
