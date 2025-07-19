<script setup lang="ts">
import { computed } from 'vue';

/**
 * Props for the DsInput component.
 */
interface Props {
  /** The current value of the input (for v-model). */
  modelValue: string | number | null;
  /** The placeholder text for the input. */
  placeholder?: string;
  /** The label text for the input. */
  label?: string;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Type of the input. */
  type?: 'text' | 'email' | 'password' | 'number';
  /** Optional ID for the input, defaults to a generated unique ID if label is provided. */
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  label: '',
  disabled: false,
  type: 'text',
  id: undefined,
});

/**
 * Emits for the DsInput component.
 */
interface Emits {
  /** Emitted when the input value changes. */
  (event: 'update:modelValue', value: string | number | null): void;
}

const emit = defineEmits<Emits>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// Generate a unique ID for accessibility if a label is present and no ID is provided.
const inputId = computed(() => props.id || (props.label ? `ds-input-${Math.random().toString(36).substring(7)}` : undefined));

</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-text-primary mb-1"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'w-full p-md', // Using design system spacing
        'bg-bg-base',           // Using design system background
        'border border-border-base', // Using design system border
        'text-text-primary',    // Using design system text color
        'rounded-md',           // Using design system border radius
        'focus:ring-2 focus:ring-primary focus:border-border-focus', // Focus state
        'transition-colors duration-150 ease-in-out',
        'focus',                // Using design system focus utility
        {
          'opacity-50 cursor-not-allowed': disabled,
          'hover:border-border-hover': !disabled, // Design system hover border
        }
      ]"
    />
  </div>
</template>

<style scoped>
/* Autofill styles using design system variables */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--ds-bg-base) inset !important;
  -webkit-text-fill-color: var(--ds-text-primary) !important;
  caret-color: var(--ds-text-primary) !important;
}
</style>
