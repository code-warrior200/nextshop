import Container from "../components/Container";
import Products from "../components/Products";
import { getAccessories } from "../helpers";

export default async function AccessoriesPage() {
  const products = await getAccessories();

  return (
    <main className="py-16">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Accessories</h1>
          <p className="text-lg text-muted-foreground">
            Complete your setup with premium accessories
          </p>
        </div>
        <Products products={products} />
      </Container>
    </main>
  );
}

