import { count } from "console";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

export const metadata = {
  title: "Products | NextCart",
  description: "Browse our full product catalog",
};

// const data = [
//   {
//     id: 1, 
//     title: 'Mens Casual Premium Slim Fit T-Shirts ', 
//     price: 22.3, 
//     description: 'Slim-fitting style, contrast raglan long sleeve, t…e round neckline includes a three-button placket.', category: "men's clothing", 
//     image: 'lizzy.jpg',
//     rating: {
//       rate: 3.9, 
//       count: 120
//    } 
//   },
//   {
//     id: 2, 
//     title: 'Mens Casual Premium Slim Fit T-Shirts ', 
//     price: 22.3, 
//     description: 'Slim-fitting style, contrast raglan long sleeve, t…e round neckline includes a three-button placket.', category: "men's clothing", 
//     image: 'lizzy.jpg',
//     rating: {
//       rate: 3.9, 
//       count: 120
//    } 
//   },
//   {
//     id: 3, 
//     title: 'Mens Casual Premium Slim Fit T-Shirts ', 
//     price: 22.3, 
//     description: 'Slim-fitting style, contrast raglan long sleeve, t…e round neckline includes a three-button placket.', category: "men's clothing", 
//     image: 'lizzy.jpg',
//     rating: {
//       rate: 3.9, 
//       count: 120
//    } 
//   },
// ]
export default async function Products() {

        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();   

        // console.log(products); // Log the products to the console for debugging
  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}