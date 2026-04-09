import { describe, it, expect } from 'vitest';
import { buildDMConnectionConfig } from '../../src/adapters/dm';

describe('DMAdapter connection config', () => {
  it('should prefer connectString over host/port object fields', () => {
    const config = buildDMConnectionConfig({
      host: '192.168.99.172',
      port: 5236,
      user: 'SYSDBA',
      password: 'SYSDBA001',
      database: 'CASE_COMMAND_GZ',
    });

    expect(config.connectString).toBe('192.168.99.172:5236');
    expect(config.user).toBe('SYSDBA');
    expect(config.password).toBe('SYSDBA001');
    expect(config.schema).toBe('CASE_COMMAND_GZ');
    expect(config.loginEncrypt).toBe(false);
    expect(config.cipherPath).toBe('');
    expect(config.host).toBeUndefined();
    expect(config.port).toBeUndefined();
  });

  it('should use default DM port when port is not provided', () => {
    const config = buildDMConnectionConfig({
      host: 'db.example.com',
      port: undefined as unknown as number,
      user: 'u',
      password: 'p',
    });

    expect(config.connectString).toBe('db.example.com:5236');
  });
});
