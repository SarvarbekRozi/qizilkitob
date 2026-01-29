<template>
  <div class="contact-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ t('nav.contact') }}</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li>{{ t('nav.contact') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section sec-pad">
      <div class="auto-container">
        <div class="row">
          <div class="col-lg-8 col-md-12">
            <div class="contact-form">
              <h2>{{ t('contact.title') }}</h2>
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        v-model="form.name"
                        type="text"
                        :placeholder="t('contact.name')"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        v-model="form.email"
                        type="email"
                        :placeholder="t('contact.email')"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input
                        v-model="form.subject"
                        type="text"
                        :placeholder="t('contact.subject')"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <textarea
                        v-model="form.message"
                        :placeholder="t('contact.message')"
                        rows="6"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <button type="submit" class="theme-btn" :disabled="isSubmitting">
                      {{ isSubmitting ? 'Yuklanmoqda...' : t('contact.send') }}
                    </button>
                    <div v-if="submitMessage" class="submit-message" :class="submitMessage.type">
                      {{ submitMessage.text }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-lg-4 col-md-12">
            <div class="contact-info">
              <h3>{{ t('footer.contactInfo') }}</h3>
              <ul class="info-list">
                <li>
                  <i class="flaticon-telephone"></i>
                  <a href="tel:+998712345678">+998 71 234 56 78</a>
                </li>
                <li>
                  <i class="flaticon-email"></i>
                  <a href="mailto:info@redbook.uz">info@redbook.uz</a>
                </li>
                <li>
                  <i class="flaticon-pin"></i>
                  Toshkent, O'zbekiston
                </li>
              </ul>

              <div class="social-links">
                <h4>{{ t('contact.followUs') }}</h4>
                <ul>
                  <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i class="fab fa-telegram"></i></a></li>
                  <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                </ul>
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

const { submitContact } = useApi()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref<{ text: string; type: 'success' | 'error' } | null>(null)

const submitForm = async () => {
  isSubmitting.value = true
  submitMessage.value = null

  try {
    await submitContact({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message
    })

    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''

    submitMessage.value = { text: 'Yuborildi', type: 'success' }
  } catch (error) {
    submitMessage.value = { text: 'Xatolik yuz berdi', type: 'error' }
  } finally {
    isSubmitting.value = false
  }
}

useHead({
  title: t('nav.contact'),
  meta: [
    {
      name: 'description',
      content: t('contact.title')
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

.contact-form {
  background-color: var(--white-color);
  padding: 40px;
  border-radius: var(--border-radius-large);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 15px;
  transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.contact-info {
  background-color: var(--bg-gray);
  padding: 40px;
  border-radius: var(--border-radius-large);
  position: sticky;
  top: 100px;
}

.contact-info h3 {
  margin-bottom: 25px;
}

.info-list {
  list-style: none;
  margin: 0 0 30px 0;
  padding: 0;
}

.info-list li {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
}

.info-list i {
  color: var(--primary-color);
  font-size: 20px;
  margin-top: 3px;
}

.info-list a {
  color: var(--text-color);
  transition: var(--transition);
}

.info-list a:hover {
  color: var(--primary-color);
}

.social-links h4 {
  margin-bottom: 15px;
}

.social-links ul {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.social-links a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white-color);
  color: var(--heading-color);
  border-radius: 50%;
  transition: var(--transition);
}

.social-links a:hover {
  background-color: var(--primary-color);
  color: var(--white-color);
}

.submit-message {
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
}

.submit-message.success {
  background-color: #d4edda;
  color: #155724;
}

.submit-message.error {
  background-color: #f8d7da;
  color: #721c24;
}

@media (max-width: 991px) {
  .contact-info {
    position: relative;
    top: 0;
    margin-top: 40px;
  }
}
</style>
