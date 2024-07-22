<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";

const props = defineProps<{
  src: string;
}>();

const containerEl = ref<HTMLElement | undefined>();
const canvasEl = ref<HTMLCanvasElement | undefined>();
let pdf: PDFDocumentProxy | null = null;
const currentPage = ref(1);
const totalPages = ref(1);

const renderPage = async (pageIndex: number) => {
  if (!pdf || !canvasEl.value || !containerEl.value) {
    return;
  }

  const page = await pdf.getPage(pageIndex);
  const viewport = page.getViewport({ scale: 1 });
  const containerWidth = containerEl.value.clientWidth;
  const containerHeight = containerEl.value.clientHeight;
  const maxScale = Math.min(
    containerWidth / viewport.width,
    containerHeight / viewport.height,
  );
  const marginFactor = 1; // 95% of the max scale to make it smaller
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

const renderPdf = async () => {
  if (!canvasEl.value || !containerEl.value) {
    return;
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc = await import(
    "pdfjs-dist/build/pdf.worker.entry"
  );

  pdf = await pdfjsLib.getDocument(props.src).promise;
  totalPages.value = pdf.numPages;
  await renderPage(currentPage.value);
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

const handlePrevPage = () => {
  if (!pdf) {
    return;
  }
  currentPage.value = Math.max(1, currentPage.value - 1);
  renderPage(currentPage.value);
};
const handleNextPage = () => {
  if (!pdf) {
    return;
  }
  currentPage.value = Math.min(totalPages.value, currentPage.value + 1);
  renderPage(currentPage.value);
};
</script>

<template>
  <div
    ref="containerEl"
    class="relative w-full h-[90%] overflow-hidden flex items-center justify-center"
  >
    <canvas ref="canvasEl"></canvas>
    <section class="absolute left-1/2 bottom-4 flex items-center text-white">
      <button
        class="bg-transparent flex items-center disabled:text-gray-400"
        :disabled="currentPage === 1"
        @click="handlePrevPage"
      >
        <Icon name="material-symbols:chevron-left" size="22" />
      </button>
      <span class="text-sm">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        class="bg-transparent flex items-center disabled:text-gray-400"
        :disabled="currentPage === totalPages"
        @click="handleNextPage"
      >
        <Icon name="material-symbols:chevron-right" size="22" />
      </button>
    </section>
  </div>
</template>
