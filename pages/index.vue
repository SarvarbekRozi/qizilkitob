<template>
  <div class="homepage">
    <!-- Hero Section with Carousel -->
    <section class="hero-section">
      <Swiper
        :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
        :slides-per-view="1"
        :loop="true"
        :effect="'fade'"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        class="hero-swiper"
      >
        <SwiperSlide v-for="(slide, index) in heroSlides" :key="index">
          <div class="hero-slide" :style="{ backgroundImage: `url(${slide.image})` }">
            <div class="hero-overlay"></div>
            <div class="auto-container">
              <div class="hero-content">
                <h1 class="hero-title">{{ slide.title[locale] }}</h1>
                <p class="hero-subtitle">{{ slide.subtitle[locale] }}</p>
                <div class="hero-buttons">
                  <NuxtLink :to="localePath('/species')" class="theme-btn">
                    {{ t('home.hero.cta') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('/about')" class="theme-btn btn-outline">
                    {{ t('nav.about') }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- Logo Marquee -->
    <LogoMarquee />

    <!-- About Section -->
    <section class="about-section sec-pad">
      <div class="pattern-bg"></div>
      <div class="auto-container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-12">
            <div class="image-wrapper">
              <div class="image-box">
                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop" alt="Nature" />
              </div>
              <div class="experience-badge">
                <div class="badge-inner">
                  <h3 style="color: white">10+</h3>
                  <p style="color: white">Yillik<br/>Tajriba</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="content-box">
              <div class="sec-title">
                <span class="sub-title">Biz haqimizda</span>
                <h2>{{ t('home.about.title') }}</h2>
                <div class="title-separator"></div>
              </div>
              <p class="main-text">{{ t('home.about.description') }}</p>
              <p>O'zbekiston Qizil Kitobi - bu yo'qolib ketish xavfi ostidagi noyob va kam uchraydigan hayvonlar, o'simliklar va zamburug'lar haqidagi rasmiy hujjat. U tabiatni muhofaza qilish choralarini rejalashtirish va amalga oshirish uchun asosiy vosita hisoblanadi.</p>
              <ul class="features-list">
                <li>
                  <div class="icon-box">
                    <i class="fas fa-check"></i>
                  </div>
                  <div class="text">Noyob turlarni aniqlash va ro'yxatga olish</div>
                </li>
                <li>
                  <div class="icon-box">
                    <i class="fas fa-check"></i>
                  </div>
                  <div class="text">Muhofaza choralarini ishlab chiqish</div>
                </li>
                <li>
                  <div class="icon-box">
                    <i class="fas fa-check"></i>
                  </div>
                  <div class="text">Ilmiy tadqiqotlarni qo'llab-quvvatlash</div>
                </li>
              </ul>
              <NuxtLink :to="localePath('/about')" class="theme-btn" style="margin-top: 30px;">
                {{ t('common.readMore') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Marquee -->
    <LogoMarquee />

    <!-- Latest News Section -->
    <section class="news-section sec-pad">
      <div class="auto-container">
        <div class="sec-title centred">
          <h2>{{ t('blog.latestPosts') }}</h2>
          <p>Tabiat muhofazasi bo'yicha so'nggi yangiliklar va tadqiqotlar</p>
        </div>
        <div class="row">
          <div
            v-for="post in latestPosts"
            :key="post.id"
            class="col-lg-4 col-md-6 col-sm-12"
          >
            <div class="news-card">
              <div class="image-box">
                <img :src="post.image" :alt="post.title[locale]" />
                <div class="date-badge">
                  {{ formatDate(post.publishDate) }}
                </div>
              </div>
              <div class="content-box">
                <h3>
                  <NuxtLink :to="localePath(`/blog/${post.slug}`)">
                    {{ post.title[locale] }}
                  </NuxtLink>
                </h3>
                <p>{{ post.excerpt[locale] }}</p>
                <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="read-more">
                  {{ t('blog.readMore') }} <i class="fas fa-arrow-right"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 centred" style="margin-top: 30px;">
            <NuxtLink :to="localePath('/blog')" class="theme-btn">
              Barcha yangiliklar
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Marquee -->
    <LogoMarquee />

    <!-- Stats Section -->
    <section class="stats-section sec-pad">
      <div class="auto-container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="stats-box">
              <div class="icon">
                <i class="fas fa-paw"></i>
              </div>
              <h3>{{ animalCount }}+</h3>
              <p>Xavf ostidagi hayvonlar</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="stats-box">
              <div class="icon">
                <i class="fas fa-leaf"></i>
              </div>
              <h3>{{ plantCount }}+</h3>
              <p>Xavf ostidagi o'simliklar</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="stats-box">
              <div class="icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>5+</h3>
              <p>Muhofaza zonalari</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="stats-box">
              <div class="icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>1000+</h3>
              <p>Tadqiqotchilar va ko'ngillilar</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Marquee -->
    <LogoMarquee />
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import LogoMarquee from '../components/ui/LogoMarquee'
const SwiperAutoplay = Autoplay
const SwiperEffectFade = EffectFade
const SwiperPagination = Pagination

const { t, locale } = useI18n()
const localePath = useLocalePath()

const { getSpeciesByCategory } = useSpeciesData()
const { getLatestPosts } = useBlog()

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=1920&h=800&fit=crop',
    title: {
      uz: "O'zbekiston Qizil Kitobini Birga Asraylik",
      en: "Together Protecting Uzbekistan's Red Book"
    },
    subtitle: {
      uz: "Yo'qolib ketish xavfi ostidagi noyob turlarni muhofaza qilish",
      en: "Protecting endangered species from extinction"
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1920&h=800&fit=crop',
    title: {
      uz: "Tabiat Boyliklarimizni Saqlaymiz",
      en: "Preserving Our Natural Heritage"
    },
    subtitle: {
      uz: "Har bir tur bizning kelajagimiz uchun muhim",
      en: "Every species matters for our future"
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=800&fit=crop',
    title: {
      uz: "Yovvoyi Tabiatni Himoya Qilish",
      en: "Wildlife Conservation in Action"
    },
    subtitle: {
      uz: "Ilmiy tadqiqotlar va muhofaza choralari",
      en: "Scientific research and conservation measures"
    }
  }
]

const animalCount = computed(() => getSpeciesByCategory('animal').length)
const plantCount = computed(() => getSpeciesByCategory('plant').length)
const latestPosts = computed(() => getLatestPosts(3))

const formatDate = (date: string) => {
  const d = new Date(date)
  const months = locale.value === 'uz'
    ? ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const day = d.getDate().toString().padStart(2, '0')
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  return `${day} ${month}, ${year}`
}
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-swiper {
  width: 100%;
  height: 100vh;
  min-height: 650px;
  max-height: 900px;
}

.hero-slide {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--white-color);
  padding: 40px 20px;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 25px;
  color: var(--white-color);
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 26px;
  margin-bottom: 45px;
  color: var(--white-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-weight: 400;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Stats Section */
.stats-section {
  background-image: url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=600&fit=crop');
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 80px 0;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(34, 139, 34, 0.85), rgba(46, 125, 50, 0.9));
  z-index: 1;
}

.stats-section .auto-container {
  position: relative;
  z-index: 2;
}

.stats-box {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 40px 25px;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.stats-box::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stats-box:hover::before {
  opacity: 1;
}

.stats-box:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.stats-box .icon {
  width: 75px;
  height: 75px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
}

.stats-box:hover .icon {
  transform: rotate(360deg) scale(1.1);
  background: rgba(255, 255, 255, 0.3);
}

.stats-box .icon i {
  font-size: 38px;
  color: var(--white-color);
}

.stats-box h3 {
  font-size: 48px;
  font-weight: 800;
  color: var(--white-color);
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.stats-box p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  font-weight: 500;
}

/* About Section */
.about-section {
  position: relative;
  background: var(--white-color);
  overflow: hidden;
}

.about-section .pattern-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, rgba(160, 51, 45, 0.03), rgba(212, 175, 55, 0.03));
  z-index: 0;
}

.about-section .auto-container {
  position: relative;
  z-index: 1;
}

.image-wrapper {
  position: relative;
  margin-bottom: 30px;
}

.about-section .image-box {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.about-section .image-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(160, 51, 45, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.about-section .image-box:hover::before {
  opacity: 1;
}

.about-section .image-box img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.about-section .image-box:hover img {
  transform: scale(1.05);
}

.experience-badge {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(160, 51, 45, 0.4);
  animation: pulse 2s ease-in-out infinite;
  z-index: 2;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.badge-inner {
  text-align: center;
  color: var(--white-color);
}

.badge-inner h3 {
  font-size: 42px;
  font-weight: 800;
  margin: 0;
  line-height: 1;
}

.badge-inner p {
  font-size: 14px;
  margin: 5px 0 0;
  font-weight: 600;
  line-height: 1.3;
}

.about-section .content-box {
  padding-left: 30px;
}

.about-section .sec-title .sub-title {
  display: inline-block;
  color: var(--primary-color);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.about-section .sec-title h2 {
  font-size: 42px;
  font-weight: 800;
  color: var(--heading-color);
  margin-bottom: 20px;
  line-height: 1.3;
}

.about-section .title-separator {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
  margin-bottom: 25px;
}

.about-section .main-text {
  font-size: 18px;
  font-weight: 500;
  color: var(--heading-color);
  margin-bottom: 20px;
  line-height: 1.8;
}

.about-section p {
  font-size: 16px;
  color: var(--text-color);
  line-height: 1.8;
}

.about-section .features-list {
  list-style: none;
  margin: 30px 0;
  padding: 0;
}

.about-section .features-list li {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.about-section .features-list li:last-child {
  border-bottom: none;
}

.about-section .features-list .icon-box {
  width: 35px;
  height: 35px;
  min-width: 35px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.about-section .features-list .icon-box i {
  font-size: 14px;
  color: var(--white-color);
}

.about-section .features-list .text {
  font-size: 16px;
  color: var(--heading-color);
  font-weight: 500;
  line-height: 1.6;
}

/* Section Titles */
.sec-title {
  margin-bottom: 50px;
}

.sec-title h2 {
  font-size: 42px;
  font-weight: 700;
  position: relative;
  padding-bottom: 20px;
  color: var(--heading-color);
}

.sec-title.centred {
  text-align: center;
}

.sec-title.centred h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.sec-title p {
  font-size: 18px;
  color: var(--text-color);
  margin-top: 15px;
}

/* News Cards */
.news-card {
  background: var(--white-color);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  margin-bottom: 30px;
  height: 100%;
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.news-card .image-box {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.news-card .image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .image-box img {
  transform: scale(1.1);
}

.news-card .date-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--primary-color);
  color: var(--white-color);
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.news-card .content-box {
  padding: 30px;
}

.news-card .content-box h3 {
  font-size: 22px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.news-card .content-box h3 a {
  color: var(--heading-color);
  transition: color 0.3s ease;
}

.news-card .content-box h3 a:hover {
  color: var(--primary-color);
}

.news-card .content-box p {
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 20px;
}

.news-card .read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
}

.news-card .read-more:hover {
  gap: 12px;
  color: var(--secondary-color);
}

.news-card .read-more i {
  transition: transform 0.3s ease;
}

.news-card .read-more:hover i {
  transform: translateX(4px);
}

/* CTA Section */
.cta-section {
  position: relative;
  padding: 120px 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(160, 51, 45, 0.9), rgba(212, 175, 55, 0.8));
}

.cta-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--white-color);
}

.cta-content h2 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  color: var(--white-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.cta-content p {
  font-size: 22px;
  margin-bottom: 35px;
  color: var(--white-color);
}

/* Responsive */
@media (max-width: 991px) {
  .hero-swiper {
    height: 80vh;
    min-height: 550px;
  }

  .hero-title {
    font-size: 48px;
  }

  .hero-subtitle {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .hero-swiper {
    height: 70vh;
    min-height: 500px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .sec-title h2 {
    font-size: 32px;
  }

  .stats-box {
    padding: 30px 20px;
  }

  .stats-box .icon {
    width: 60px;
    height: 60px;
  }

  .stats-box .icon i {
    font-size: 30px;
  }

  .stats-box h3 {
    font-size: 36px;
  }

  .about-section .content-box {
    padding-left: 0;
    margin-top: 30px;
  }

  .about-section .image-box img {
    height: 350px;
  }

  .experience-badge {
    width: 120px;
    height: 120px;
    bottom: 20px;
    right: 20px;
  }

  .badge-inner h3 {
    font-size: 32px;
  }

  .badge-inner p {
    font-size: 12px;
  }

  .about-section .sec-title h2 {
    font-size: 32px;
  }

  .cta-content h2 {
    font-size: 32px;
  }

  .cta-content p {
    font-size: 18px;
  }
}
</style>
