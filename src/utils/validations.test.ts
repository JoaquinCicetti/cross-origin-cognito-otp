import { describe, it, expect } from 'vitest';
import { assertValidRegion } from './validations';

describe('assertValidRegion', () => {
  it('should not throw error for valid region', () => {
    expect(() => assertValidRegion('us-east-1')).not.toThrow();
  });

  it('should throw error for invalid region', () => {
    expect(() => assertValidRegion('invalid-region')).toThrow('Invalid region: invalid-region');
  });
});
