# NiceShop - Modern E-Commerce Platform

A comprehensive, modern e-commerce web application built with **Next.js 14**, **shadcn/ui**, and **Framer Motion**. This project features a beautiful UI, smooth animations, and complete shopping functionality.

![NiceShop](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎨 Modern UI/UX
- **shadcn/ui components** - Beautiful, accessible, and customizable components
- **Framer Motion animations** - Smooth, performant animations throughout
- **Responsive design** - Optimized for all screen sizes
- **Modern color scheme** - Professional design with custom branding

### 🛒 Shopping Features
- **Product catalog** with multiple categories (Phones, Watches, Cases, Accessories)
- **Product detail pages** with comprehensive information
- **Shopping cart** with persistent storage using Zustand
- **Wishlist functionality** - Save items for later
- **Real-time search** - Instant product search with live results
- **Category filtering** - Easy navigation between product categories

### 🎯 Advanced Functionality
- **State management** - Zustand for global state
- **Local storage persistence** - Cart and wishlist data persists across sessions
- **Toast notifications** - User feedback for all actions
- **Animated carousel** - Beautiful hero banner with auto-play
- **Quantity management** - Adjust item quantities in cart
- **Price calculations** - Automatic totals and discount displays

### 🚀 Technical Highlights
- **Next.js 14 App Router** - Modern routing and layouts
- **Server Components** - Optimized performance
- **TypeScript** - Type-safe code throughout
- **Tailwind CSS** - Utility-first styling
- **Embla Carousel** - Smooth, touch-friendly carousels
- **Radix UI primitives** - Accessible component foundations

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd nextshop
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
nextshop/
├── app/
│   ├── [_id]/              # Product detail page
│   ├── accessories/        # Accessories category page
│   ├── components/         # React components
│   │   ├── Banner.tsx      # Hero carousel
│   │   ├── Container.tsx   # Layout container
│   │   ├── Footer.tsx      # Site footer
│   │   ├── FormattedPrice.tsx
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Product.tsx     # Product card grid
│   │   └── Products.tsx    # Products section
│   ├── helpers/            # Helper functions
│   ├── phonecases/         # Phone cases category page
│   ├── phones/             # Phones category page
│   ├── watches/            # Watches category page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── sonner.tsx
│   ├── cart-sheet.tsx      # Shopping cart sidebar
│   ├── search-dialog.tsx   # Search modal
│   └── wishlist-sheet.tsx  # Wishlist sidebar
├── lib/
│   └── utils.ts            # Utility functions
├── store/
│   └── useStore.ts         # Zustand store
├── type.ts                 # TypeScript types
├── components.json         # shadcn/ui config
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

## 🎨 Components Overview

### Navbar
- Responsive navigation with mobile menu
- Search functionality
- Cart and wishlist indicators with item counts
- Smooth animations and transitions

### Banner (Hero Section)
- Auto-playing carousel with multiple slides
- Touch-friendly navigation
- Feature cards displaying store information
- Parallax-style image display

### Product Grid
- Animated product cards
- Quick actions (Add to cart, wishlist)
- Discount badges
- Hover effects and transitions

### Product Detail Page
- Large product images
- Comprehensive product information
- Quantity selector
- Add to cart and wishlist
- Related features display
- Customer reviews section

### Shopping Cart
- Side drawer with smooth animations
- Quantity adjustment controls
- Item removal
- Price totals
- Persistent storage

### Wishlist
- Save favorite products
- Quick add to cart
- Item management

### Search
- Real-time search results
- Search by title, brand, or category
- Instant navigation to products

## 🎯 Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation library
- **Zustand** - Lightweight state management
- **Radix UI** - Accessible component primitives
- **Embla Carousel** - Carousel library
- **Lucide React** - Beautiful icon set
- **Sonner** - Toast notifications

## 🚀 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Colors
The primary brand color is defined in `tailwind.config.ts`:
```typescript
designColor: "#fcb900" // Yellow/gold brand color
```

### Components
All UI components are located in `components/ui/` and can be customized using the shadcn/ui CLI:
```bash
npx shadcn-ui@latest add [component-name]
```

### Animations
Framer Motion animations can be customized in individual components. Common variants are defined inline for easy modification.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:
```env
NEXT_PUBLIC_API_URL=your-api-url
```

### API Integration
Products are fetched from a demo API. To use your own API:
1. Update the API endpoints in `app/helpers/index.ts`
2. Modify the `ProductType` interface in `type.ts` if needed
3. Update the data fetching functions

## 🎭 Animation Features

- **Page transitions** - Smooth entry animations
- **Product grid** - Staggered animations
- **Cart/Wishlist** - Slide-in drawers
- **Hover effects** - Interactive feedback
- **Loading states** - Skeleton screens
- **Micro-interactions** - Button presses, badge animations

## 🛠️ Future Enhancements

- [ ] User authentication
- [ ] Payment integration
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Advanced filtering (price range, brand, etc.)
- [ ] Product comparison
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Admin dashboard

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Built with ❤️ using Next.js, shadcn/ui, and Framer Motion

## 🙏 Acknowledgments

- **shadcn/ui** - For the amazing component library
- **Vercel** - For Next.js and hosting platform
- **Radix UI** - For accessible primitives
- **Framer** - For the animation library

---

**Happy Shopping! 🛍️**
