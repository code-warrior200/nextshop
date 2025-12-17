import Banner from './components/Banner'
import Products from './components/Products'
import { getProducts } from './helpers'

export default async function Home() {
  const products = await getProducts();
  
  return (
    <main>
      <Banner/>
      <Products products={products} />
    </main>
  )
}
