export interface IAWSModuleConfiguration {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly region: string;
}

export interface AWSService {
  new (options: AWSServiceOptions): any;
  serviceIdentifier: string;
}

export interface AWSServiceOptions {
  region: string;
  credentials: Omit<IAWSModuleConfiguration, 'region'>;
}
