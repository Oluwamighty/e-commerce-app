import AddToCartButton from "@/app/components/AddToCartButton";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Product Details | NextCart",
  description: "View detailed product information",
};

export default async function ProductDetails({params}: {params: Promise<{id: string}>}) {
  const { id } = await params;

    const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
    const product = await res.json();

    return (
        <main className="min-h-screen bg-gray-900 p-8">
            <h1 className="text-3xl font-bold text-white mb-6">{product.title}</h1>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <img src={product.thumbnail} alt={product.title} className="h-64 object-contain mx-auto mb-4" />
                <p>{product.title}</p>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <p className="text-green-400 font-bold text-xl">Price: ${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating} out of 5 stars</p>
                <p>Category: {product.category}</p>
                <AddToCartButton product={product} />
                <Link href="/products" className="text-blue-500 mt-4 inline-block">Back to Products</Link>
            </div>
        </main>
    )
}