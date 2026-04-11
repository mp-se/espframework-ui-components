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

// src/index.ts
// ESP Framework UI Components Library

// Package version
export const version = '2.2.0';

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
export { default as BsModalLogin } from './components/BsModalLogin.vue';
export { default as BsModalSelect } from './components/BsModalSelect.vue';
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
export { default as IconData } from './components/IconData.vue';
export { default as IconClipboard } from './components/IconClipboard.vue';

// Composables (ESP Framework utilities)
export { useFetch } from './composables/useFetch';
export { useTimers } from './composables/useTimers';

// Utilities (ESP Framework modules)
export { logDebug, logInfo, logError } from './modules/logger';
// HTTP client (factory and shared singleton)
export { HttpClient, sharedHttpClient } from './modules/httpClient';

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
  weightKgToLbs,
  weightLbsToKg,
  volumeCLtoUSOZ,
  volumeUSOZtoCL,
  volumeCLtoUKOZ,
  volumeUKOZtoCL,
  isValidJson,
  isValidFormData,
  isValidMqttData,
  validateCurrentForm,
  formatTime,
} from './modules/utils';
