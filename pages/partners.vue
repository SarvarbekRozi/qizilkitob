<template>
  <div class="partners-page">
    <!-- Page Title -->
    <section class="simple-page-title">
      <div class="auto-container">
        <h1>Hamkorlar</h1>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="partners-section sec-pad">
      <div class="auto-container">
<!--        <div class="sec-title text-center">-->
<!--          <h2>Bizning Hamkorlarimiz</h2>-->
<!--          <p>Tabiatni muhofaza qilish bo'yicha hamkorlik qilayotgan tashkilotlar</p>-->
<!--        </div>-->

        <!-- International Partners -->
        <div class="partner-category" v-if="internationalPartners.length">
          <h3 class="category-title">Xalqaro tashkilotlar</h3>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="partner in internationalPartners" :key="partner.id">
              <div class="partner-card">
                <div class="partner-logo">
                  <img v-if="partner.logo" :src="partner.logo" :alt="partnerName(partner)" />
                  <div v-else class="partner-logo-placeholder">{{ partnerName(partner).charAt(0) }}</div>
                </div>
                <h4>{{ partnerName(partner) }}</h4>
                <p v-if="partnerDesc(partner)" class="partner-desc">{{ partnerDesc(partner) }}</p>
                <a v-if="partner.website" :href="partner.website" target="_blank" rel="noopener" class="partner-website">
                  <i class="fas fa-globe"></i> {{ partner.website.replace(/^https?:\/\//, '') }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- National Partners -->
        <div class="partner-category" v-if="nationalPartners.length">
          <h3 class="category-title">Milliy tashkilotlar</h3>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="partner in nationalPartners" :key="partner.id">
              <div class="partner-card">
                <div class="partner-logo">
                  <img v-if="partner.logo" :src="partner.logo" :alt="partnerName(partner)" />
                  <div v-else class="partner-logo-placeholder">{{ partnerName(partner).charAt(0) }}</div>
                </div>
                <h4>{{ partnerName(partner) }}</h4>
                <p v-if="partnerDesc(partner)" class="partner-desc">{{ partnerDesc(partner) }}</p>
                <a v-if="partner.website" :href="partner.website" target="_blank" rel="noopener" class="partner-website">
                  <i class="fas fa-globe"></i> {{ partner.website.replace(/^https?:\/\//, '') }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Research Partners -->
        <div class="partner-category" v-if="researchPartners.length">
          <h3 class="category-title">Ilmiy hamkorlar</h3>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="partner in researchPartners" :key="partner.id">
              <div class="partner-card">
                <div class="partner-logo">
                  <img v-if="partner.logo" :src="partner.logo" :alt="partnerName(partner)" />
                  <div v-else class="partner-logo-placeholder">{{ partnerName(partner).charAt(0) }}</div>
                </div>
                <h4>{{ partnerName(partner) }}</h4>
                <p v-if="partnerDesc(partner)" class="partner-desc">{{ partnerDesc(partner) }}</p>
                <a v-if="partner.website" :href="partner.website" target="_blank" rel="noopener" class="partner-website">
                  <i class="fas fa-globe"></i> {{ partner.website.replace(/^https?:\/\//, '') }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Hech qanday hamkor yo'q -->
        <div v-if="!allPartners.length" class="text-center py-5">
          <p style="color: var(--text-color); font-size: 16px;">Hamkorlar ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { getPartners } = useApi()

const { data: partnersResponse } = await useAsyncData('partners', () => getPartners())

const allPartners = computed(() => (partnersResponse.value as any)?.data ?? [])

const internationalPartners = computed(() =>
  allPartners.value.filter((p: any) => p.type === 'international')
)
const nationalPartners = computed(() =>
  allPartners.value.filter((p: any) => p.type === 'national')
)
const researchPartners = computed(() =>
  allPartners.value.filter((p: any) => p.type === 'research')
)

const partnerName = (partner: any) => {
  return partner.name?.[locale.value] || partner.name?.uz || partner.name?.ru || ''
}

const partnerDesc = (partner: any) => {
  return partner.description?.[locale.value] || partner.description?.uz || partner.description?.ru || ''
}

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

.partner-logo-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
}

.partner-card-link {
  text-decoration: none;
  display: block;
}

.partner-card h4 {
  font-size: 18px;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 8px;
}

.partner-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 12px;
}

.partner-website {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--primary-color);
  font-weight: 500;
  word-break: break-all;
  text-decoration: none;
  transition: color 0.2s;
}

.partner-website:hover {
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .sec-title h2 {
    font-size: 28px;
  }

  .category-title {
    font-size: 24px;
  }
}
</style>
