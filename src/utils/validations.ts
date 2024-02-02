import { Region } from './interfaces';

const validRegion = [
  'us-east-1',
  'us-east-2',
  'us-gov-east-1',
  'us-gov-west-1',
  'us-iso-east-1',
  'us-iso-west-1',
  'us-isob-east-1',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-northeast-3',
  'ap-south-1',
  'ap-south-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-southeast-3',
  'ap-southeast-4',
  'ca-central-1',
  'cn-north-1',
  'cn-northwest-1',
  'eu-central-1',
  'eu-central-2',
  'eu-north-1',
  'eu-south-1',
  'eu-south-2',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'il-central-1',
  'me-central-1',
  'me-south-1',
  'sa-east-1',
];

export function assertObject (value: unknown): asserts value is object {
  if (typeof value !== 'object') {
    throw new TypeError('Invalid object');
  }
}

export function assertObjectWithKey<Key extends string, T> (value: object, key: Key): asserts value is T & Record<Key, unknown> {
  if (!(key in value)) {
    throw new TypeError(`Missing key ${key}`);
  }
}

// This validates that the string input is a valid AWS region
export function assertValidRegion (region: string): asserts region is Region {
  if (!Object.values(validRegion).includes(region as string)) {
    throw new Error(`Invalid region: ${region}`);
  }
}
