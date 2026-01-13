<template>
  <div class="logo-marquee-wrapper">
      <NuxtMarquee :speed="50" autoFill="true">
        <div class="logo-content">
          <img src="/public/logo-new.png" alt="" height="60" width="60">
          <div class="logo-text">
          <span class="brand-name">O'ZBEKISTON</span>
          <span class="brand-name">QIZIL KITOBI</span>
          </div>
        </div>
      </NuxtMarquee>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.logo-marquee-wrapper {
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px 0;
}
.logo-content {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 70px;
}

.logo-content i {
  font-size: 48px;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.logo:hover .logo-content i {
  transform: scale(1.1) rotate(5deg);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.brand-name {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
  background:#b02923;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}


</style>
