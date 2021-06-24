<template>
  <div class="logo-tip"></div>
</template>

<script>
export default {
  name: "LogoTip",
};
</script>

<style scoped lang="scss">
.logo-tip {
  @apply w-16 h-16;
  background: url("/img/logo.svg") no-repeat center;
  background-size: cover;
}
</style>
