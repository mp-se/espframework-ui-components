# ESP Framework UI Components

A reusable Vue.js component library for ESP32-based web applications.

## 📦 Installation

### From GitHub Packages

```bash
npm install @mp-se/espframework-ui-components
```

### Setup .npmrc (for private packages)

```
@mp-se:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## 🔧 Usage

```javascript
import { BsCard, BsInputText, IconWifi, logInfo } from '@mp-se/espframework-ui-components'

export default {
  components: {
    BsCard,
    BsInputText,
    IconWifi
  }
}
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
- `roundVal`, `tempToC`, `tempToF` - Utility functions
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

