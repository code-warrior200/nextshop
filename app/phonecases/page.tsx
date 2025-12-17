import Container from "../components/Container";
import Products from "../components/Products";
import { getPhoneCases } from "../helpers";

export default async function PhoneCasesPage() {
  const products = await getPhoneCases();

  return (
    <main className="py-16">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Phone Cases</h1>
          <p className="text-lg text-muted-foreground">
            Protect your device with stylish phone cases
          </p>
        </div>
        <Products products={products} />
      </Container>
    </main>
  );
}

