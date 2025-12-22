<template>
  <div class="blog-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ t('blog.title') }}</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li>{{ t('nav.blog') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="blog-section sec-pad">
      <div class="auto-container">
        <div class="row">
          <div
            v-for="post in allPosts"
            :key="post.id"
            class="col-lg-4 col-md-6 col-sm-12"
          >
            <div class="blog-card">
              <div class="image-box">
                <img :src="post.image" :alt="post.title[locale]" />
                <div class="date-badge">
                  {{ formatDate(post.publishDate) }}
                </div>
              </div>
              <div class="content-box">
                <div class="post-meta">
                  <span><i class="fas fa-user"></i> {{ post.author }}</span>
                  <span><i class="fas fa-tag"></i> {{ t(`blog.category`) }}</span>
                </div>
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
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { allPosts } = useBlog()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(locale.value === 'uz' ? 'uz-UZ' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: t('blog.title')
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

.blog-card {
  background-color: var(--white-color);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  margin-bottom: 30px;
}

.blog-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.image-box {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.blog-card:hover .image-box img {
  transform: scale(1.1);
}

.date-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: var(--primary-color);
  color: var(--white-color);
  padding: 10px 15px;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 600;
}

.content-box {
  padding: 30px;
}

.post-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.post-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: var(--text-color);
}

.post-meta i {
  color: var(--primary-color);
}

.content-box h3 {
  font-size: 22px;
  margin-bottom: 15px;
}

.content-box h3 a {
  color: var(--heading-color);
  transition: var(--transition);
}

.content-box h3 a:hover {
  color: var(--primary-color);
}

.content-box p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-color);
  margin-bottom: 20px;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-weight: 600;
  transition: var(--transition);
}

.read-more:hover {
  color: var(--secondary-color);
  gap: 12px;
}

@media (max-width: 768px) {
  .page-title {
    padding: 80px 0 60px;
  }

  .page-title h1 {
    font-size: 32px;
  }

  .image-box {
    height: 200px;
  }
}

/*  padding: 120px 0 80px;*/
/*  background-image: url('/images/background/page-title.jpg');*/
/*  background-size: cover;*/
/*  background-position: center;*/
/*}*/

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

.coming-soon {
  text-align: center;
  padding: 100px 20px;
}

.coming-soon i {
  font-size: 100px;
  color: var(--primary-color);
  margin-bottom: 30px;
}

.coming-soon h2 {
  font-size: 42px;
  margin-bottom: 15px;
}

.coming-soon p {
  font-size: 20px;
  color: var(--text-color);
}
</style>
