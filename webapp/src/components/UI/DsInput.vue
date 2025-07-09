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
      class="block text-sm font-medium text-textBase mb-1"
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
        'w-full p-sm', // p-sm from preset
        'bg-neutral-dark',      // slate-900 from preset
        'border border-neutral-light', // slate-700 from preset
        'text-textBase',        // slate-200 from preset
        'rounded-md',           // 0.5rem from preset
        'focus:ring-2 focus:ring-primary focus:border-primary', // Focus state using primary color
        'transition-colors duration-150 ease-in-out',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'hover:border-neutral-lighter': !disabled, // slate-600 on hover when not disabled
        }
      ]"
    />
  </div>
</template>

<style scoped>
/* Scoped styles can be added if necessary, for example, for specific appearances not covered by Tailwind. */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--color-neutral-dark) inset !important; /* Use CSS var for preset color */
  -webkit-text-fill-color: var(--color-textBase) !important;
  caret-color: var(--color-textBase) !important;
}

/* Define CSS variables based on Tailwind preset for use in -webkit-autofill */
/* These variables are defined in a global scope (e.g., main.css or a global style block)
   if they need to be accessed by multiple components. For a single component,
   defining them here might not make them available to :root depending on build process.
   A common practice is to define such global vars in your main CSS file.
   However, for the purpose of this component, we'll define them here.
   If :root doesn't work as expected due to scoping in SFC, these might need to move.
*/
:root {
  --color-neutral-dark: #0f172a; /* slate-900 from preset */
  --color-textBase: #e2e8f0;     /* slate-200 from preset */
}

/* Fallback if :root in scoped style doesn't work as expected for webkit-autofill */
/* This is a common issue. A more robust way is to define these in a global stylesheet. */
/* For demonstration, we ensure the input itself can access these if :root fails. */
input {
  --color-neutral-dark: #0f172a; /* slate-900 */
  --color-textBase: #e2e8f0;     /* slate-200 */
}
</style>
