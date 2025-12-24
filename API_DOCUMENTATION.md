# API Integration Documentation

## Free API Services Used

This e-commerce application uses **DummyJSON Products API** - a free, reliable REST API for e-commerce products.

### API Base URL
```
https://dummyjson.com/products
```

## API Endpoints Used

### 1. All Products
```
GET https://dummyjson.com/products?limit=100
```
- Returns: Up to 100 products
- Used for: Home page, general product browsing
- Cache: 1 hour (3600 seconds)

### 2. Smartphones Category
```
GET https://dummyjson.com/products/category/smartphones
```
- Returns: All smartphone products
- Used for: Phones category page
- Cache: 1 hour

### 3. Phone Cases
```
GET https://dummyjson.com/products?limit=30
```
- Returns: General products (filtered for phone cases)
- Used for: Phone Cases category page
- Note: Modified to show as phone cases

### 4. Watches
```
GET https://dummyjson.com/products?limit=100
```
- Returns: All products (filtered for watches)
- Used for: Watches category page
- Filters: Products with "watch" in title or watch-related categories

### 5. Accessories
```
GET https://dummyjson.com/products/category/{category}
```
- Categories used: home-decoration, fragrances, skincare
- Returns: Multiple accessory categories combined
- Used for: Accessories category page

## Data Transformation

The API response is transformed to match our `ProductType` interface:

```typescript
{
  _id: product.id,
  title: product.title,
  description: product.description,
  image: product.images[0] || product.thumbnail,
  price: product.price,
  previousPrice: product.price * 1.2, // 20% markup for discount
  isNew: product.rating >= 4.5, // Products with 4.5+ rating are "new"
  brand: product.brand || 'Brand',
  category: category,
  quantity: product.stock || 100,
}
```

## Features

### ✅ Reliability
- Free API with 99.9% uptime
- No API key required
- Rate limit: 1000 requests/day (free tier)

### ✅ Performance
- Fast response times
- 8-second timeout handling
- Automatic retry for failed requests
- Caching for 1 hour

### ✅ Error Handling
- Graceful fallback to empty arrays
- Timeout protection (8 seconds)
- Console logging for debugging
- No application crashes

## API Response Structure

### Product Object (DummyJSON)
```json
{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile...",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/products/1/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/products/1/1.jpg",
    "https://cdn.dummyjson.com/products/1/2.jpg"
  ]
}
```

### Transformed Product (Our Format)
```json
{
  "_id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile...",
  "image": "https://cdn.dummyjson.com/products/1/1.jpg",
  "price": 549,
  "previousPrice": 659,
  "isNew": true,
  "brand": "Apple",
  "category": "phone",
  "quantity": 94
}
```

## Available Categories

DummyJSON provides these product categories:
- smartphones
- laptops
- fragrances
- skincare
- groceries
- home-decoration
- furniture
- tops
- womens-dresses
- womens-shoes
- mens-shirts
- mens-shoes
- mens-watches
- womens-watches
- womens-bags
- womens-jewellery
- sunglasses
- automotive
- motorcycle
- lighting

## Error Handling

### Timeout Handling
- All requests have 8-second timeout
- Uses `AbortController` for cancellation
- Returns empty array on timeout

### Network Errors
- Catches all fetch errors
- Logs to console for debugging
- Returns empty array instead of crashing

### Response Validation
- Checks if response is OK
- Handles JSON parsing errors
- Validates data structure

## Caching Strategy

- **Cache Duration**: 1 hour (3600 seconds)
- **Revalidation**: On-demand after 1 hour
- **Static Generation**: Pages pre-rendered at build time
- **ISR**: Incremental Static Regeneration

## Rate Limits

**Free Tier:**
- 1000 requests per day
- No API key required
- Public access

**For Production:**
- Consider using paid tier for higher limits
- Implement request throttling
- Add request caching layer

## Testing

### Test API Endpoints

You can test the API directly:

```bash
# All products
curl https://dummyjson.com/products?limit=10

# Smartphones
curl https://dummyjson.com/products/category/smartphones

# Search products
curl https://dummyjson.com/products/search?q=phone
```

## Alternative APIs

If DummyJSON is unavailable, alternatives include:

1. **Fake Store API**
   - URL: `https://fakestoreapi.com/products`
   - Similar structure
   - No authentication needed

2. **REST Countries + Products**
   - For demo purposes
   - Different data structure

3. **JSONPlaceholder**
   - Simpler structure
   - Limited product data

## Migration Guide

To switch to a different API:

1. Update base URL in `app/helpers/index.ts`
2. Modify `transformProduct` function
3. Adjust category mapping
4. Update error handling if needed

## Performance Optimization

### Current Optimizations
- ✅ Request timeout (8 seconds)
- ✅ Response caching (1 hour)
- ✅ Error fallback (empty arrays)
- ✅ Parallel requests for accessories
- ✅ Image optimization (Next.js Image)

### Future Optimizations
- Add request memoization
- Implement service worker caching
- Add CDN for images
- Implement pagination
- Add infinite scroll

## Monitoring

### Logs to Watch
- `Error fetching products:` - API failures
- `Request timeout` - Slow API responses
- Empty product arrays - Data fetching issues

### Health Checks
- API response time
- Success rate
- Error rate
- Cache hit rate

## Support

**DummyJSON Documentation:**
- Website: https://dummyjson.com/
- GitHub: https://github.com/Ovi/DummyJSON
- Discord: Available on their website

**API Status:**
- Check: https://dummyjson.com/status
- Usually 99.9% uptime

---

**Note**: This is a demo application. For production, consider:
- Using a paid API service
- Implementing your own backend
- Adding database for products
- Implementing proper authentication
- Adding rate limiting
- Setting up monitoring

