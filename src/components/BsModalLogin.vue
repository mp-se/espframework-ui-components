<!--
  @mp-se/espframework-ui-components
  Copyright (c) 2021-2026 Magnus

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
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
