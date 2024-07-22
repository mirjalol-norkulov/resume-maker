<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";

const props = defineProps<{
  src: string;
}>();

const canvasEl = ref<HTMLCanvasElement | undefined>();
let pdf: PDFDocumentProxy | null = null;
const currentPage = ref(1);
const totalPages = ref(1);

const renderPage = async (pageIndex: number) => {
  if (!pdf || !canvasEl.value) {
    return;
  }

  const scale = 1;
  const page = await pdf.getPage(pageIndex);
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

  // Enable image smoothing for better quality
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const renderContext = {
    canvasContext: context,
    transform: transform,
    viewport,
  };
  page.render(renderContext);
};

const renderPdf = async () => {
  if (!canvasEl.value) {
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
  <div class="w-full h-full flex flex-col items-center justify-center gap-y-2">
    <div
      class="relative w-full flex-1 overflow-hidden flex items-center justify-center"
    >
      <canvas ref="canvasEl" class="absolute inset-0"></canvas>
    </div>
    <section class="flex items-center text-white">
      <button
        class="bg-transparent flex items-center disabled:text-gray-400"
        :disabled="currentPage === 1"
        @click="handlePrevPage"
      >
        <Icon name="material-symbols:chevron-left" size="22" />
      </button>
      <span class="text-sm"> {{ currentPage }} / {{ totalPages }} </span>
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
