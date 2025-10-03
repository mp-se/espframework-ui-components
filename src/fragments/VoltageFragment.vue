<template>
  <h5>Voltage settings</h5>
  <div class="row gy-4">
    <div class="col-md-3">
      <BsInputNumber
        label="Volt factor"
        unit=""
        placeholder="Enter volt factor"
        help="Voltage ADC factor"
        :min="0.0"
        :max="99999999"
        :step="0.001"
        :width="6"
        v-model.number="voltageFactor"
        :disabled="disabled"
      />
    </div>
    <div class="col-md-3">
      <BsInputNumber
        label="Volt offset"
        unit=""
        placeholder="Enter volt offset"
        help="Voltage ADC offset"
        :min="0.0"
        :max="99999999"
        :step="0.001"
        :width="6"
        v-model.number="voltageOffset"
        :disabled="disabled"
      />
    </div>
    <div class="col-md-6"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  voltageFactor: {
    type: Number,
    default: 0
  },
  voltageOffset: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:voltageFactor', 'update:voltageOffset'])

// Create computed properties with getters and setters for v-model
const voltageFactor = computed({
  get: () => props.voltageFactor,
  set: (value) => emit('update:voltageFactor', value)
})

const voltageOffset = computed({
  get: () => props.voltageOffset,
  set: (value) => emit('update:voltageOffset', value)
})
</script>
