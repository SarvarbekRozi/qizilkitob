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
          <div class="col-lg-6 col-md-12 content-box-wrapper">
            <div class="content-box">
              <div class="sec-title text-center"">
                <h2>{{ t('home.about.title') }}</h2>
              </div>
              <p class="text-center">{{ t('home.about.description') }}</p>
              <p class="text-center">Qizil Kitob - bu yo'qolib ketish xavfi ostidagi noyob va kam uchraydigan hayvonlar, o'simliklar va zamburug'lar haqidagi ma'lumotlar to'plami. Bu kitob tabiatni muhofaza qilish choralarini rejalashtirish va amalga oshirish uchun asosiy vosita hisoblanadi.</p>

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

    <!-- Team Section -->
    <section class="team-section sec-pad" style="background-color: #f8f9fa;">
      <div class="auto-container">
        <div class="sec-title text-center">
          <h2>Bizning jamoa</h2>
          <p>Professional mutaxassislar jamoasi tabiatni muhofaza qilish uchun ishlamoqda</p>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-12" v-for="member in teamMembers" :key="member.name">
            <div class="team-card">
              <div class="team-image">
                <img :src="member.image" :alt="member.name" />
              </div>
              <div class="team-info">
                <h4>{{ member.name }}</h4>
                <p class="position">{{ member.position }}</p>
                <p class="bio">{{ member.bio }}</p>
                <div class="social-links">
                  <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
                  <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
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

const teamMembers = [
  {
    name: "Aziza Karimova",
    position: "Bosh direktor",
    bio: "Biologiya fanlari nomzodi, 15 yillik tajriba",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
  },
  {
    name: "Sardor Alimov",
    position: "Ilmiy rahbar",
    bio: "Ekologiya bo'yicha mutaxassis, professor",
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'
  },
  {
    name: "Dilnoza Yusupova",
    position: "Tadqiqotchi",
    bio: "Botanika bo'yicha ekspert, 10 yillik tajriba",
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop'
  },
  {
    name: "Javohir Toshmatov",
    position: "Zoolog",
    bio: "Hayvonlar olami bo'yicha mutaxassis",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  }
]

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
.content-box-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;

}
.content-box h3 {
  margin: 30px 0 15px;
  text-align: center;
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

/* Team Section */
.team-section {
  padding: 80px 0;
}

.team-card {
  background: var(--white-color);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 30px;
  height: 100%;
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.team-image {
  position: relative;
  overflow: hidden;
  height: 280px;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-card:hover .team-image img {
  transform: scale(1.1);
}

.team-info {
  padding: 25px 20px;
  text-align: center;
}

.team-info h4 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.team-info .position {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team-info .bio {
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-links a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 50%;
  color: var(--text-color);
  transition: all 0.3s ease;
  font-size: 16px;
}

.social-links a:hover {
  background-color: var(--primary-color);
  color: var(--white-color);
  transform: translateY(-3px);
}

@media (max-width: 991px) {
  .team-image {
    height: 300px;
  }
}

@media (max-width: 767px) {
  .team-section {
    padding: 60px 0;
  }

  .team-image {
    height: 250px;
  }

  .team-info h4 {
    font-size: 20px;
  }
}
</style>
