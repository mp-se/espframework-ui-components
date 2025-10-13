<template>
  <button
    :id="id"
    type="button"
    class="btn btn-secondary"
    hidden
    data-bs-toggle="modal"
    data-bs-target="#modalLogin"
  >
    Testing
  </button>
  <!--
  -->
  <div id="modalLogin" class="modal fade modal-lg" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-4">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Enter your admin password</h1>
        </div>
        <div class="modal-body">
          <input v-model="password" type="password" class="form-control" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="callback(password)"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { logDebug } from '../modules/logger.js';

const password = ref('');

/**
 * Purpose: Show a yes/no dialog to confirm an action
 */
defineOptions({
  inheritAttrs: false,
});

/**
 * Props for callback and id
 */
const { callback, id } = defineProps({
  callback: { type: Function, required: true },
  id: { type: String, required: true },
});

onMounted(() => {
  logDebug('BsModalLogin.onMounted()', 'Modal initialized for ID: ' + id);
  document.getElementById(id).click();
});
</script>
