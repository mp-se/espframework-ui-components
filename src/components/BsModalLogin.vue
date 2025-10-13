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
  <div class="modal fade modal-lg" id="modalLogin" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-4">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Enter your admin password</h1>
        </div>
        <div class="modal-body">
          <input type="password" v-model="password" class="form-control" />
        </div>
        <div class="modal-footer">
          <button
            @click="callback(password)"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { logDebug } from '@/modules/logger'

const password = ref('')

/**
 * Purpose: Show a yes/no dialog to confirm an action
 */
defineOptions({
  inheritAttrs: false
})

/**
 * Ref to callback where true/false will be a parameter (required)
 */
const callback = defineModel('callback', {
  type: Function,
  required: true
})
/**
 * Ref to dialog id (required)
 */
const id = defineModel('id', {
  type: String,
  required: true
})

onMounted(() => {
  logDebug('BsModalLogin.onMounted()', 'Modal initialized for ID: ' + id.value)
  document.getElementById(id.value).click()
})
</script>
