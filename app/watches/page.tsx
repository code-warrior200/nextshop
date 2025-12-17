import Container from "../components/Container";
import Products from "../components/Products";
import { getWatches } from "../helpers";

export default async function WatchesPage() {
  const products = await getWatches();

  return (
    <main className="py-16">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Smart Watches</h1>
          <p className="text-lg text-muted-foreground">
            Discover premium smartwatches and wearables
          </p>
        </div>
        <Products products={products} />
      </Container>
    </main>
  );
}

