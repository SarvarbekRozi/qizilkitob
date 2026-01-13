<template>
  <div class="logo-marquee-wrapper">
      <NuxtMarquee :speed="50" autoFill="true">
        <div class="logo-content">
          <i class="fas fa-book-open"></i>
          <div class="logo-text">
            <span class="brand-name">QIZIL KITOB</span>
            <span class="brand-tagline">O'zbekiston</span>
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
  padding: 30px 0;
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 60px;
  white-space: nowrap;
}

.marquee-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.marquee-text {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .logo-marquee-wrapper {
    padding: 20px 0;
  }

  .marquee-logo {
    height: 35px;
  }

  .marquee-text {
    font-size: 20px;
  }

  .marquee-item {
    margin-right: 40px;
    gap: 10px;
  }
}
.logo {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
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
  font-size: 24px;
  font-weight: 800;
  color: var(--heading-color);
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color);
  margin-top: 2px;
}
</style>
