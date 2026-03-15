# ESP Framework UI Components

A reusable Vue.js 3 component library for ESP32-based web applications, written in **TypeScript**.

## 📦 Installation

### From GitHub Packages

```bash
npm install github:mp-se/espframework-ui-components
```

## 🔧 Usage

```typescript
import { BsCard, BsInputText, IconWifi, logInfo } from '@mp-se/espframework-ui-components';

export default {
  components: {
    BsCard,
    BsInputText,
    IconWifi,
  },
};
```

```vue
<template>
  <BsCard header="Device Settings" title="Configuration">
    <BsInputText v-model="deviceName" label="Device Name" />
    <IconWifi width="24" height="24" />
  </BsCard>
</template>
```

## 📚 Components Library

### Form & Input Components

#### `BsInputText`
Text input with built-in password toggling and validation.

```vue
<BsInputText 
  v-model="username"
  label="Username"
  type="text"
  help="Enter your username"
  :width="6"
/>

<!-- Password field with eye toggle -->
<BsInputText 
  v-model="password"
  type="password"
  label="Password"
/>
```

**Props:**
- `v-model` - Bound input value
- `label` - Label text above the input
- `type` - Input type (text, password, email, etc.)
- `help` - Help text below the input
- `badge` - Badge number indicator
- `width` - Bootstrap grid width (1-12)

#### `BsInputNumber`
Number input with validation.

```vue
<BsInputNumber 
  v-model="count"
  label="Item Count"
  help="Enter a number"
/>
```

#### `BsInputTextArea`
Multi-line text input.

```vue
<BsInputTextArea 
  v-model="description"
  label="Description"
/>
```

#### `BsInputTextAreaFormat`
Text area with JSON/FormData formatting.

```vue
<BsInputTextAreaFormat 
  v-model="data"
  label="Configuration"
/>
```

#### `BsInputReadonly`
Display-only input field.

```vue
<BsInputReadonly 
  :value="serialNumber"
  label="Serial Number"
/>
```

#### `BsInputRadio`
Radio button group.

```vue
<BsInputRadio 
  v-model="selected"
  :options="[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' }
  ]"
  label="Choose an option"
/>
```

#### `BsInputSwitch`
Toggle switch component.

```vue
<BsInputSwitch 
  v-model="enabled"
  label="Enable Feature"
/>
```

#### `BsInputBase`
Base component for form inputs (used internally).

### Selection Components

#### `BsSelect`
Dropdown select field.

```vue
<BsSelect 
  v-model="mode"
  label="Mode"
  :options="[
    { label: 'Auto', value: 'auto' },
    { label: 'Manual', value: 'manual' }
  ]"
/>
```

#### `BsDropdown`
Dropdown menu with action items.

```vue
<BsDropdown label="More Options">
  <a href="#">Item 1</a>
  <a href="#">Item 2</a>
</BsDropdown>
```

### Display Components

#### `BsCard`
Container for grouped content.

```vue
<BsCard 
  header="Device Information"
  title="Status"
  :icon="IconWifi"
>
  <!-- Card content here -->
</BsCard>
```

**Props:**
- `header` - Header text
- `title` - Card title
- `icon` - Icon component to display

#### `BsMessage`
Alert/notification message.

```vue
<BsMessage 
  title="Success"
  message="Operation completed"
  type="success"
/>
```

**Types:** `success`, `error`, `warning`, `info`

#### `BsProgress`
Progress bar indicator.

```vue
<BsProgress 
  :value="75"
  label="Download Progress"
/>
```

#### `BsMenuBar`
Navigation menu bar.

```vue
<BsMenuBar :items="menuItems">
  <!-- Menu content -->
</BsMenuBar>
```

#### `BsFooter`
Footer component.

```vue
<BsFooter>
  <p>© 2024 My App</p>
</BsFooter>
```

### Modal Components

#### `BsModal`
Generic modal dialog with JSON/FormData formatting.

```vue
<BsModal 
  v-model="modalData"
  title="View Server Response"
  button="Show Details"
/>
```

#### `BsModalConfirm`
Confirmation dialog.

```vue
<BsModalConfirm 
  title="Confirm Action"
  message="Are you sure?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>
```

#### `BsModalLogin`
Login dialog with password entry.

```vue
<BsModalLogin 
  id="loginModal"
  :callback="handleLogin"
/>
```

### File Upload

#### `BsFileUpload`
File upload component with progress tracking.

```vue
<BsFileUpload 
  label="Upload Firmware"
  accept=".bin,.hex"
  @upload="handleUpload"
/>
```

### Icon Components

Display SVG icons. All icons support width/height props.

#### Basic Icons
```vue
<IconWifi width="24" height="24" />
<IconHome width="20" height="20" />
<IconTools width="20" height="20" />
<IconCpu width="20" height="20" />
<IconData width="20" height="20" />
<IconClipboard width="20" height="20" />
```

#### Status Icons
```vue
<!-- Success -->
<IconCheckCircle width="20" height="20" />

<!-- Errors -->
<IconXCircle width="20" height="20" />
<IconExclamationTriangle width="20" height="20" />

<!-- Information -->
<IconInfoCircle width="20" height="20" />
```

