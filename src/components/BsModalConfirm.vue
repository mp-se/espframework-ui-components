<template>
  <button
    :id="id"
    type="button"
    class="btn btn-secondary"
    :style="{ display: hidden ? 'none' : 'inline-block' }"
    data-bs-toggle="modal"
    :data-bs-target="'#modal' + $.uid"
    v-bind="$attrs"
  >
    This should hidden
  </button>
  <div :id="'modal' + $.uid" class="modal fade modal-lg" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-4">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ title }}</h1>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="callback(true)"
          >
            Confirm
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="callback(false)"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Purpose: Show a yes/no dialog to confirm an action
 */
defineOptions({
  inheritAttrs: false,
});

/**
 * Ref to callback where true/false will be a parameter (required).
 */
const callback = defineModel('callback', {
  type: Function,
  default: undefined,
  validator: value => {
    return value === undefined || typeof value === 'function';
  },
});

/**
 * Ref to dialog message (required).
 */
const message = defineModel('message', {
  type: String,
  default: 'Are you sure?',
  validator: value => {
    return typeof value === 'string' && value.trim().length > 0;
  },
});

/**
 * Ref to dialog id (required).
 */
const id = defineModel('id', {
  type: String,
  default: 'confirm-modal',
  validator: value => {
    return typeof value === 'string' && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
  },
});

/**
 * Modal title (required).
 */
const title = defineModel('title', {
  type: String,
  default: 'Confirm Action',
  validator: value => {
    return typeof value === 'string' && value.trim().length > 0;
  },
});

/**
 * Whether the button should be hidden (optional).
 */
const hidden = defineModel('hidden', {
  type: Boolean,
  default: true,
});
</script>
