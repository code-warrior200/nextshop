import Banner from './components/Banner'
import { CategoryMenu } from './components/CategoryMenu'
import { CategoryProducts } from './components/CategoryProducts'
import { FlashSale } from './components/FlashSale'
import Container from './components/Container'
import { 
  getProducts, 
  getHomeGarden, 
  getConsumerElectronics, 
  getFashionApparel, 
  getBeautyHealth,
  getAutomobiles,
  getSportsEntertainment,
  getToysHobbies,
  getHealthHousehold
} from './helpers'
import { ProductType } from '@/type'

export default async function Home() {
  // Fetch products for each AliExpress category
  const [
    allProducts, 
    homeGarden, 
    consumerElectronics, 
    fashionApparel, 
    beautyHealth,
    automobiles,
    sportsEntertainment,
    toysHobbies,
    healthHousehold
  ] = await Promise.all([
    getProducts(),
    getHomeGarden(),
    getConsumerElectronics(),
    getFashionApparel(),
    getBeautyHealth(),
    getAutomobiles(),
    getSportsEntertainment(),
    getToysHobbies(),
    getHealthHousehold(),
  ]);

  // Group products by category from all products
  const productsByCategory = {
    'home-garden': homeGarden.length > 0 ? homeGarden : allProducts.filter((p: ProductType) => p.category === 'home-garden'),
    'consumer-electronics': consumerElectronics.length > 0 ? consumerElectronics : allProducts.filter((p: ProductType) => p.category === 'consumer-electronics'),
    'fashion-apparel': fashionApparel.length > 0 ? fashionApparel : allProducts.filter((p: ProductType) => p.category === 'fashion-apparel'),
    'beauty-health': beautyHealth.length > 0 ? beautyHealth : allProducts.filter((p: ProductType) => p.category === 'beauty-health'),
    'automobiles': automobiles.length > 0 ? automobiles : allProducts.filter((p: ProductType) => p.category === 'automobiles'),
    'sports-entertainment': sportsEntertainment.length > 0 ? sportsEntertainment : allProducts.filter((p: ProductType) => p.category === 'sports-entertainment'),
    'toys-hobbies': toysHobbies.length > 0 ? toysHobbies : allProducts.filter((p: ProductType) => p.category === 'toys-hobbies'),
    'health-household': healthHousehold.length > 0 ? healthHousehold : allProducts.filter((p: ProductType) => p.category === 'health-household'),
  };
  
  return (
    <main className="bg-gray-50">
      {/* Keep the existing carousel banner */}
      <Banner/>
      
      {/* Category Menu - AliExpress Style */}
      <CategoryMenu />
      
      {/* Flash Sale Section - AliExpress Style */}
      <FlashSale products={allProducts} />
      
      {/* Category Sections */}
      <CategoryProducts productsByCategory={productsByCategory} />
    </main>
  )
}
