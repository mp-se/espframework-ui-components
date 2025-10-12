import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('IconUpArrow export', () => {
  it('is exported from src/index.js', () => {
    const idx = path.resolve(__dirname, '../../src/index.js');
    const c = fs.readFileSync(idx, 'utf8');
    expect(c).toMatch(/IconUpArrow/);
  });
});
