<script setup>
import { useTemplateRef, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  url: { type: String, required: true }
})

const bpmnContainer = useTemplateRef('bpmnContainer')
let bpmnViewer

const renderDiagram = async (diagramUrl) => {
    const response = await fetch(diagramUrl)
    const bpmnDiagram = await response.text()
    bpmnViewer.importXML(bpmnDiagram)
    await nextTick();
    bpmnViewer.get("canvas").zoom("fit-viewport");
}

onMounted(() => {
  bpmnViewer = new BpmnJS({ container: bpmnContainer.value })
  renderDiagram(props.url)
})

watch(() => props.url, (newVal, oldVal) => {
  if (newVal !== oldVal) renderDiagram(newVal)
})
</script>

<template>
  <div ref="bpmnContainer"></div>
</template>

<style scoped>
:deep(.bjs-breadcrumbs) {
  display: none;
}
</style>
