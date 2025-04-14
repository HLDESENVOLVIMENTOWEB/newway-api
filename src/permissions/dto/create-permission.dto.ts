import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  module: string;

  @IsString()
  @IsNotEmpty()
  entity: string;

  @IsBoolean()
  canCreate: boolean;

  @IsBoolean()
  canRead: boolean;

  @IsBoolean()
  canUpdate: boolean;

  @IsBoolean()
  canDelete: boolean;
}