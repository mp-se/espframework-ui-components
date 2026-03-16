<template>
  <button
    :id="id"
    :data-bs-target="'#modal' + $.uid"
    type="button"
    class="btn btn-secondary"
    hidden
    data-bs-toggle="modal"
  >
    Testing
  </button>
  <div :id="'modal' + $.uid" class="modal fade modal-lg" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-4">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ disabled ? 'Processing...' : title }}</h1>
        </div>
        <div class="modal-body">
          <p v-if="message">{{ message }}</p>
          <BsSelect v-model="result" :disabled="disabled" :options="options"> </BsSelect>
        </div>
        <div class="modal-footer">
          <button
            :disabled="disabled"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="confirm"
          >
            Confirm
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BsSelect from './BsSelect.vue';

/**
 * Purpose: Show a modal dialog with a select dropdown
 *
 * Modal wrapper around BsSelect component that displays options in a dialog,
 * allowing users to confirm or cancel their selection.
 */
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  /** Callback function called on confirm or cancel: (confirmed: boolean, value: unknown) => void */
  callback?: (confirmed: boolean, value: unknown) => void;
  /** HTML id attribute for the hidden button */
  id?: string;
  /** Disable the modal (shows loading state) */
  disabled?: boolean;
  /** Modal title */
  title: string;
  /** Array of select options: { label: string, value: string | number | boolean } */
  options: Array<{ label: string; value: string | number | boolean }>;
  /** Message text to display in modal body */
  message?: string;
}>();

const result = ref<string | number | boolean>('');

/**
 * Confirm selection and call callback with selected value
 */
const confirm = (): void => {
  if (props.callback) {
    props.callback(true, result.value);
  }
};

/**
 * Cancel selection and call callback with empty value
 */
const cancel = (): void => {
  if (props.callback) {
    props.callback(false, '');
  }
};
</script>
