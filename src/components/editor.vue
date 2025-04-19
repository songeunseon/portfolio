<template>
  <div ref="editorRoot" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const editorRoot = ref(null)
let instance = null

onMounted(() => {
  instance = new Editor({
    el: editorRoot.value,
    height: '300px',
    initialEditType: 'wysiwyg',
    hideModeSwitch: true,
    previewStyle: 'vertical',
    initialValue: props.modelValue || '',
    events: {
      change: () => {
        emit('update:modelValue', instance.getMarkdown())
      },
    },
  })
})

watch(
  () => props.modelValue,
  (val) => {
    if (instance && val !== instance.getMarkdown()) {
      instance.setMarkdown(val)
    }
  },
)
</script>
