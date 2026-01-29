# Qizil Kitob - Loyiha Dokumentatsiyasi

> O'zbekiston Qizil Kitobi elektron platformasi

---

## 1. LOYIHA HAQIDA

**Maqsad:** O'zbekistondagi noyob va yo'qolib ketayotgan hayvonlar hamda o'simliklar haqida ma'lumot beruvchi interaktiv veb-platforma yaratish.

**Texnologiyalar:**
- **Frontend:** Nuxt 3 (Vue 3), Bootstrap 5, Leaflet, Swiper, Fuse.js
- **Backend:** Laravel 10 (PHP 8.1+), MySQL, Spatie Media Library, JWT Auth
- **Tillar:** O'zbek (uz), Rus (ru), Ingliz (en)

---

## 2. LOYIHA STRUKTURASI

### 2.1 Frontend (Nuxt 3)
```
qizilkitob/
├── pages/
│   ├── index.vue                    # Bosh sahifa
│   ├── about.vue                    # Biz haqimizda
│   ├── contact.vue                  # Aloqa formasi
│   ├── gallery.vue                  # Galereya
│   ├── map.vue                      # Interaktiv xarita
│   ├── partners.vue                 # Hamkorlar
│   ├── species/
│   │   ├── index.vue                # Turlar ro'yxati
│   │   └── [slug].vue               # Tur tafsilotlari
│   ├── blog/
│   │   ├── index.vue                # Blog/Yangiliklar
│   │   └── [slug].vue               # Maqola tafsilotlari
│   └── natural-resources/
│       ├── index.vue                # Tabiiy boyliklar
│       └── [slug].vue               # Boylik tafsilotlari
├── components/
│   ├── layout/                      # Header, Footer, Menu
│   ├── species/                     # Species komponentlari
│   └── ui/                          # UI komponentlar
├── composables/
│   ├── useSpeciesData.ts            # Species data logic
│   ├── useBlog.ts                   # Blog data logic
│   ├── useNaturalResources.ts       # Resources logic
│   └── useSearch.ts                 # Qidiruv logic
├── types/
│   ├── species.ts                   # Species interface
│   ├── blog.ts                      # Blog interface
│   └── natural-resource.ts          # Resource interface
├── data/                            # Statik JSON ma'lumotlar
├── locales/                         # i18n tarjimalar
└── assets/                          # CSS, fonts, images
```

### 2.2 Backend (Laravel 10)
```
admin-qizilkitob-uz/
├── app/
│   ├── Models/
│   │   ├── Species.php              # ✅ YANGI - Turlar modeli
│   │   ├── NaturalResource.php      # ✅ YANGI - Tabiiy boyliklar
│   │   ├── ContactSubmission.php    # ✅ YANGI - Aloqa xabarlari
│   │   ├── Post.php                 # Mavjud - Blog/News
│   │   ├── Section.php              # Mavjud - Kategoriyalar
│   │   ├── Tag.php                  # Mavjud - Teglar
│   │   ├── PostComment.php          # Mavjud - Izohlar
│   │   └── User.php                 # Mavjud - Foydalanuvchilar
│   ├── Http/Controllers/
│   │   ├── Api/
│   │   │   ├── SpeciesController.php        # ✅ YANGI
│   │   │   ├── NaturalResourceController.php # ✅ YANGI
│   │   │   ├── BlogController.php           # ✅ YANGI
│   │   │   ├── ContactController.php        # ✅ YANGI
│   │   │   └── HomeController.php           # Mavjud
│   │   └── Admin/
│   │       ├── SpeciesController.php        # ✅ YANGI
│   │       ├── NaturalResourceController.php # ✅ YANGI
│   │       ├── ContactSubmissionController.php # ✅ YANGI
│   │       └── PostController.php           # Mavjud
│   └── Mixins/
│       └── ResponseFactoryMixin.php # ✅ YANGILANDI
├── database/migrations/
│   ├── 2026_01_29_100001_create_species_table.php           # ✅ YANGI
│   ├── 2026_01_29_100002_create_natural_resources_table.php # ✅ YANGI
│   ├── 2026_01_29_100003_create_contact_submissions_table.php # ✅ YANGI
│   └── 2026_01_29_100004_add_qizilkitob_permissions.php     # ✅ YANGI
├── resources/views/admin/
│   ├── species/                     # ✅ YANGI - CRUD views
│   ├── natural-resources/           # ✅ YANGI - CRUD views
│   └── contact-submissions/         # ✅ YANGI - List/Show views
├── routes/
│   ├── api.php                      # ✅ YANGILANDI - API routes
│   └── web.php                      # ✅ YANGILANDI - Admin routes
└── resources/views/partials/
    └── menu.blade.php               # ✅ YANGILANDI - Admin menu
```

