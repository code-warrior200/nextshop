import Container from "../components/Container";
import Products from "../components/Products";
import { getFragrances } from "../helpers";

export default async function FragrancePage() {
  const products = await getFragrances();

  return (
    <main className="py-16">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Fragrances & Perfumes</h1>
          <p className="text-lg text-muted-foreground">
            Discover premium fragrances and perfumes from top brands
          </p>
        </div>
        <Products products={products} />
      </Container>
    </main>
  );
}

