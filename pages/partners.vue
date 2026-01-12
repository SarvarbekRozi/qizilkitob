<template>
  <div class="partners-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>Hamkorlar</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">Bosh sahifa</NuxtLink></li>
            <li>Hamkorlar</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="partners-section sec-pad">
      <div class="auto-container">
        <div class="sec-title text-center">
          <h2>Bizning Hamkorlarimiz</h2>
          <p>Tabiatni muhofaza qilish bo'yicha hamkorlik qilayotgan tashkilotlar</p>
        </div>

        <!-- International Partners -->
        <div class="partner-category">
          <h3 class="category-title">Xalqaro tashkilotlar</h3>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="partner in internationalPartners" :key="partner.id">
              <div class="partner-card">
                <div class="partner-logo">
                  <img :src="partner.logo" :alt="partner.name" />
                </div>
                <h4>{{ partner.name }}</h4>
                <p>{{ partner.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- National Partners -->
        <div class="partner-category">
          <h3 class="category-title">Milliy tashkilotlar</h3>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="partner in nationalPartners" :key="partner.id">
              <div class="partner-card">
                <div class="partner-logo">
                  <img :src="partner.logo" :alt="partner.name" />
                </div>
                <h4>{{ partner.name }}</h4>
                <p>{{ partner.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Research Partners -->
        <div class="partner-category">
          <h3 class="category-title">Ilmiy hamkorlar</h3>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="partner in researchPartners" :key="partner.id">
              <div class="partner-card">
                <div class="partner-logo">
                  <img :src="partner.logo" :alt="partner.name" />
                </div>
                <h4>{{ partner.name }}</h4>
                <p>{{ partner.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const internationalPartners = [
  {
    id: 1,
    name: "WWF",
    description: "Jahon tabiatni muhofaza qilish jamg'armasi",
    logo: "https://via.placeholder.com/200x100/2E8B57/FFFFFF?text=WWF"
  },
  {
    id: 2,
    name: "IUCN",
    description: "Xalqaro tabiatni muhofaza qilish ittifoqi",
    logo: "https://via.placeholder.com/200x100/4CAF50/FFFFFF?text=IUCN"
  },
  {
    id: 3,
    name: "UNESCO",
    description: "BMT Ta'lim, fan va madaniyat tashkiloti",
    logo: "https://via.placeholder.com/200x100/009688/FFFFFF?text=UNESCO"
  },
  {
    id: 4,
    name: "UNDP",
    description: "BMT Taraqqiyot dasturi",
    logo: "https://via.placeholder.com/200x100/00BCD4/FFFFFF?text=UNDP"
  }
]

const nationalPartners = [
  {
    id: 5,
    name: "Ekologiya vazirligi",
    description: "O'zbekiston Respublikasi Ekologiya, atrof-muhitni muhofaza qilish va iqlim o'zgarishi vazirligi",
    logo: "https://via.placeholder.com/200x100/FF9800/FFFFFF?text=Ekologiya"
  },
  {
    id: 6,
    name: "Qo'riqxonalar",
    description: "Davlat tabiat qo'riqxonalari tizimi",
    logo: "https://via.placeholder.com/200x100/FF5722/FFFFFF?text=Qo'riqxona"
  },
  {
    id: 7,
    name: "Zoologiya instituti",
    description: "O'zbekiston Zoologiya instituti",
    logo: "https://via.placeholder.com/200x100/F44336/FFFFFF?text=Zoologiya"
  },
  {
    id: 8,
    name: "Botanika bog'i",
    description: "Respublika botanika bog'i",
    logo: "https://via.placeholder.com/200x100/E91E63/FFFFFF?text=Botanika"
  }
]

const researchPartners = [
  {
    id: 9,
    name: "Fan Akademiyasi",
    description: "O'zbekiston Respublikasi Fanlar Akademiyasi",
    logo: "https://via.placeholder.com/200x100/9C27B0/FFFFFF?text=Fan"
  },
  {
    id: 10,
    name: "Universitet",
    description: "Milliy universitet biologiya fakulteti",
    logo: "https://via.placeholder.com/200x100/673AB7/FFFFFF?text=Universitet"
  },
  {
    id: 11,
    name: "Tadqiqot markazi",
    description: "Biologik xilma-xillik tadqiqot markazi",
    logo: "https://via.placeholder.com/200x100/3F51B5/FFFFFF?text=Tadqiqot"
  },
  {
    id: 12,
    name: "Ekologiya markazi",
    description: "Amaliy ekologiya markazi",
    logo: "https://via.placeholder.com/200x100/2196F3/FFFFFF?text=Ekologiya"
  }
]

useHead({
  title: 'Hamkorlar',
  meta: [
    {
      name: 'description',
      content: 'Tabiatni muhofaza qilish bo\'yicha hamkorlik qilayotgan tashkilotlar'
    }
  ]
})
</script>

<style scoped>
.page-title {
  position: relative;
  padding: 120px 0 80px;
  background-image: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=600&fit=crop');
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(46, 139, 87, 0.5));
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

.sec-title {
  margin-bottom: 50px;
}

.sec-title h2 {
  font-size: 36px;
  font-weight: 800;
  color: var(--heading-color);
  margin-bottom: 15px;
}

.sec-title p {
  font-size: 18px;
  color: var(--text-light);
}

.partner-category {
  margin-bottom: 60px;
}

.category-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 3px solid var(--primary-color);
  display: inline-block;
}

.partner-card {
  background: var(--white-color);
  border-radius: var(--border-radius-large);
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: var(--transition);
  margin-bottom: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.partner-logo {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.partner-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--border-radius);
}

.partner-card h4 {
  font-size: 20px;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 10px;
}

.partner-card p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
}

@media (max-width: 768px) {
  .page-title {
    padding: 80px 0 60px;
  }

  .page-title h1 {
    font-size: 32px;
  }

  .sec-title h2 {
    font-size: 28px;
  }

  .category-title {
    font-size: 24px;
  }
}
</style>
