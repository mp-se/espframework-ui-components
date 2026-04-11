/*
 * @mp-se/espframework-ui-components
 * Copyright (c) 2021-2026 Magnus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('IconGraphUpArrow export', () => {
  it('is exported from src/index.js', () => {
    const idx = path.resolve(__dirname, '../../src/index.js');
    const c = fs.readFileSync(idx, 'utf8');
    expect(c).toMatch(/IconGraphUpArrow/);
  });
});