#### Visibility Icons
```vue
<IconEye width="20" height="20" />
<IconEyeSlash width="20" height="20" />
```

#### Direction/Action Icons
```vue
<IconUpArrow width="16" height="16" />
<IconGraphUpArrow width="16" height="16" />
<IconCloudUpArrow width="16" height="16" />
```

## 🎯 Composables

### `useFetch()`
Manage fetch requests with automatic cleanup.

```typescript
import { useFetch } from '@mp-se/espframework-ui-components';

export default {
  setup() {
    const { managedFetch, abortAllRequests } = useFetch();

    const fetchData = async () => {
      const response = await managedFetch('/api/data');
      return response.json();
    };

    onBeforeUnmount(() => {
      abortAllRequests(); // Auto cleanup
    });

    return { fetchData };
  }
};
```

**Methods:**
- `managedFetch(url, options)` - Fetch with abort signal tracking
- `abortAllRequests()` - Cancel all active requests
- `abortRequest(controller)` - Cancel specific request

### `useTimers()`
Manage timeouts and intervals with automatic cleanup.

```typescript
import { useTimers } from '@mp-se/espframework-ui-components';

export default {
  setup() {
    const { createTimeout, createInterval, clearAllTimers } = useTimers();

    const timer = createTimeout(() => {
      console.log('Delayed action');
    }, 1000);

    const interval = createInterval(() => {
      fetchStatus();
    }, 5000);

    onBeforeUnmount(() => {
      clearAllTimers(); // Auto cleanup
    });

    return { };
  }
};
```

**Methods:**
- `createTimeout(callback, delay)` - Create tracked timeout
- `createInterval(callback, delay)` - Create tracked interval
- `clearManagedTimeout(id)` - Clear specific timeout
- `clearManagedInterval(id)` - Clear specific interval
- `clearAllTimers()` - Clear all active timers

## 🛠️ Utilities & Modules

### Logging

```typescript
import { logDebug, logInfo, logError } from '@mp-se/espframework-ui-components';

logInfo('App started');
logDebug('Debug info');
logError('An error occurred');
```

### HTTP Client

```typescript
import { HttpClient, sharedHttpClient } from '@mp-se/espframework-ui-components';

// Use singleton
await sharedHttpClient.getJson('/api/status');
await sharedHttpClient.postJson('/api/config', configData);

// Create new instance
const client = new HttpClient();
client.baseURL = 'https://device.local';
await client.getJson('/api/info');
```

**Methods:**
- `getJson(path, opts)` - GET request returning JSON
- `postJson(path, data, opts)` - POST JSON data
- `postText(path, data, opts)` - POST data returning text
- `uploadFile(path, data, opts)` - Upload with progress
- `ping()` - Check connectivity
- `auth(basicBase)` - Basic authentication
- `createWebSocket(path, opts)` - Create WebSocket
- `restart(mdns, opts)` - Restart device

### Conversion & Validation Utilities

**Temperature Conversion:**
```typescript
import { tempToF, tempToC } from '@mp-se/espframework-ui-components';

const fahrenheit = tempToF(25); // 77
const celsius = tempToC(98.6);  // 37
```

**Pressure Conversion:**
```typescript
import { psiToBar, psiToKPa, barToPsi, kpaToPsi } from '@mp-se/espframework-ui-components';

const bar = psiToBar(14.7);   // 1.01325
const psi = barToPsi(2.5);    // 36.26
```

**Gravity/Brewing:**
```typescript
import { gravityToPlato, gravityToSG } from '@mp-se/espframework-ui-components';

const plato = gravityToPlato(1.060);  // Specific gravity to Plato degrees
const sg = gravityToSG(15);            // Plato degrees to specific gravity
```

**Validation:**
```typescript
import { isValidJson, isValidFormData, isValidMqttData, validateCurrentForm } from '@mp-se/espframework-ui-components';

isValidJson('{"key":"value"}');     // true
isValidFormData('?name=value');     // true
isValidMqttData('topic|message');   // true
validateCurrentForm();               // Validate all Bootstrap forms
```

**Utilities:**
```typescript
import { roundVal, formatTime } from '@mp-se/espframework-ui-components';

roundVal(3.14159, 2);              // 3.14
formatTime(3661);                   // "1h 1m 1s"
formatTime(3661, { compact: true }); // "1h"
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development mode with watch
npm run dev

# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 🚀 Release Process

To release a new version:

```bash
# 1. Ensure all changes are committed
git status

# 2. Run type checking, tests, and build
npm run type-check
npm test
npm run build

# 3. Update version in package.json (e.g., 2.0.0)

# 4. Create a git tag
git tag -a v2.0.0 -m "Release version 2.0.0"

# 5. Push commits and tags to GitHub
git push origin main --tags
```

## 📊 Code Quality

- **Test Coverage**: 83%+ on components
- **Type Safe**: Full TypeScript support
- **Linting**: ESLint + Prettier
- **Framework**: Vue.js 3 with TypeScript

# 6. Publish to GitHub Packages
npm publish
```
