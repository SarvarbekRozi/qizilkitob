<template>
  <div class="about-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ t('nav.about') }}</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li>{{ t('nav.about') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-content sec-pad">
      <div class="auto-container">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="image-box">
              <img src="/images/species/gallery-1.jpg" alt="About Red Book" />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="content-box">
              <div class="sec-title">
                <h2>{{ t('home.about.title') }}</h2>
              </div>
              <p>{{ t('home.about.description') }}</p>
              <p>Qizil Kitob - bu yo'qolib ketish xavfi ostidagi noyob va kam uchraydigan hayvonlar, o'simliklar va zamburug'lar haqidagi ma'lumotlar to'plami. Bu kitob tabiatni muhofaza qilish choralarini rejalashtirish va amalga oshirish uchun asosiy vosita hisoblanadi.</p>

              <h3>Bizning maqsadlarimiz:</h3>
              <ul class="list-style">
                <li>Yo'qolib ketish xavfi ostidagi turlarni aniqlash va ro'yxatga olish</li>
                <li>Ushbu turlarni muhofaza qilish choralarini ishlab chiqish</li>
                <li>Jamiyatda tabiat muhofazasi haqida xabardorlikni oshirish</li>
                <li>Ilmiy tadqiqotlar va monitoring dasturlarini qo'llab-quvvatlash</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: t('nav.about'),
  meta: [
    {
      name: 'description',
      content: t('home.about.description')
    }
  ]
})
</script>

<style scoped>
.page-title {
  position: relative;
  padding: 120px 0 80px;
  background-image: url('/images/background/page-title.jpg');
  background-size: cover;
  background-position: center;
}

.page-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.page-title .content-box {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--white-color);
}

.page-title h1 {
  font-size: 48px;
  font-weight: 800;
  color: var(--white-color);
  margin-bottom: 15px;
}

.breadcrumb {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 0;
}

.breadcrumb li {
  color: var(--white-color);
  font-size: 16px;
}

.breadcrumb li::after {
  content: '/';
  margin-left: 10px;
}

.breadcrumb li:last-child::after {
  display: none;
}

.breadcrumb a {
  color: var(--white-color);
  transition: var(--transition);
}

.breadcrumb a:hover {
  color: var(--secondary-color);
}

.image-box {
  margin-bottom: 30px;
}

.image-box img {
  width: 100%;
  border-radius: var(--border-radius-large);
}

.content-box h3 {
  margin: 30px 0 15px;
}

.list-style {
  list-style: none;
  margin: 20px 0;
  padding: 0;
}

.list-style li {
  padding: 10px 0 10px 30px;
  position: relative;
}

.list-style li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 20px;
}
</style>
