# Quick Start Guide

Get your NiceShop e-commerce platform up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Basic knowledge of React and Next.js

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- shadcn/ui components
- Framer Motion
- Zustand
- Tailwind CSS
- And all other dependencies

### 2. Run Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`

## What's Included?

### Pages
- **Home** (`/`) - Landing page with hero carousel and product grid
- **Phones** (`/phones`) - Smartphones category
- **Watches** (`/watches`) - Smartwatches category
- **Phone Cases** (`/phonecases`) - Phone cases category
- **Accessories** (`/accessories`) - Accessories category
- **Product Detail** (`/[_id]`) - Individual product pages

### Features Ready to Use

✅ **Shopping Cart**
- Click the cart icon in the navbar
- Add products to cart
- Adjust quantities
- Remove items
- View total price

✅ **Wishlist**
- Click the heart icon on any product
- Save items for later
- Quick add to cart from wishlist

✅ **Search**
- Click the search icon in navbar
- Search by product name, brand, or category
- Real-time results

✅ **Responsive Design**
- Works on desktop, tablet, and mobile
- Mobile menu for small screens

### Component Library

All shadcn/ui components are ready to use:
```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// ... and more
```

## Customization

### Change Brand Color

Edit `tailwind.config.ts`:
```typescript
colors: {
  designColor: "#fcb900" // Change to your brand color
}
```

### Modify API Endpoint

Edit `app/helpers/index.ts` to point to your API:
```typescript
const res = await fetch("YOUR_API_URL");
```

### Add New Components

Use shadcn CLI to add more components:
```bash
npx shadcn-ui@latest add [component-name]
```

## Next Steps

1. **Customize the design** - Modify colors, fonts, and layouts
2. **Connect your API** - Replace demo API with your backend
3. **Add authentication** - Implement user login/signup
4. **Add payment** - Integrate Stripe or PayPal
5. **Deploy** - Deploy to Vercel, Netlify, or your preferred host

## Common Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

## File Structure Quick Reference

```
app/
├── components/      # React components
├── helpers/         # API functions
├── [_id]/          # Product detail page
├── phones/         # Category pages
├── watches/
├── phonecases/
└── accessories/

components/
├── ui/             # shadcn/ui components
├── cart-sheet.tsx  # Shopping cart
└── wishlist-sheet.tsx

store/
└── useStore.ts     # Global state management
```

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use different port
```

### Missing Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run lint        # Check for errors
npm run build       # Try building
```

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Look at [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub

Happy coding! 🚀

