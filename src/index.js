// src/index.js
// ESP Framework UI Components Library

// Package version
export const version = '1.4.0';

// Basic UI Components
export { default as BsCard } from './components/BsCard.vue';
export { default as BsDropdown } from './components/BsDropdown.vue';
export { default as BsInputText } from './components/BsInputText.vue';
export { default as BsInputNumber } from './components/BsInputNumber.vue';
export { default as BsInputSwitch } from './components/BsInputSwitch.vue';
export { default as BsInputTextArea } from './components/BsInputTextArea.vue';
export { default as BsInputTextAreaFormat } from './components/BsInputTextAreaFormat.vue';
export { default as BsInputReadonly } from './components/BsInputReadonly.vue';
export { default as BsInputRadio } from './components/BsInputRadio.vue';
export { default as BsSelect } from './components/BsSelect.vue';
export { default as BsMessage } from './components/BsMessage.vue';
export { default as BsModal } from './components/BsModal.vue';
export { default as BsModalConfirm } from './components/BsModalConfirm.vue';
export { default as BsProgress } from './components/BsProgress.vue';
export { default as BsFileUpload } from './components/BsFileUpload.vue';
export { default as BsMenuBar } from './components/BsMenuBar.vue';
export { default as BsFooter } from './components/BsFooter.vue';
export { default as BsInputBase } from './components/BsInputBase.vue';

// Icon Components
export { default as IconEye } from './components/IconEye.vue';
export { default as IconEyeSlash } from './components/IconEyeSlash.vue';
export { default as IconCheckCircle } from './components/IconCheckCircle.vue';
export { default as IconXCircle } from './components/IconXCircle.vue';
export { default as IconInfoCircle } from './components/IconInfoCircle.vue';
export { default as IconExclamationTriangle } from './components/IconExclamationTriangle.vue';
export { default as IconWifi } from './components/IconWifi.vue';
export { default as IconHome } from './components/IconHome.vue';
export { default as IconTools } from './components/IconTools.vue';
export { default as IconCpu } from './components/IconCpu.vue';
export { default as IconUpArrow } from './components/IconUpArrow.vue';
export { default as IconGraphUpArrow } from './components/IconGraphUpArrow.vue';
export { default as IconCloudUpArrow } from './components/IconCloudUpArrow.vue';

// Composables (ESP Framework utilities)
export { useFetch } from './composables/useFetch.js';
export { useTimers } from './composables/useTimers.js';

// Utilities (ESP Framework modules)
export { logDebug, logInfo, logError } from './modules/logger.js';
// HTTP client (factory and shared singleton)
export { HttpClient, sharedHttpClient } from './modules/httpClient.js';

// Utilities (ESP Framework conversion & validation functions)
export {
  roundVal,
  gravityToPlato,
  gravityToSG,
  tempToF,
  tempToC,
  psiToBar,
  psiToKPa,
  barToPsi,
  kpaToPsi,
  isValidJson,
  isValidFormData,
  isValidMqttData,
  validateCurrentForm,
  formatTime,
} from './modules/utils.js';
