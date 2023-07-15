<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist";

const props = defineProps<{
  src: string;
}>();

const canvasEl = ref<HTMLCanvasElement | undefined>();

const renderPdf = async () => {
  if (!canvasEl.value) {
    return;
  }
  const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const pdf = await pdfjsLib.getDocument(props.src).promise;
  const page = await pdf.getPage(1);
  const scale = 0.8;
  const viewport = page.getViewport({ scale });
  const outputScale = window.devicePixelRatio || 1;
  const canvas = canvasEl.value;
  const context = canvas.getContext("2d");
  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = Math.floor(viewport.width) + "px";
  canvas.style.height = Math.floor(viewport.height) + "px";
  const transform =
    outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

  if (!context) {
    return;
  }

  const renderContext = {
    canvasContext: context,
    transform: transform,
    viewport: viewport,
  };
  page.render(renderContext);
};

onMounted(async () => {
  watch(
    () => props.src,
    () => {
      renderPdf();
    },
    { immediate: true }
  );
});
</script>

<template>
  <canvas ref="canvasEl"></canvas>
</template>
