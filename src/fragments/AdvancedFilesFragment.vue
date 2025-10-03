<template>
  <div class="row gy-4">
    <div class="col-md-8">
      <BsInputTextArea
        label="File content"
        :rows="12"
        :disabled="disabled"
        v-model="fileContent"
      />
    </div>
    <div class="col-md-4">
      <h5>File actions</h5>
      <div class="d-grid gap-2">
        <button
          @click="loadFile"
          type="button"
          class="btn btn-primary"
          :disabled="disabled"
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            :hidden="!disabled"
          ></span>
          &nbsp;Load file
        </button>
        <button
          @click="saveFile"
          type="button"
          class="btn btn-secondary"
          :disabled="!hasChanges || disabled"
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            :hidden="!disabled"
          ></span>
          &nbsp;Save file
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { logInfo, logError } from '../modules/logger.js'

const props = defineProps({
  filename: {
    type: String,
    required: true
  },
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
  'clear-messages',
  'log-info',
  'log-error'
])

const fileContent = ref('')
const originalContent = ref('')

const hasChanges = computed(() => fileContent.value !== originalContent.value)

const loadFile = () => {
  emit('loading-start')
  emit('clear-messages')

  fetch(props.baseURL + 'api/filesystem/' + props.filename, {
    method: 'GET',
    headers: {
      Authorization: props.token
    },
    signal: AbortSignal.timeout(props.fetchTimeout)
  })
    .then((response) => {
      emit('loading-end')
      if (response.status == 200) {
        emit('log-info', 'AdvancedFilesFragment.loadFile()', 'Success loading file ' + props.filename)
        response.text().then((data) => {
          fileContent.value = data
          originalContent.value = data
          emit('success-message', 'File loaded successfully.')
        })
      } else {
        emit('log-error', 'AdvancedFilesFragment.loadFile()', 'Failure loading file ' + props.filename, response.status)
        emit('error-message', 'Failed to load file.')
      }
    })
    .catch((error) => {
      emit('log-error', 'AdvancedFilesFragment.loadFile()', 'Error loading file ' + props.filename, error)
      emit('error-message', 'Failed to load file.')
      emit('loading-end')
    })
}

const saveFile = () => {
  emit('loading-start')
  emit('clear-messages')

  const file = new Blob([fileContent.value], { type: 'text/plain' })
  const formData = new FormData()
  formData.append('file', file, props.filename)

  fetch(props.baseURL + 'api/filesystem/', {
    method: 'POST',
    headers: {
      Authorization: props.token
    },
    body: formData,
    signal: AbortSignal.timeout(props.fetchTimeout)
  })
    .then((response) => {
      emit('loading-end')
      if (response.status == 200) {
        emit('log-info', 'AdvancedFilesFragment.saveFile()', 'Success saving file ' + props.filename)
        originalContent.value = fileContent.value
        emit('success-message', 'File saved successfully.')
      } else {
        emit('log-error', 'AdvancedFilesFragment.saveFile()', 'Failure saving file ' + props.filename, response.status)
        emit('error-message', 'Failed to save file.')
      }
    })
    .catch((error) => {
      emit('log-error', 'AdvancedFilesFragment.saveFile()', 'Error saving file ' + props.filename, error)
      emit('error-message', 'Failed to save file.')
      emit('loading-end')
    })
}
</script>
