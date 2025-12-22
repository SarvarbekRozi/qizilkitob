<template>
  <footer class="main-footer">
    <div class="footer-top">
      <div class="pattern-layer"></div>
      <div class="auto-container">
        <div class="row clearfix">
          <!-- Logo Widget -->
          <div class="col-lg-4 col-md-6 col-sm-12 footer-column">
            <div class="footer-widget logo-widget">
              <figure class="footer-logo">
                <NuxtLink :to="localePath('/')">
                  <div class="logo-text">
                    <i class="fas fa-book-open"></i>
                    <span>QIZIL KITOB</span>
                  </div>
                </NuxtLink>
              </figure>
              <p class="footer-text">{{ t('footer.about') }}</p>
              <ul class="footer-social clearfix">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" title="Telegram">
                    <i class="fab fa-telegram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                    <i class="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Links Widget -->
          <div class="col-lg-2 col-md-6 col-sm-12 footer-column">
            <div class="footer-widget links-widget">
              <div class="widget-title">
                <h5>{{ t('footer.quickLinks') }}</h5>
              </div>
              <div class="widget-content">
                <ul class="links-list clearfix">
                  <li>
                    <NuxtLink :to="localePath('/about')">
                      <i class="fas fa-chevron-right"></i>
                      {{ t('nav.about') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/species')">
                      <i class="fas fa-chevron-right"></i>
                      {{ t('nav.species') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/gallery')">
                      <i class="fas fa-chevron-right"></i>
                      {{ t('nav.gallery') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/blog')">
                      <i class="fas fa-chevron-right"></i>
                      {{ t('nav.blog') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/contact')">
                      <i class="fas fa-chevron-right"></i>
                      {{ t('nav.contact') }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Contact Widget -->
          <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
            <div class="footer-widget contact-widget">
              <div class="widget-title">
                <h5>{{ t('footer.contactInfo') }}</h5>
              </div>
              <div class="widget-content">
                <ul class="info clearfix">
                  <li><i class="fas fa-phone-alt"></i><a href="tel:+998712345678">+998 71 234 56 78</a></li>
                  <li><i class="fas fa-envelope"></i><a href="mailto:info@redbook.uz">info@redbook.uz</a></li>
                  <li><i class="fas fa-map-marker-alt"></i>Toshkent, O'zbekiston</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Gallery Widget -->
          <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
            <div class="footer-widget gallery-widget">
              <div class="widget-title">
                <h5>{{ t('footer.gallery') }}</h5>
              </div>
              <div class="widget-content">
                <ul class="image-list clearfix">
                  <li v-for="(image, index) in galleryImages" :key="index">
                    <figure class="image">
                      <a :href="image" target="_blank">
                        <img :src="image" :alt="`Gallery ${index + 1}`" />
                        <div class="overlay">
                          <i class="fas fa-search-plus"></i>
                        </div>
                      </a>
                    </figure>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom centred">
      <div class="auto-container">
        <div class="copyright">
          <p>{{ t('footer.copyright') }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const galleryImages = [
  'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=200&h=150&fit=crop', // Snow Leopard
  'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=200&h=150&fit=crop', // Nature
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop', // Forest
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=200&h=150&fit=crop', // Tulips
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=150&fit=crop', // Landscape
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=150&fit=crop'  // Wildlife
]
</script>

<style scoped>
.main-footer {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ccc;
}

.footer-top {
  position: relative;
  padding: 80px 0 40px;
}

.pattern-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/shapes/shape-4.png');
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.05;
}

.footer-widget {
  margin-bottom: 40px;
}

.footer-logo {
  margin-bottom: 25px;
}

.logo-text {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--white-color);
  font-size: 28px;
  font-weight: 800;
  transition: all 0.3s ease;
}

.logo-text i {
  font-size: 42px;
  color: var(--primary-color);
  transition: transform 0.3s ease;
}

.logo-text:hover i {
  transform: scale(1.1) rotate(5deg);
}

.logo-text span {
  letter-spacing: 1px;
}

.footer-text {
  color: #b3b3b3;
  margin-bottom: 25px;
  line-height: 1.8;
  font-size: 15px;
}

.footer-social {
  list-style: none;
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 0;
}

.footer-social li {
  transition: transform 0.3s ease;
}

.footer-social li:hover {
  transform: translateY(-5px);
}

.footer-social a {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  color: var(--white-color);
  border-radius: 50%;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.footer-social a::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--primary-color);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
  z-index: 0;
}

.footer-social a:hover::before {
  width: 100%;
  height: 100%;
}

.footer-social a i {
  position: relative;
  z-index: 1;
  font-size: 18px;
}

.footer-social a:hover {
  color: var(--white-color);
  border-color: var(--primary-color);
  box-shadow: 0 5px 15px rgba(46, 139, 87, 0.4);
}

.widget-title h5 {
  color: var(--white-color);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 15px;
}

.widget-title h5::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.links-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.links-list li {
  margin-bottom: 14px;
}

.links-list a {
  color: #b3b3b3;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
}

.links-list a i {
  font-size: 10px;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.links-list a:hover {
  color: var(--primary-color);
  padding-left: 8px;
}

.links-list a:hover i {
  transform: translateX(3px);
}

.contact-widget .info {
  list-style: none;
  margin: 0;
  padding: 0;
}

.contact-widget .info li {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 18px;
  color: #b3b3b3;
  font-size: 15px;
  transition: all 0.3s ease;
}

.contact-widget .info li:hover {
  color: var(--white-color);
  transform: translateX(5px);
}

.contact-widget .info li i {
  color: var(--primary-color);
  font-size: 20px;
  margin-top: 3px;
  min-width: 20px;
}

.contact-widget .info a {
  color: #b3b3b3;
  transition: all 0.3s ease;
}

.contact-widget .info a:hover {
  color: var(--primary-color);
}

.image-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0;
  padding: 0;
}

.image-list .image {
  margin: 0;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
}

.image-list .image a {
  display: block;
  position: relative;
  overflow: hidden;
}

.image-list img {
  width: 100%;
  height: 85px;
  object-fit: cover;
  transition: all 0.5s ease;
  display: block;
}

.image-list .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(46, 139, 87, 0.9), rgba(34, 139, 34, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.image-list .overlay i {
  color: var(--white-color);
  font-size: 24px;
  transform: scale(0);
  transition: transform 0.4s ease;
}

.image-list .image:hover .overlay {
  opacity: 1;
}

.image-list .image:hover .overlay i {
  transform: scale(1);
}

.image-list .image:hover img {
  transform: scale(1.15);
}

.footer-bottom {
  background-color: #0f0f0f;
  padding: 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright p {
  color: #999;
  margin: 0;
  font-size: 14px;
}

.copyright a {
  color: var(--primary-color);
  transition: color 0.3s ease;
}

.copyright a:hover {
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .footer-top {
    padding: 60px 0 20px;
  }

  .logo-text {
    font-size: 24px;
  }

  .logo-text i {
    font-size: 36px;
  }

  .image-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .image-list img {
    height: 70px;
  }

  .widget-title h5 {
    font-size: 20px;
  }
}
</style>
