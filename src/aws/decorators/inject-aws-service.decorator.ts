import { Inject } from '@nestjs/common';
import { getAwsServiceToken } from '../utils/aws.utils';

export const InjectAwsService = (service: any) =>
  Inject(getAwsServiceToken(service.serviceIdentifier));
