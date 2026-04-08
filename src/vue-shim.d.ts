// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2021-2026 Magnus
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

interface ImportMeta {
  env?: Record<string, unknown>;
}