---

## 3. QILINGAN ISHLAR ✅

### 3.1 Backend - Migrationlar
| Fayl | Tavsif | Status |
|------|--------|--------|
| `create_species_table.php` | Turlar jadvali (hayvonlar/o'simliklar) | ✅ Tayyor |
| `create_natural_resources_table.php` | Tabiiy boyliklar jadvali | ✅ Tayyor |
| `create_contact_submissions_table.php` | Aloqa xabarlari jadvali | ✅ Tayyor |
| `add_qizilkitob_permissions.php` | Admin permissionlar | ✅ Tayyor |

### 3.2 Backend - Modellar
| Model | Xususiyatlar | Status |
|-------|--------------|--------|
| `Species.php` | Ko'p tilli, Spatie Media, slug, stats JSON, coordinates | ✅ Tayyor |
| `NaturalResource.php` | Ko'p tilli, Spatie Media, features JSON, stats JSON | ✅ Tayyor |
| `ContactSubmission.php` | Status management, Telegram notification | ✅ Tayyor |

### 3.3 Backend - API Controllerlar
| Controller | Endpointlar | Status |
|------------|-------------|--------|
| `SpeciesController` | index, show, featured, stats, forMap, gallery, byCategory | ✅ Tayyor |
| `NaturalResourceController` | index, show, featured, latest, categories, byCategory | ✅ Tayyor |
| `BlogController` | index, show, latest, popular, comments, addComment, categories | ✅ Tayyor |
| `ContactController` | submit (+ Telegram notification) | ✅ Tayyor |

### 3.4 Backend - Admin Controllerlar
| Controller | Funksiyalar | Status |
|------------|-------------|--------|
| `SpeciesController` | CRUD, toggleStatus, toggleFeatured, massDestroy | ✅ Tayyor |
| `NaturalResourceController` | CRUD, toggleStatus, toggleFeatured, massDestroy | ✅ Tayyor |
| `ContactSubmissionController` | index, show, updateStatus, destroy, massArchive | ✅ Tayyor |

### 3.5 Backend - Admin View'lar
| Papka | Fayllar | Status |
|-------|---------|--------|
| `admin/species/` | index, create, edit, show | ✅ Tayyor |
| `admin/natural-resources/` | index, create, edit, show | ✅ Tayyor |
| `admin/contact-submissions/` | index, show | ✅ Tayyor |

### 3.6 Backend - Routelar
| Fayl | Qo'shilgan routelar | Status |
|------|---------------------|--------|
| `api.php` | Species, NaturalResource, Blog, Contact API endpointlari | ✅ Tayyor |
| `web.php` | Admin CRUD routelari | ✅ Tayyor |

### 3.7 Backend - Boshqa
| Fayl | O'zgarish | Status |
|------|-----------|--------|
| `menu.blade.php` | Yangi admin menu itemlari | ✅ Tayyor |
| `ResponseFactoryMixin.php` | successJson JsonResponse qaytaradi | ✅ Tayyor |

### 3.8 Frontend - Mavjud
| Komponent | Tavsif | Status |
|-----------|--------|--------|
| Sahifalar | Barcha sahifalar tayyor (species, blog, natural-resources, map, gallery, contact) | ✅ Tayyor |
| Komponentlar | Header, Footer, SpeciesCard, SpeciesGrid, SearchBar, etc. | ✅ Tayyor |
| i18n | 3 tilda tarjimalar (uz, ru, en) | ✅ Tayyor |
| Xarita | Leaflet bilan interaktiv xarita | ✅ Tayyor |
| Qidiruv | Fuse.js bilan client-side qidiruv | ✅ Tayyor |
| Responsive | Mobile-first dizayn | ✅ Tayyor |

---

## 4. QILINISHI KERAK ISHLAR 📋

### 4.1 Backend - Kritik (Birinchi navbatda)

| # | Vazifa | Prioritet | Tavsif |
|---|--------|-----------|--------|
| 1 | **Migration ishga tushirish** | 🔴 Yuqori | `php artisan migrate` buyrug'ini ishga tushirish |
| 2 | **Test ma'lumotlar yaratish** | 🔴 Yuqori | Seeder yozish yoki admin paneldan qo'shish |
| 3 | **Telegram sozlash** | 🟡 O'rta | Contact form uchun Telegram bot token va chat ID |
| 4 | **CORS sozlash** | 🔴 Yuqori | Frontend dan API ga so'rovlar uchun |

### 4.2 Frontend - API Integratsiya

| # | Vazifa | Prioritet | Tavsif |
|---|--------|-----------|--------|
| 5 | **API Service yaratish** | 🔴 Yuqori | `composables/useApi.ts` - axios/fetch wrapper |
| 6 | **useSpeciesData yangilash** | 🔴 Yuqori | JSON dan API ga o'tkazish |
| 7 | **useBlog yangilash** | 🔴 Yuqori | JSON dan API ga o'tkazish |
| 8 | **useNaturalResources yangilash** | 🔴 Yuqori | JSON dan API ga o'tkazish |
| 9 | **Contact form API** | 🔴 Yuqori | Backend ga xabar yuborish |
| 10 | **Izohlar tizimi** | 🟡 O'rta | localStorage dan API ga o'tkazish |

### 4.3 Frontend - Yaxshilashlar

| # | Vazifa | Prioritet | Tavsif |
|---|--------|-----------|--------|
| 11 | **Loading skeletons** | 🟡 O'rta | API so'rovlar paytida skeleton ko'rsatish |
| 12 | **Error handling** | 🟡 O'rta | API xatolarini to'g'ri ko'rsatish |
| 13 | **Pinia store** | 🟢 Past | Global state management |
| 14 | **Toast notifications** | 🟡 O'rta | Foydalanuvchiga bildirishnomalar |
| 15 | **Form validation** | 🟡 O'rta | VeeValidate bilan validatsiya |
| 16 | **SEO meta tags** | 🟡 O'rta | Har bir sahifa uchun dinamik meta |
| 17 | **Image lazy loading** | 🟢 Past | Rasmlarni lazy load qilish |
| 18 | **PWA support** | 🟢 Past | Offline ishlash imkoniyati |

### 4.4 Backend - Qo'shimcha

| # | Vazifa | Prioritet | Tavsif |
|---|--------|-----------|--------|
| 19 | **Image optimization** | 🟡 O'rta | Spatie image conversions sozlash |
| 20 | **Caching** | 🟡 O'rta | API response caching (Redis/File) |
| 21 | **Rate limiting** | 🟡 O'rta | API rate limiting |
| 22 | **Search optimization** | 🟡 O'rta | Full-text search (MySQL/Meilisearch) |
| 23 | **Backup system** | 🟢 Past | Database va media backup |
| 24 | **Email notifications** | 🟢 Past | Contact form uchun email yuborish |

### 4.5 Admin Panel

| # | Vazifa | Prioritet | Tavsif |
|---|--------|-----------|--------|
| 25 | **Dashboard statistika** | 🟡 O'rta | Species, Resources, Contact sonlari |
| 26 | **Bulk import** | 🟢 Past | Excel/CSV dan import qilish |
| 27 | **Export** | 🟢 Past | Ma'lumotlarni export qilish |
| 28 | **Activity log** | 🟢 Past | Admin harakatlarni logging |

---

## 5. API DOKUMENTATSIYASI

### 5.1 Species (Turlar)

```
Base URL: /api/v2/species

GET /                           Barcha turlar (pagination, filter)
    Query params:
    - category: animal|plant
    - danger_level: critically_endangered|endangered|vulnerable|near_threatened
    - featured: true|false
    - search: string
    - per_page: number (default: 12, max: 50)
    - sort_by: string (default: sort)
    - sort_dir: asc|desc

GET /featured                   Featured turlar
    Query params:
    - limit: number (default: 6, max: 20)

GET /stats                      Statistika
    Response:
    - total, animals, plants, byDangerLevel

GET /map                        Xarita uchun koordinatalar
    Response: id, slug, name, coordinates, category, dangerLevel

GET /gallery                    Galereya rasmlari
    Query params:
    - per_page: number (default: 20)

GET /category/{category}        Kategoriya bo'yicha
    Params: animal | plant

GET /{slug}                     Bitta tur tafsilotlari
    Response: to'liq ma'lumot + related species

Headers:
- Accept-Language: uz|ru|en (default: uz)
```

### 5.2 Natural Resources (Tabiiy boyliklar)

```
Base URL: /api/v2/natural-resources

GET /                           Barcha resurslar (pagination, filter)
    Query params:
    - category: string
    - featured: true|false
    - search: string
    - per_page: number

GET /featured                   Featured resurslar
GET /latest                     So'nggi qo'shilganlar
GET /categories                 Kategoriyalar ro'yxati
GET /category/{category}        Kategoriya bo'yicha
GET /{slug}                     Bitta resurs + related

Headers:
- Accept-Language: uz|ru|en
```

### 5.3 Blog (Yangiliklar)

```
Base URL: /api/v2/blog

GET /                           Barcha postlar
    Query params:
    - category: string (section slug)
    - tag: number (tag id)
    - search: string
    - sort_by: publish_date|views
    - per_page: number

GET /latest                     So'nggi postlar
GET /popular                    Eng ko'p o'qilganlar
GET /categories                 Kategoriyalar (sections)
GET /{slugOrId}                 Bitta post + related
GET /{postId}/comments          Izohlar ro'yxati
POST /{postId}/comments         Izoh qo'shish
    Body: { message: string, reply_to?: number }

Headers:
- Accept-Language: uz|ru|en
```

### 5.4 Contact (Aloqa)

```
Base URL: /api/v2

POST /contact                   Xabar yuborish
    Body:
    {
        "name": "string (required)",
        "email": "email (required)",
        "subject": "string (optional)",
        "message": "string (required, max: 5000)"
    }
    Response:
    {
        "success": true,
        "result": {
            "message": "Xabaringiz muvaffaqiyatli yuborildi",
            "id": number
        }
    }
```

### 5.5 Response Formati

**Muvaffaqiyatli:**
```json
{
    "success": true,
    "result": {
        "data": [...],
        "pagination": {
            "current_page": 1,
            "last_page": 10,
            "per_page": 12,
            "total": 120
        }
    },
    "msg": "ok"
}
```

**Xatolik:**
```json
{
    "success": false,
    "msg": "Error message",
    "error": {...},
    "result": [],
    "code": null
}
```

---

## 6. DATABASE SCHEMA

### 6.1 species
```sql
id                          BIGINT PRIMARY KEY
slug                        VARCHAR(255) UNIQUE
category                    ENUM('animal', 'plant')
danger_level                ENUM('critically_endangered', 'endangered', 'vulnerable', 'near_threatened')
name_uz                     VARCHAR(255)
name_ru                     VARCHAR(255) NULL
name_en                     VARCHAR(255) NULL
scientific_name             VARCHAR(255)
description_short_uz        TEXT NULL
description_short_ru        TEXT NULL
description_short_en        TEXT NULL
description_full_uz         LONGTEXT NULL
description_full_ru         LONGTEXT NULL
description_full_en         LONGTEXT NULL
description_bullets_uz      JSON NULL
description_bullets_ru      JSON NULL
description_bullets_en      JSON NULL
stats                       JSON NULL          -- {mass, speed, lifespan, diet, height, bloomPeriod}
habitat_location_uz         VARCHAR(255) NULL
habitat_location_ru         VARCHAR(255) NULL
habitat_location_en         VARCHAR(255) NULL
habitat_lat                 DECIMAL(10,7) NULL
habitat_lng                 DECIMAL(10,7) NULL
conservation_level          VARCHAR(255) NULL
conservation_population     VARCHAR(255) NULL
threats_uz                  JSON NULL
threats_ru                  JSON NULL
threats_en                  JSON NULL
related_species             JSON NULL          -- ['slug1', 'slug2']
status                      BOOLEAN DEFAULT 1
featured                    BOOLEAN DEFAULT 0
sort                        INT DEFAULT 0
views_count                 BIGINT DEFAULT 0
created_at                  TIMESTAMP
updated_at                  TIMESTAMP
deleted_at                  TIMESTAMP NULL
```

### 6.2 natural_resources
```sql
id                          BIGINT PRIMARY KEY
slug                        VARCHAR(255) UNIQUE
category                    VARCHAR(100) NULL
title_uz                    VARCHAR(255)
title_ru                    VARCHAR(255) NULL
title_en                    VARCHAR(255) NULL
excerpt_uz                  TEXT NULL
excerpt_ru                  TEXT NULL
excerpt_en                  TEXT NULL
content_uz                  LONGTEXT NULL
content_ru                  LONGTEXT NULL
content_en                  LONGTEXT NULL
features_uz                 JSON NULL
features_ru                 JSON NULL
features_en                 JSON NULL
stats                       JSON NULL          -- {area, species, protected}
lat                         DECIMAL(10,7) NULL
lng                         DECIMAL(10,7) NULL
status                      BOOLEAN DEFAULT 1
featured                    BOOLEAN DEFAULT 0
sort                        INT DEFAULT 0
views_count                 BIGINT DEFAULT 0
created_at                  TIMESTAMP
updated_at                  TIMESTAMP
deleted_at                  TIMESTAMP NULL
```

### 6.3 contact_submissions
```sql
id                          BIGINT PRIMARY KEY
name                        VARCHAR(255)
email                       VARCHAR(255)
subject                     VARCHAR(255) NULL
message                     TEXT
ip_address                  VARCHAR(255) NULL
user_agent                  VARCHAR(255) NULL
locale                      VARCHAR(10) NULL
status                      ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new'
admin_notes                 TEXT NULL
read_at                     TIMESTAMP NULL
replied_at                  TIMESTAMP NULL
created_at                  TIMESTAMP
updated_at                  TIMESTAMP
```

---

## 7. FRONTEND API INTEGRATSIYA NAMUNASI

### 7.1 API Service (`composables/useApi.ts`)

```typescript
// composables/useApi.ts
const API_BASE = 'http://admin-qizilkitob-uz/api/v2'

export const useApi = () => {
  const { locale } = useI18n()

  const fetchApi = async (endpoint: string, options = {}) => {
    const response = await $fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Accept-Language': locale.value,
        'Content-Type': 'application/json',
      },
      ...options
    })
    return response
  }

  // Species
  const getSpecies = (params = {}) => fetchApi('/species', { params })
  const getSpeciesBySlug = (slug: string) => fetchApi(`/species/${slug}`)
  const getFeaturedSpecies = (limit = 6) => fetchApi('/species/featured', { params: { limit } })
  const getSpeciesStats = () => fetchApi('/species/stats')
  const getSpeciesForMap = () => fetchApi('/species/map')

  // Natural Resources
  const getNaturalResources = (params = {}) => fetchApi('/natural-resources', { params })
  const getNaturalResourceBySlug = (slug: string) => fetchApi(`/natural-resources/${slug}`)

  // Blog
  const getBlogPosts = (params = {}) => fetchApi('/blog', { params })
  const getBlogPostBySlug = (slug: string) => fetchApi(`/blog/${slug}`)
  const getLatestPosts = (limit = 5) => fetchApi('/blog/latest', { params: { limit } })

  // Contact
  const submitContact = (data: object) => fetchApi('/contact', {
    method: 'POST',
    body: data
  })

  return {
    getSpecies,
    getSpeciesBySlug,
    getFeaturedSpecies,
    getSpeciesStats,
    getSpeciesForMap,
    getNaturalResources,
    getNaturalResourceBySlug,
    getBlogPosts,
    getBlogPostBySlug,
    getLatestPosts,
    submitContact,
  }
}
```

### 7.2 Species Page Namunasi

```vue
<!-- pages/species/index.vue -->
<script setup lang="ts">
const { getSpecies, getSpeciesStats } = useApi()
const route = useRoute()

const category = computed(() => route.query.category as string)
const page = computed(() => Number(route.query.page) || 1)

const { data: speciesData, pending } = await useAsyncData(
  `species-${category.value}-${page.value}`,
  () => getSpecies({
    category: category.value,
    page: page.value,
    per_page: 12
  })
)

const { data: stats } = await useAsyncData('species-stats', getSpeciesStats)
</script>
```

---

## 8. ISHGA TUSHIRISH

### 8.1 Backend

```bash
# 1. Backend papkasiga o'tish
cd D:\work\OSPanel\domains\admin-qizilkitob-uz

# 2. Composer dependencies (agar kerak bo'lsa)
composer install

# 3. .env faylini sozlash
# - DB_DATABASE, DB_USERNAME, DB_PASSWORD
# - APP_URL
# - TELEGRAM_BOT_TOKEN (contact uchun)
# - TELEGRAM_CHAT_ID

# 4. Migrationlarni ishga tushirish
php artisan migrate

# 5. Storage link yaratish (rasmlar uchun)
php artisan storage:link

# 6. Cache tozalash
php artisan config:clear
php artisan cache:clear
```

### 8.2 Frontend

```bash
# 1. Frontend papkasiga o'tish
cd D:\work\OSPanel\domains\qizilkitob

# 2. Dependencies o'rnatish
npm install

# 3. .env faylini yaratish
# NUXT_PUBLIC_API_BASE=http://admin-qizilkitob-uz/api/v2

# 4. Development server
npm run dev

# 5. Production build
npm run build
```

---

## 9. XULOSA

### Tayyor (✅):
- Backend API strukturasi to'liq
- Admin panel CRUD operatsiyalari
- Database migrationlar
- Frontend UI/UX

### Kerak (📋):
- Migration ishga tushirish
- API integratsiya (frontend)
- Test ma'lumotlar
- CORS sozlash
- Production deploy

---

**Yaratilgan:** 2026-01-29
**Versiya:** 1.0.0
**Muallif:** Claude Code
