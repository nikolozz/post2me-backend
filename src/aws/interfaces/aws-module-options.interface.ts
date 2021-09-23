import { ModuleMetadata } from '@nestjs/common';
import { IAWSModuleConfiguration } from './aws-module-configuration.interface';

export interface IAWSModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  readonly useFactory: (...args: any[]) => IAWSModuleConfiguration;
  readonly inject: any[];
}
