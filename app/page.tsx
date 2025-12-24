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

  // Group ALL products by their respective categories
  // First, combine category-specific products with products from allProducts that match the category
  const productsByCategory = {
    'home-garden': [
      ...homeGarden,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'home-garden' && 
        !homeGarden.some((hg: ProductType) => hg._id === p._id)
      )
    ],
    'consumer-electronics': [
      ...consumerElectronics,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'consumer-electronics' && 
        !consumerElectronics.some((ce: ProductType) => ce._id === p._id)
      )
    ],
    'fashion-apparel': [
      ...fashionApparel,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'fashion-apparel' && 
        !fashionApparel.some((fa: ProductType) => fa._id === p._id)
      )
    ],
    'beauty-health': [
      ...beautyHealth,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'beauty-health' && 
        !beautyHealth.some((bh: ProductType) => bh._id === p._id)
      )
    ],
    'automobiles': [
      ...automobiles,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'automobiles' && 
        !automobiles.some((auto: ProductType) => auto._id === p._id)
      )
    ],
    'sports-entertainment': [
      ...sportsEntertainment,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'sports-entertainment' && 
        !sportsEntertainment.some((se: ProductType) => se._id === p._id)
      )
    ],
    'toys-hobbies': [
      ...toysHobbies,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'toys-hobbies' && 
        !toysHobbies.some((th: ProductType) => th._id === p._id)
      )
    ],
    'health-household': [
      ...healthHousehold,
      ...allProducts.filter((p: ProductType) => 
        p.category === 'health-household' && 
        !healthHousehold.some((hh: ProductType) => hh._id === p._id)
      )
    ],
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
