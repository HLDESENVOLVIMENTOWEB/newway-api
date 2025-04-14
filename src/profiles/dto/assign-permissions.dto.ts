import { ArrayNotEmpty, IsUUID } from 'class-validator';

export class AssignPermissionsDto {
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  permissionIds: string[];
}
