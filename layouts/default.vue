<template>
  <div class="boxed-wrapper">
    <LayoutHeader />
    <main class="main-content">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.boxed-wrapper {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
