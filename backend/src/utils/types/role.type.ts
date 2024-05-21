import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
}

registerEnumType(Role, { name: 'Role' });
