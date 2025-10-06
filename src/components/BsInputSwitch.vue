<template>
  <BsInputBase :width="width" :label="label" :help="help" :badge="badge">
    <div class="form-check form-switch">
      <input
        v-model="model"
        class="form-check-input"
        type="checkbox"
        role="switch"
        v-bind="$attrs"
        :disabled="disabled"
        data-bs-toggle="tooltip"
        data-bs-custom-class="custom-tooltip"
        :data-bs-title="help"
        style="transform: scale(1.5); transform-origin: left center; display: inline-block"
      />
    </div>
  </BsInputBase>
</template>

<script setup>
/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Display a switch in for of a checkbox
 */
defineOptions({
  inheritAttrs: false,
});
/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = defineModel({
  type: Boolean,
  default: false,
});

/**
 * This text is shown above the form component (optional).
 */
const label = defineModel('label', {
  type: String,
  default: undefined,
});

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = defineModel('help', {
  type: String,
  default: undefined,
});

/**
 * Specify the width to force a specific size (optional).
 */
const width = defineModel('width', {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
});

/**
 * Ref that steers if this component is enabled or not (required).
 */
const disabled = defineModel('disabled', {
  type: Boolean,
  default: false,
});

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = defineModel('badge', {
  type: Number,
  default: 0,
});
</script>
