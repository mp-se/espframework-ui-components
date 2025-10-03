<template>
  <div class="row gy-4">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Filename</th>
            <th scope="col">Size</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in fileList" :key="file.name">
            <td>{{ file.name }}</td>
            <td>{{ formatSize(file.size) }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="File actions">
                <button
                  @click="downloadFile(file.name)"
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  :disabled="disabled"
                >
                  Download
                </button>
                <button
                  @click="deleteFile(file.name)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="disabled"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
  'loading-end'
])

const fileList = ref([])

const formatSize = (size) => {
  if (size < 1024) return size + ' B'
  if (size < 1048576) return Math.round(size / 1024) + ' KB'
  return Math.round(size / 1048576) + ' MB'
}

const loadFiles = () => {
  emit('loading-start')

  fetch(props.baseURL + 'api/filesystem/', {
    method: 'GET',
    headers: {
      Authorization: props.token
    },
    signal: AbortSignal.timeout(props.fetchTimeout)
  })
    .then((response) => {
      emit('loading-end')
      if (response.status == 200) {
        logInfo('ListFilesFragment.loadFiles()', 'Success loading files')
        response.json().then((data) => {
          fileList.value = data.files || []
        })
      } else {
        logError('ListFilesFragment.loadFiles()', 'Failure loading files', response.status)
      }
    })
    .catch((error) => {
      logError('ListFilesFragment.loadFiles()', 'Error loading files', error)
      emit('loading-end')
    })
}

const downloadFile = (filename) => {
  const link = document.createElement('a')
  link.href = props.baseURL + 'api/filesystem/' + filename
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const deleteFile = (filename) => {
  if (!confirm(`Are you sure you want to delete ${filename}?`)) return

  emit('loading-start')

  fetch(props.baseURL + 'api/filesystem/' + filename, {
    method: 'DELETE',
    headers: {
      Authorization: props.token
    },
    signal: AbortSignal.timeout(props.fetchTimeout)
  })
    .then((response) => {
      emit('loading-end')
      if (response.status == 200) {
        logInfo('ListFilesFragment.deleteFile()', 'Success deleting file ' + filename)
        loadFiles() // Reload file list
      } else {
        logError('ListFilesFragment.deleteFile()', 'Failure deleting file ' + filename, response.status)
      }
    })
    .catch((error) => {
      logError('ListFilesFragment.deleteFile()', 'Error deleting file ' + filename, error)
      emit('loading-end')
    })
}

onMounted(() => {
  loadFiles()
})
</script>
