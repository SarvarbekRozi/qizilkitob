<template>
  <div v-if="post" class="blog-detail-page">
    <!-- Page Title -->
    <section class="page-title">
      <div class="auto-container">
        <div class="content-box">
          <h1>{{ post.title[locale] }}</h1>
          <ul class="breadcrumb">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/blog')">{{ t('nav.blog') }}</NuxtLink></li>
            <li>{{ post.title[locale] }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Blog Detail Section -->
    <section class="blog-detail sec-pad">
      <div class="auto-container">
        <div class="row">
          <div class="col-lg-8 col-md-12">
            <article class="blog-post">
              <!-- Featured Image -->
              <figure class="featured-image">
                <img :src="post.image" :alt="post.title[locale]" />
              </figure>

              <!-- Post Meta -->
              <div class="post-meta">
                <span><i class="fas fa-calendar"></i> {{ formatDate(post.publishDate) }}</span>
                <span><i class="fas fa-user"></i> {{ post.author }}</span>
                <span><i class="fas fa-tag"></i> {{ post.category }}</span>
              </div>

              <!-- Post Content -->
              <div class="post-content">
                <p v-for="(paragraph, index) in contentParagraphs" :key="index">
                  {{ paragraph }}
                </p>
              </div>

              <!-- Tags -->
              <div class="post-tags">
                <h4>{{ t('blog.tags') }}:</h4>
                <div class="tags-list">
                  <span v-for="tag in post.tags" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </article>
          </div>

          <!-- Sidebar -->
          <div class="col-lg-4 col-md-12">
            <div class="blog-sidebar">
              <div class="sidebar-widget">
                <h3>{{ t('blog.latestPosts') }}</h3>
                <div class="latest-posts">
                  <div
                    v-for="latestPost in latestPosts"
                    :key="latestPost.id"
                    class="post-item"
                  >
                    <div class="post-thumb">
                      <img :src="latestPost.image" :alt="latestPost.title[locale]" />
                    </div>
                    <div class="post-info">
                      <h5>
                        <NuxtLink :to="localePath(`/blog/${latestPost.slug}`)">
                          {{ latestPost.title[locale] }}
                        </NuxtLink>
                      </h5>
                      <span class="date">{{ formatDate(latestPost.publishDate) }}</span>
                    </div>
                  </div>
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
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const { getPostBySlug, getLatestPosts } = useBlog()

const post = computed(() => {
  return getPostBySlug(route.params.slug as string)
})

const latestPosts = computed(() => {
  return getLatestPosts(5).filter(p => p.id !== post.value?.id)
})

const contentParagraphs = computed(() => {
  if (!post.value) return []
  return post.value.content[locale.value].split('\n\n')
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(locale.value === 'uz' ? 'uz-UZ' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Blog post not found'
  })
}

useHead({
  title: post.value ? post.value.title[locale.value] : '',
  meta: [
    {
      name: 'description',
      content: post.value ? post.value.excerpt[locale.value] : ''
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

.featured-image {
  margin-bottom: 30px;
  border-radius: var(--border-radius-large);
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.post-meta {
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--bg-gray);
  flex-wrap: wrap;
}

.post-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: 14px;
}

.post-meta i {
  color: var(--primary-color);
}

.post-content p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 20px;
  color: var(--text-color);
}

.post-tags {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid var(--bg-gray);
}

.post-tags h4 {
  margin-bottom: 15px;
}

.tags-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 8px 15px;
  background-color: var(--bg-gray);
  color: var(--heading-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: var(--transition);
}

.tag:hover {
  background-color: var(--primary-color);
  color: var(--white-color);
}

.blog-sidebar {
  position: sticky;
  top: 100px;
}

.sidebar-widget {
  background-color: var(--bg-gray);
  padding: 30px;
  border-radius: var(--border-radius-large);
  margin-bottom: 30px;
}

.sidebar-widget h3 {
  margin-bottom: 25px;
}

.post-item {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.post-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.post-thumb {
  flex: 0 0 80px;
  height: 80px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.post-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-info h5 {
  font-size: 16px;
  margin-bottom: 8px;
}

.post-info h5 a {
  color: var(--heading-color);
  transition: var(--transition);
}

.post-info h5 a:hover {
  color: var(--primary-color);
}

.post-info .date {
  font-size: 13px;
  color: var(--text-color);
}

@media (max-width: 991px) {
  .blog-sidebar {
    position: relative;
    top: 0;
    margin-top: 40px;
  }

  .featured-image img {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .page-title h1 {
    font-size: 32px;
  }

  .featured-image img {
    height: 250px;
  }
}
</style>
