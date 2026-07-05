import Link from "next/link";
import { Product } from "./types";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Lizzy Bright Store | Shop the Best Products",
  description: "Browse our curated collection of products at the best prices",
};

export default async function Home() {
  let products: Product[] = [];
  try{
    const res = await fetch("https://dummyjson.com/products?limit=4", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();

    products = data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  console.log(products); // Log the products to the console for debugging
  return (
    <main className="min-h-screen bg-white-900">

      {/* ── HERO SECTION ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-40 px-8"
        style={{
          backgroundImage: "url('/store.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* content above overlay */}
        <div className="relative z-10">
          <p className="text-green-400 uppercase tracking-widest text-sm mb-3 font-medium">
            New Arrivals Available
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Shop Smarter on <br />
            <span className="text-green-400">LIZZY Bright Store</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Discover quality products at unbeatable prices. Fast, simple, and secure shopping experience.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Shop Now →
            </Link>
            <Link
              href="#about"
              className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16 px-8">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Featured Products</h2>
        <p className="text-gray-400 text-center mb-8">Handpicked just for you</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-600 transition-colors flex flex-col"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 object-contain mx-auto mb-4"
              />
              <h3 className="text-white text-sm font-medium line-clamp-2 mb-2">
                {product.title}
              </h3>
              <p className="text-green-400 font-bold mt-auto">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl mb-4">🚀</p>
            <h3 className="text-white font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-400 text-sm">Get your orders delivered quickly and safely to your doorstep</p>
          </div>
          <div>
            <p className="text-4xl mb-4">🔒</p>
            <h3 className="text-white font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-400 text-sm">Your payment information is always safe and encrypted</p>
          </div>
          <div>
            <p className="text-4xl mb-4">↩️</p>
            <h3 className="text-white font-bold mb-2">Easy Returns</h3>
            <p className="text-gray-400 text-sm">Not satisfied? Return your items within 30 days hassle-free</p>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="py-20 px-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-green-400 uppercase tracking-widest text-sm mb-3">About Us</p>
            <h2 className="text-3xl font-bold text-white mb-6">We Are Lizzy Bright Store</h2>
            <p className="text-white-950 mb-4 leading-relaxed">
              Lizzy Bright Store is a modern e-commerce platform built for shoppers who value quality, speed, and simplicity.
              We curate the best products across all categories so you never have to compromise.
            </p>
            <p className="text-white-950 leading-relaxed">
              Founded with a passion for great shopping experiences, we're committed to bringing you the finest
              products at prices that make sense — with customer satisfaction at the heart of everything we do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <p className="text-3xl font-bold text-green-400">500+</p>
              <p className="text-gray-400 text-sm mt-1">Products</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <p className="text-3xl font-bold text-green-400">10k+</p>
              <p className="text-gray-400 text-sm mt-1">Happy Customers</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <p className="text-3xl font-bold text-green-400">50+</p>
              <p className="text-gray-400 text-sm mt-1">Brands</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <p className="text-3xl font-bold text-green-400">4.9★</p>
              <p className="text-gray-400 text-sm mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-20 px-8 bg-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-green-400 uppercase tracking-widest text-sm mb-3">Get In Touch</p>
          <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-10">Have a question or need help? We'd love to hear from you.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <p className="text-2xl mb-2">📧</p>
              <p className="text-white font-medium mb-1">Email</p>
              <p className="text-gray-400 text-sm">olawaleojo42@gmail.com</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <p className="text-2xl mb-2">📞</p>
              <p className="text-white font-medium mb-1">Phone</p>
              <p className="text-gray-400 text-sm">+234 810 597 8632</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <p className="text-2xl mb-2">📍</p>
              <p className="text-white font-medium mb-1">Location</p>
              <p className="text-gray-400 text-sm">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-green-400 font-bold text-lg mb-4">Lizzy Bright Store</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for quality products at unbeatable prices.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-green-400 text-sm transition-colors">All Products</Link></li>
              <li><Link href="/cart" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Cart</Link></li>
              <li><Link href="/checkout" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Checkout</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-gray-400 hover:text-green-400 text-sm transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">© 2026 Lizzy Bright Store. All rights reserved. Built with Next.js & TypeScript by Ojo Azeez Olawale.</p>
        </div>
      </footer>

    </main>
  );
}