# ESP Framework UI Components

A reusable Vue.js component library for ESP32-based web applications.

## 📦 Installation

### From GitHub Packages

```bash
npm install github:mp-se/espframework-ui-components
```

## 🔧 Usage

```javascript
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
    <!-- Your ESP32 app components here -->
  </BsCard>
</template>
```

## 📚 Components

### UI Components

- `BsCard` - Bootstrap card component
- `BsDropdown` - Dropdown menu
- `BsInputText` - Text input with validation
- `BsInputNumber` - Number input
- `BsInputSwitch` - Toggle switch
- `BsSelect` - Select dropdown
- `BsMessage` - Alert messages
- `BsModal` - Modal dialogs
- `BsProgress` - Progress bars
- And many more...

### Icon Components

- `IconWifi` - WiFi signal icon
- `IconEye/IconEyeSlash` - Visibility toggles
- `IconCheckCircle` - Success states
- `IconXCircle` - Error states
- And many more...

### Utilities & Modules

- `logDebug`, `logInfo`, `logError` - Logging functions
- `useFetch` - Fetch composable for Vue 3
- `useTimers` - Timer management composable
- `roundVal`, `tempToC`, `tempToF` - Temperature conversion utilities
- `psiToBar`, `psiToKPa`, `barToPsi`, `kpaToPsi` - Pressure conversion utilities
- `isValidJson`, `isValidFormData` - Validation helpers

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development mode with watch
npm run dev
```

## 🚀 Release Process

To release a new version:

```bash
# 1. Ensure all changes are committed
git status

# 2. Run tests to ensure everything works
npm test

# 3. Build the project
npm run build

# 4. Create a git tag (replace X.Y.Z with version number)
git tag -a v1.7.0 -m "Release version 1.7.0"

# 5. Push commits and tags to GitHub
git push origin main --tags

# 6. Publish to GitHub Packages
npm publish
```
