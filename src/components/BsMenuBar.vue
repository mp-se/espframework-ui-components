<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" v-bind="$attrs">
    <div class="container-fluid align-center">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-brand">
        {{ brand }}
      </div>

      <div class="vr d-none d-lg-flex h-200 mx-lg-2 text-white"></div>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav">
          <template v-for="(item, index) in menuItems" :key="index">
            <li v-if="!item.subs || !item.subs.length" class="nav-item">
              <router-link
                :class="[
                  'nav-link',
                  currentRoute && currentRoute.split('/')[1] === item.path.split('/')[1]
                    ? ' active fw-bold'
                    : ''
                ]"
                :to="item.path"
                :disabled="disabled"
              >
                <component
                  v-if="item.icon !== undefined"
                  :is="item.icon"
                  width="1rem"
                  height="1rem"
                  style="color: white"
                ></component>

                {{ item.label }}
              </router-link>
            </li>
            <li v-else class="nav-item dropdown">
              <a
                @click="menuClicked"
                :class="[
                  'nav-link',
                  'dropdown-toggle',
                  currentRoute && currentRoute.split('/')[1] === item.path.split('/')[1]
                    ? ' active fw-bold'
                    : ''
                ]"
                :id="'navbarDropdown' + item.label"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="true"
                :disabled="disabled"
              >
                <component
                  v-if="item.icon !== undefined"
                  :is="item.icon"
                  width="1rem"
                  height="1rem"
                  style="color: white"
                ></component>

                {{ item.label }}
                <span
                  v-if="item.badge !== undefined && (typeof item.badge === 'function' ? item.badge() : item.badge) > 0"
                  class="badge text-bg-danger rounded-circle"
                  >{{ typeof item.badge === 'function' ? item.badge() : item.badge }}</span
                >
              </a>
              <ul class="dropdown-menu" :aria-labelledby="'navbarDropdown' + item.label">
                <li v-for="dn in item.subs" :key="dn.path">
                  <router-link
                    @click="subMenuClicked"
                    class="dropdown-item"
                    :to="dn.path"
                    :disabled="disabled"
                    >{{ dn.label }}
                    <span
                      v-if="dn.badge !== undefined && (typeof dn.badge === 'function' ? dn.badge() : dn.badge) > 0"
                      class="badge text-bg-danger rounded-circle"
                      >{{ typeof dn.badge === 'function' ? dn.badge() : dn.badge }}</span
                    ></router-link
                  >
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>

      <div class="vr d-none d-lg-flex h-200 mx-lg-2 text-white"></div>

      <div class="text-white">
        {{ mdns }}
      </div>

      <div class="vr d-none d-lg-flex h-200 mx-lg-2 text-white"></div>

      <div v-if="configChanged">
        <span class="badge bg-danger fs-6">Save needed &nbsp;</span>
      </div>

      <div class="vr d-none d-lg-flex h-200 mx-lg-2 text-white" v-if="configChanged"></div>

      <div class="p-2">
        <div class="spinner-border gx-4" role="status" style="color: white" :hidden="!disabled">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="p-2">
        <div class="form-check form-switch">
          &nbsp;<input
            :checked="darkMode"
            class="form-check-input"
            type="checkbox"
            role="switch"
            style="border-color: white"
            :disabled="disabled"
            @change="handleDarkModeToggle"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch } from 'vue'

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 * 
 * Purpose: Provide a menu with dropdown options and dark mode toggle.
 * Now uses props-based approach - no Pinia dependency!
 */
defineOptions({
  inheritAttrs: false
})

// Props
const props = defineProps({
  /**
   * Brand name to display (required)
   */
  brand: {
    type: String,
    default: 'Brand'
  },
  /**
   * Whether the menu is disabled (optional)
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Array of menu items to display (required)
   */
  menuItems: {
    type: Array,
    default: () => []
  },
  /**
   * Current dark mode state (required)
   */
  darkMode: {
    type: Boolean,
    default: false
  },
  /**
   * MDNS name to display (optional)
   */
  mdns: {
    type: String,
    default: ''
  },
  /**
   * Whether config has changed and needs saving (optional)
   */
  configChanged: {
    type: Boolean,
    default: false
  },
  /**
   * Current route path for active menu highlighting (optional)
   */
  currentRoute: {
    type: String,
    default: ''
  }
})

// Events
const emit = defineEmits(['update:darkMode'])

// Handle dark mode toggle
const handleDarkModeToggle = (event) => {
  emit('update:darkMode', event.target.checked)
}

// Apply dark mode styling
const setMode = (isDark) => {
  const htmlElement = document.documentElement
  if (isDark) {
    htmlElement.setAttribute('data-bs-theme', 'dark')
  } else {
    htmlElement.setAttribute('data-bs-theme', 'light')
  }
}

// Handle menu click to manage dropdowns
const menuClicked = () => {
  // Optional: emit event for parent to handle if needed
}

// Handle submenu click to close dropdowns (fixes Bootstrap/Vue conflict)
const subMenuClicked = () => {
  // Added to fix the issue with dropdown-menu shown after select due to conflict with VueJS and BootstrapJS
  const dnList = document.getElementsByClassName('dropdown-menu show')
  for (var i = 0; i < dnList.length; i++) {
    dnList[i].classList.remove('show')
  }
}

// Watch for dark mode changes
watch(() => props.darkMode, (newValue) => {
  setMode(newValue)
}, { immediate: true })

// Set initial mode on mount
onMounted(() => {
  setMode(props.darkMode)
})
</script>
