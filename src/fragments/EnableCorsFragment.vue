<template>
  <h5>Developer settings</h5>
  <div class="row gy-4">
    <div class="col-md-3">
      <button
        @click="enableCors"
        type="button"
        class="btn btn-secondary"
        :disabled="disabled"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          :hidden="!disabled"
        ></span>
        &nbsp;Enable CORS</button>&nbsp;
    </div>
  </div>
</template>

<script setup>
import { logInfo, logError } from '../modules/logger.js'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  baseURL: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: ''
  },
  fetchTimeout: {
    type: Number,
    default: 10000
  }
})

const emit = defineEmits([
  'loading-start',
  'loading-end',
  'success-message',
  'error-message', 
  'clear-messages'
])

const enableCors = () => {
  emit('loading-start')
  emit('clear-messages')

  const data = {
    cors_allowed: true
  }

  fetch(props.baseURL + 'api/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: props.token
    },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(props.fetchTimeout)
  })
    .then((res) => {
      emit('loading-end')
      if (res.status != 200) {
        logError('EnableCorsFragment.enableCors()', 'Sending /api/config failed', res.status)
        emit('error-message', 'Failed to enable CORS.')
      } else {
        logInfo('EnableCorsFragment.enableCors()', 'Sending /api/config completed')
        emit('success-message', 'CORS enabled in configuration, reboot to take effect.')
      }
    })
    .catch((err) => {
      logError('EnableCorsFragment.enableCors()', err)
      emit('loading-end')
    })
}
</script>
