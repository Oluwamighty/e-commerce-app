# 🛍️ NextCart — E-commerce Store

A fully functional e-commerce application built with Next.js 15, TypeScript, and Tailwind CSS. Browse products, manage your cart, and complete a checkout flow — all with a professional dark-themed UI and mobile-responsive design.

## 🚀 Live Demo

🔗 **[nextcart.vercel.app](https://e-commerce-app-three-coral.vercel.app/)**

---

## 📸 Features

- 🏠 **Homepage** — Hero section with store image background, featured products, about, contact and footer
- 🛍️ **Product Listing** — Server-rendered grid of all products fetched from FakeStore API
- 🔍 **Product Detail** — Individual product pages with image, description, rating and Add to Cart
- 🛒 **Shopping Cart** — Full cart management with quantity controls, subtotals and order summary
- 💳 **Checkout** — Complete form with shipping and payment fields, validation and order summary sidebar
- 📱 **Mobile Responsive** — Every page optimised for mobile, tablet and desktop
- 🔢 **Live Cart Badge** — Navbar badge updates in real time as items are added

---

## 🧠 Architecture Decisions

### Server vs Client Components
Pages that only display data (`/products`, `/products/[id]`) are **Server Components** — they fetch data on the server and send fully rendered HTML to the browser. No loading spinners, no useEffect, better SEO.

Interactive components (`ProductCard`, `AddToCartButton`, `CartPage`, `CheckoutPage`) are **Client Components** with `'use client'` — only where interactivity is actually needed.

```
app/
├── page.tsx                    → Server Component (homepage)
├── products/
│   ├── page.tsx                → Server Component (product list)
│   └── [id]/page.tsx           → Server Component (product detail)
├── cart/page.tsx               → Client Component (cart management)
└── checkout/page.tsx           → Client Component (checkout form)
```

### Island Architecture
Server pages contain small interactive client "islands":

```
ProductDetail (Server) ✅
├── displays product data (server-rendered)
└── <AddToCartButton> (Client) 👈 only this needs 'use client'
```

### Global Cart State
Cart state is managed with **Context API + useReducer** — giving named, predictable actions instead of scattered setState calls:

```ts
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework — App Router, SSR, file-based routing |
| TypeScript | Type safety throughout |
| Tailwind CSS | Utility-first styling |
| Context API | Global cart state |
| useReducer | Cart action management |
| useMemo | Cart total performance optimization |
| Jest + RTL | Unit and component testing |
| FakeStore API | Mock product data |

---

## ⚛️ React & Next.js Concepts Demonstrated

- `useState` — form inputs and local UI state
- `useReducer` — complex cart state with typed actions
- `useContext` — consuming global cart state
- `useMemo` — memoized cart total calculation
- `useRouter` — programmatic navigation after checkout
- Server Components — data fetching without useEffect
- Dynamic routes — `/products/[id]` with `await params`
- Next.js Metadata API — SEO on every page
- `next/dynamic` — lazy loading for performance
- `next/image` — optimized image loading
- Controlled forms — value + onChange pattern
- Form validation — all fields checked at once with inline errors
- TypeScript discriminated unions — `CartAction` type safety
- Island architecture — server pages with client component islands

---

## 🧪 Testing

Tests written with **Jest** and **React Testing Library**.

```bash
npm test
```

**Cart Reducer tests** — `context/CartContext.test.ts`
- Adds new item to empty cart
- Increases quantity when adding existing item
- Removes an item from cart
- Updates quantity of an item
- Clears the entire cart

**ProductCard tests** — `components/ProductCard.test.tsx`
- Renders product title
- Renders product price
- Renders product image with correct alt text
- Renders Add to Cart button
- Add to Cart button is clickable

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                  → Root layout with Navbar + CartProvider
│   ├── page.tsx                    → Homepage
│   ├── products/
│   │   ├── page.tsx                → Product listing (Server Component)
│   │   └── [id]/
│   │       └── page.tsx            → Product detail (Server Component)
│   ├── cart/
│   │   └── page.tsx                → Cart page (Client Component)
│   └── checkout/
│       └── page.tsx                → Checkout page (Client Component)
├── components/
│   ├── Navbar.tsx                  → Sticky navbar with cart badge
│   ├── Button.tsx                  → Reusable dual-mode button (Link or action)
│   ├── ProductCard.tsx             → Product card with Add to Cart
│   ├── ProductCard.test.tsx        → ProductCard tests
│   ├── AddToCartButton.tsx         → Client island for product detail page
│   └── CartBadge.tsx               → Live cart item count in navbar
├── context/
│   ├── CartContext.tsx             → CartProvider + cartReducer + CartAction types
│   └── CartContext.test.ts         → Cart reducer tests
├── types/
│   └── index.ts                    → Product and CartItem TypeScript interfaces
└── lib/
    └── utils.ts                    → cn() utility (clsx + tailwind-merge)
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Oluwamighty/e-commerce-app.git

# Navigate into the project
cd e-commerce-app

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 API

This project uses the **FakeStore API** for mock product data:

```
GET https://fakestoreapi.com/products          → All products
GET https://fakestoreapi.com/products?limit=4  → Featured products (homepage)
GET https://fakestoreapi.com/products/:id      → Single product
```

---

## 📱 Responsive Design

Every page is fully responsive across:
- 📱 Mobile (< 640px) — stacked layouts, full-width buttons
- 💻 Tablet (640px - 1024px) — two-column grids
- 🖥️ Desktop (> 1024px) — four-column product grid, sidebar order summary

---

## 🎨 Design Decisions

- **Dark theme** — `gray-900` background with `gray-800` cards and `green-600` accents
- **`cn()` utility** — `clsx` + `tailwind-merge` for clean conditional Tailwind classes
- **Reusable `Button` component** — TypeScript discriminated union handles both `href` (Link) and `onClick` (button) modes
- **Sticky navbar** — stays visible while scrolling with live cart badge
- **Sticky order summary** — visible on cart and checkout pages while scrolling through items

---

## 👨‍💻 Author

**Ojo Azeez Olawale**
- GitHub: [@Oluwamighty](https://github.com/Oluwamighty)
- Portfolio: [oluwamighty.github.io/portfolio](https://oluwamighty.github.io/portfolio)
- Email: olawaleojo42@gmail.com

---

## 📄 License

MIT License — feel free to use this project as a reference or starting point.