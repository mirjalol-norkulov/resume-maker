<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist";

const props = defineProps<{
  src: string;
}>();

const containerEl = ref<HTMLElement | undefined>();
const canvasEl = ref<HTMLCanvasElement | undefined>();

const renderPdf = async () => {
  if (!canvasEl.value || !containerEl.value) {
    return;
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc = await import(
    "pdfjs-dist/build/pdf.worker.entry"
  );

  const pdf = await pdfjsLib.getDocument(props.src).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1 });
  const containerWidth = containerEl.value.clientWidth;
  const containerHeight = containerEl.value.clientHeight;
  const maxScale = Math.min(containerWidth / viewport.width, containerHeight / viewport.height);
  const marginFactor = 0.95; // 95% of the max scale to make it smaller
  const scale = maxScale * marginFactor;

  const outputScale = window.devicePixelRatio || 1;
  const canvas = canvasEl.value;
  const scaledViewport = page.getViewport({ scale: scale });
  const context = canvas.getContext("2d");
  canvas.width = Math.floor(scaledViewport.width * outputScale);
  canvas.height = Math.floor(scaledViewport.height * outputScale);
  canvas.style.width = Math.floor(scaledViewport.width) + "px";
  canvas.style.height = Math.floor(scaledViewport.height) + "px";
  const transform =
    outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

  if (!context) {
    return;
  }

  // Enable image smoothing for better quality
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const renderContext = {
    canvasContext: context,
    transform: transform,
    viewport: scaledViewport,
  };
  page.render(renderContext);
};

onMounted(async () => {
  watch(
    () => props.src,
    () => {
      renderPdf();
    },
    { immediate: true },
  );
});
</script>

<template>
  <div
    ref="containerEl"
    class="w-full h-full overflow-hidden flex items-center justify-center"
  >
    <canvas ref="canvasEl"></canvas>
  </div>
</template>
