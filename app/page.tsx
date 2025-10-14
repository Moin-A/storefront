'use client'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Search, ShoppingCart, ArrowRight, Star, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { SOLIDUS_ROUTES } from "../lib/routes"
import { useProductStore } from "./store/useProductStore"
import { cn } from "../lib/utils"
import { ImageCard } from "../components/ui/ImageCard"



export default function HomePage() {
  const [store, setStore] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const setFeatureproducts = useProductStore(state => state.setProducts)
  const [loading, setLoading] = useState(true)
  const getFeatureproducts = useProductStore(state => state.products)

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch("/api/stores/1", {
          headers: {
            Accept: "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }

        const data = await res.json()
        setStore(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message)
      }
    }

    const fetchfeaturedproducts = async () => {
      try {
        const res = await fetch(SOLIDUS_ROUTES.api.products + `?taxon_id=${10}`, {
          headers: {
            Accept: "application/json",
          }
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
        setFeatureproducts(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message)
      }
    }
    fetchfeaturedproducts();
    fetchStore()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold text-gray-900">Store</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-600 hover:text-blue-600 transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-300 to-blue-400">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-300 rounded-full opacity-20 blur-lg"></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Premium
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Collections
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Elevate your lifestyle with our curated selection of premium products. Quality craftsmanship meets
                modern design.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-full"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-8 py-6 text-lg font-semibold rounded-full bg-white"
                >
                  View Collections
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              {store?.hero_image_url &&
                <Image
                  src={store?.hero_image_url || null}
                  alt="Premium product collection"
                  width={600}
                  height={500}
                  className="w-full h-auto object-contain rounded-lg"
                  priority
                />
              }
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products designed to enhance your everyday life
            </p>
          </div>

          {/* Product Grid */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {getFeatureproducts.map(({ name, images, id, slug }) => (
              <Link key={id} href={`/product/${slug}`}>
                <div
                  key={id}
                  className={cn(
                    "cursor-pointer transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md rounded-lg overflow-hidden w-48 bg-white",
                  )}>
                  <div
                    key={id}
                    className={cn(
                      "cursor-pointer transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md rounded-lg overflow-hidden w-48 bg-white",
                    )}>
                    {/* Image with skeleton */}
                    <div className="relative w-full h-56 bg-gray-100">
                      {loading && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      )}
                      <ImageCard
                       images={images}
                        alt={name || "Product image"}
                        fill
                        className={cn(
                          "object-cover transition-opacity duration-500",
                          loading ? "opacity-0" : "opacity-100"
                        )}
                        onLoadingComplete={() => setLoading(false)}
                      />
                    </div>
                    {/* Content */}
                    <div className="p-3 flex flex-col gap-1 text-sm">
                      <h3 className="font-medium leading-tight text-gray-900 line-clamp-2">
                        {name}
                      </h3>
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-900">{"price"}</span>
                        <span className="text-xs text-gray-500">
                          MRP: <span className="line-through">{"mrp"}</span> ({"discount"} off)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 text-lg font-semibold rounded-full bg-transparent"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our carefully curated categories to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Electronics */}
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Electronics</h3>
                <p className="text-gray-600 mb-2">120+ items</p>
                <p className="text-sm text-gray-500">Latest tech gadgets</p>
              </CardContent>
            </Card>

            {/* Fashion */}
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <span className="text-2xl">👗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fashion</h3>
                <p className="text-gray-600 mb-2">250+ items</p>
                <p className="text-sm text-gray-500">Trendy clothing & accessories</p>
              </CardContent>
            </Card>

            {/* Home & Living */}
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Home & Living</h3>
                <p className="text-gray-600 mb-2">180+ items</p>
                <p className="text-sm text-gray-500">Beautiful home essentials</p>
              </CardContent>
            </Card>

            {/* Sports & Fitness */}
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl">⚽</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sports & Fitness</h3>
                <p className="text-gray-600 mb-2">95+ items</p>
                <p className="text-sm text-gray-500">Gear for active lifestyle</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and special
            events.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white border-0"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-purple-200">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-semibold">Store</span>
              </div>
              <p className="text-gray-400 mb-4">
                Premium products for modern living. Quality, style, and innovation in every piece.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </div>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Returns
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
