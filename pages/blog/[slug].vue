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
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-12">
            <article class="blog-post">
              <!-- Featured Image -->
              <figure class="featured-image">
                <img :src="post.image" :alt="post.title[locale]" />
              </figure>

              <!-- Post Meta -->
              <div class="post-meta">
                <span><i class="fas fa-calendar"></i> {{ formatDate(post.publishDate) }}</span>
              </div>

              <!-- Post Content -->
              <div class="post-content">
                <p v-for="(paragraph, index) in contentParagraphs" :key="index">
                  {{ paragraph }}
                </p>
              </div>

              <!-- Media Section -->
              <div class="media-section" v-if="post.video || post.audio">
                <!-- Video Player -->
                <div v-if="post.video" class="media-item">
                  <h4 class="media-title">
                    <i class="fas fa-video"></i> Video
                  </h4>
                  <div class="video-wrapper">
                    <video controls class="video-player">
                      <source :src="post.video" type="video/mp4">
                      Brauzeringiz video ni qo'llab-quvvatlamaydi.
                    </video>
                  </div>
                </div>

                <!-- Audio Player -->
                <div v-if="post.audio" class="media-item">
                  <h4 class="media-title">
                    <i class="fas fa-music"></i> Audio
                  </h4>
                  <div class="audio-wrapper">
                    <audio controls class="audio-player">
                      <source :src="post.audio" type="audio/mpeg">
                      Brauzeringiz audio ni qo'llab-quvvatlamaydi.
                    </audio>
                  </div>
                </div>
              </div>

              <!-- Comments Section -->
              <div class="comments-section">
                <h3 class="comments-title">Izohlar ({{ comments.length }})</h3>

                <!-- Comments List -->
                <div class="comments-list" v-if="comments.length > 0">
                  <div v-for="comment in comments" :key="comment.id" class="comment-item">
                    <div class="comment-content">
                      <div class="comment-header">
                        <span class="comment-author">Anonim</span>
                        <span class="comment-date">{{ formatDate(comment.date) }}</span>
                      </div>
                      <p>{{ comment.message }}</p>
                    </div>
                  </div>
                </div>

                <div v-else class="no-comments">
                  <p>Hali izohlar yo'q</p>
                </div>

                <!-- Comment Form -->
                <div class="comment-form">
                  <form @submit.prevent="submitComment">
                    <textarea
                      v-model="commentForm.message"
                      class="form-control"
                      rows="3"
                      placeholder="Izohingiz..."
                      required
                    ></textarea>
                    <button type="submit" class="submit-btn" :disabled="isSubmitting">
                      {{ isSubmitting ? 'Yuklanmoqda...' : 'Yuborish' }}
                    </button>
                    <div v-if="submitMessage" class="submit-message" :class="submitMessage.type">
                      {{ submitMessage.text }}
                    </div>
                  </form>
                </div>
              </div>
            </article>
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

const { getPostBySlug } = useBlog()

const post = computed(() => {
  return getPostBySlug(route.params.slug as string)
})

const contentParagraphs = computed(() => {
  if (!post.value) return []
  return post.value.content[locale.value].split('\n\n')
})

const formatDate = (date: string) => {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()

  // Format: DD.MM.YYYY
  return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`
}

// Comments state
const comments = ref<Array<{
  id: number
  message: string
  date: string
}>>([])

// Comment form state
const commentForm = ref({
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref<{ text: string; type: 'success' | 'error' } | null>(null)

// Load comments from localStorage
onMounted(() => {
  const postSlug = route.params.slug as string
  const savedComments = localStorage.getItem(`comments_${postSlug}`)
  if (savedComments) {
    comments.value = JSON.parse(savedComments)
  }
})

// Submit comment
const submitComment = async () => {
  isSubmitting.value = true
  submitMessage.value = null

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  try {
    const newComment = {
      id: Date.now(),
      message: commentForm.value.message,
      date: new Date().toISOString()
    }

    comments.value.unshift(newComment)

    // Save to localStorage
    const postSlug = route.params.slug as string
    localStorage.setItem(`comments_${postSlug}`, JSON.stringify(comments.value))

    // Reset form
    commentForm.value = {
      message: ''
    }

    submitMessage.value = {
      text: 'Yuborildi',
      type: 'success'
    }

    // Clear success message after 3 seconds
    setTimeout(() => {
      submitMessage.value = null
    }, 3000)
  } catch (error) {
    submitMessage.value = {
      text: 'Xatolik yuz berdi',
      type: 'error'
    }
  } finally {
    isSubmitting.value = false
  }
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

/* Media Section */
.media-section {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid var(--bg-gray);
}

.media-item {
  margin-bottom: 30px;
}

.media-item:last-child {
  margin-bottom: 0;
}

.media-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.media-title i {
  color: var(--primary-color);
  font-size: 24px;
}

.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: var(--border-radius-large);
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.video-player {
  width: 100%;
  max-height: 500px;
  display: block;
  outline: none;
}

.audio-wrapper {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 30px;
  border-radius: var(--border-radius-large);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.audio-player {
  width: 100%;
  outline: none;
  border-radius: var(--border-radius);
}

.audio-player::-webkit-media-controls-panel {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: var(--border-radius);
}

/* Comments Section */
.comments-section {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #e5e5e5;
}

.comments-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--heading-color);
}

.comments-list {
  margin-bottom: 30px;
}

.comment-item {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.comment-item:last-child {
  margin-bottom: 0;
}

.comment-content {
  width: 100%;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  gap: 10px;
}

.comment-author {
  font-size: 13px;
  font-weight: 500;
  color: #6c757d;
}

.comment-date {
  font-size: 12px;
  color: #adb5bd;
}

.comment-content p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
}

.no-comments {
  padding: 20px;
  text-align: center;
  color: #adb5bd;
  font-size: 14px;
  margin-bottom: 30px;
}

.no-comments p {
  margin: 0;
}

.comment-form {
  padding: 0;
}

.comment-form form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  transition: border-color 0.2s;
  background-color: var(--white-color);
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-control::placeholder {
  color: #adb5bd;
}

textarea.form-control {
  resize: vertical;
  min-height: 80px;
}

.submit-btn {
  align-self: flex-start;
  padding: 10px 24px;
  background-color: var(--primary-color);
  color: var(--white-color);
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #3d8b5c;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 13px;
}

.submit-message.success {
  background-color: #d4edda;
  color: #155724;
}

.submit-message.error {
  background-color: #f8d7da;
  color: #721c24;
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

  .comments-title {
    font-size: 18px;
  }

  .comment-item {
    padding: 12px;
  }

  .video-player {
    max-height: 300px;
  }

  .audio-wrapper {
    padding: 20px;
  }

  .media-title {
    font-size: 18px;
  }
}

@media (max-width: 576px) {
  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>
