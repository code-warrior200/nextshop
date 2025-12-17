# Installation Guide

Complete installation instructions for NiceShop e-commerce platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **Git** (optional, for cloning)

Check your versions:
```bash
node --version
npm --version
```

## Step 1: Get the Code

### Option A: Clone the Repository
```bash
git clone <repository-url>
cd nextshop
```

### Option B: Download ZIP
Download the ZIP file from the repository and extract it.

## Step 2: Install Dependencies

Run the following command in the project root:

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Zustand
- Embla Carousel
- And all other dependencies (~476 packages)

**Installation time:** 2-5 minutes depending on your internet speed.

## Step 3: Verify Installation

Check that all dependencies were installed correctly:

```bash
npm list --depth=0
```

You should see all packages listed without errors.

## Step 4: Run Development Server

Start the development server:

```bash
npm run dev
```

You should see:
```
> nextshop@0.1.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

## Step 5: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the NiceShop homepage with:
- ✅ Animated hero banner
- ✅ Product grid
- ✅ Navigation bar
- ✅ Footer

## Step 6: Test Features

### Test Shopping Cart
1. Click any "Add to Cart" button
2. Click the cart icon in the navbar
3. Adjust quantities with +/- buttons
4. Verify cart total updates

### Test Wishlist
1. Click the heart icon on any product
2. Click the wishlist icon in the navbar
3. Verify product appears in wishlist
4. Move item to cart

### Test Search
1. Click the search icon in navbar
2. Type a product name
3. Verify real-time results appear
4. Click a result to view product

### Test Navigation
1. Click category links (Phones, Watches, etc.)
2. Verify category pages load
3. Click product to view details
4. Use browser back button

## Build for Production

Create an optimized production build:

```bash
npm run build
```

You should see:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (9/9)
✓ Finalizing page optimization
```

Run production build:

```bash
npm start
```

## Troubleshooting

### Issue: Port 3000 already in use

**Solution:** Use a different port
```bash
npm run dev -- -p 3001
```

### Issue: Module not found errors

**Solution:** Clear and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails with TypeScript errors

**Solution:** Check TypeScript version
```bash
npx tsc --version
```

Should be 5.x or higher. Update if needed:
```bash
npm install -D typescript@latest
```

### Issue: Images not loading

**Solution:** Install sharp for image optimization
```bash
npm install sharp
```

### Issue: Permission errors (Mac/Linux)

**Solution:** Use sudo for global installs only
```bash
sudo npm install -g npm@latest
```

For local installs, don't use sudo.

### Issue: Slow installation

**Solution:** Clear npm cache
```bash
npm cache clean --force
npm install
```

### Issue: ESLint errors

**Solution:** Run linter
```bash
npm run lint
```

Fix auto-fixable issues:
```bash
npm run lint -- --fix
```

## Environment Variables (Optional)

Create a `.env.local` file for custom configuration:

```env
# API URL (optional, defaults to demo API)
NEXT_PUBLIC_API_URL=https://jsonserver.reactbd.com/amazonpro

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## IDE Setup

### VS Code (Recommended)

Install these extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### WebStorm

Enable:
- TypeScript
- ESLint
- Tailwind CSS

## Package Manager Alternatives

### Using Yarn

```bash
yarn install
yarn dev
yarn build
```

### Using pnpm

```bash
pnpm install
pnpm dev
pnpm build
```

## Docker (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t nextshop .
docker run -p 3000:3000 nextshop
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Custom Server

1. Build: `npm run build`
2. Start: `npm start`
3. Use PM2 or similar for production

## Post-Installation

### Update Dependencies

Check for updates:
```bash
npm outdated
```

Update all:
```bash
npm update
```

Update specific package:
```bash
npm install package-name@latest
```

### Clean Install

For a fresh start:
```bash
rm -rf node_modules package-lock.json .next
npm install
```

## Next Steps

1. ✅ Read [QUICK_START.md](QUICK_START.md) for usage guide
2. ✅ Check [FEATURES.md](FEATURES.md) for feature documentation
3. ✅ Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
4. ✅ Customize colors in `tailwind.config.ts`
5. ✅ Connect your own API in `app/helpers/index.ts`

## Support

If you encounter any issues:

1. Check this guide first
2. Review [README.md](README.md)
3. Search existing issues on GitHub
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)

## Success Checklist

- [ ] Dependencies installed without errors
- [ ] Development server runs at http://localhost:3000
- [ ] Home page loads correctly
- [ ] Products display in grid
- [ ] Cart and wishlist work
- [ ] Search functionality works
- [ ] Navigation works
- [ ] Build completes successfully
- [ ] No console errors

If all checked, you're ready to go! 🎉

## Quick Commands Reference

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
npm run lint -- --fix # Fix linting issues
```

---

Happy coding! Need help? Check [README.md](README.md) or open an issue.

