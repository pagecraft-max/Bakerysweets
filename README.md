# 🥐 Aura Artisan Bakery - Gourmet Patisserie & Boulangerie Website

A luxury, production-ready full-stack React application designed for high-end bakeries, patisseries, and gourmet cafes. Features interactive product browsing, dark mode, wishlist, quick view modals, coupon discounting, and instant WhatsApp ordering (+91 9167305507).

---

## 🌟 Key Features

- **Luxury Design & Typography**: Built with Cormorant Garamond display serif, Plus Jakarta Sans, and rich warm cream/gold aesthetics.
- **WhatsApp Order Integration**: Generates formatted order summaries automatically and routes customers directly to WhatsApp.
- **Admin-Friendly Configuration**: All products, prices, images, descriptions, business hours, and store info are located in a single JSON file (`src/data/bakeryData.json`). No component code edits required!
- **Complete Page Architecture**:
  - **Home**: Animated hero, bestsellers, why choose us, customer reviews, Instagram feed, FAQs, Google map location.
  - **Menu**: Category tabs, search bar, price range filter, sorting (Low/High/Rating), eggless filter, wishlist quick filter.
  - **About Us**: Master baker profiles, heritage timeline, quality promise.
  - **Gallery**: Lightbox image showcase with category filtering.
  - **Testimonials**: Verified reviews grid + "Leave a Review" modal form.
  - **Contact**: Interactive inquiry form with direct WhatsApp route, contact details, business hours.
  - **Cart**: Subtotal calculation, coupon discounts (`WELCOME20`, `FRESH10`, `AURA100`), free delivery threshold calculation.
  - **Checkout**: Full customer details collector & COD payment flow.
  - **Custom 404**: Overbaked bakery-themed error page.
- **Micro-Interactions & Animations**: Framer Motion transitions, floating action bar, scroll progress indicator, and toast notifications.
- **Responsive & Dark Mode**: Flawless experience on Mobile, Tablet, and Desktop with dark mode support.

---

## ⚙️ Administrative Quick Guide (Editing Content)

All content is managed through `/src/data/bakeryData.json`.

### 1. Changing Bakery Name & Slogan
Open `src/data/bakeryData.json` and edit the `bakery` object:
```json
"bakery": {
  "name": "Aura Artisan Bakery",
  "slogan": "Handcrafted with Passion, Baked Fresh Daily",
  ...
}
```

### 2. Changing WhatsApp Number & Contact Details
Update `whatsapp` (digits only with country code) and `whatsappDisplay`:
```json
"whatsapp": "919167305507",
"whatsappDisplay": "+91 9167305507",
"phone": "+91 9167305507",
"email": "orders@aurabakery.com"
```

### 3. Editing Products & Prices
Modify items inside the `products` array:
```json
{
  "id": "p1",
  "name": "Belgian Dark Chocolate Fudge Cake",
  "category": "Cakes",
  "price": 850,
  "rating": 4.9,
  "badge": "Bestseller",
  "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  "description": "Rich 70% Belgian dark chocolate sponge...",
  "isEggless": true,
  "weight": "500g"
}
```

### 4. Adding or Modifying Coupons
Update the `coupons` array:
```json
"coupons": [
  {
    "code": "WELCOME20",
    "discountType": "percentage",
    "value": 20,
    "minOrder": 300,
    "description": "20% OFF on your first order"
  }
]
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/aura-bakery.git

# Navigate to folder
cd aura-bakery

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory, ready for deployment on Vercel, Netlify, GitHub Pages, or Google Cloud Run.

---

## 📂 Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── QuickViewModal.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── FloatingActions.tsx
│   │   ├── ImageLightboxModal.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SkeletonLoader.tsx
│   │   ├── SuccessModal.tsx
│   │   └── ToastContainer.tsx
│   ├── context/
│   │   └── ShopContext.tsx
│   ├── data/
│   │   └── bakeryData.json
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── MenuPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── TestimonialsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── metadata.json
├── package.json
└── vite.config.ts
```

---

## 🎨 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Persistence**: Browser LocalStorage
