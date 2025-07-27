import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Search, ShoppingCart, ArrowRight, Star, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold text-gray-900">Store</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-600 hover:text-purple-600 transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-purple-100">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-300 rounded-full opacity-20 blur-lg"></div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                  Premium
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
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
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600 px-8 py-6 text-lg font-semibold rounded-full bg-white"
                >
                  View Collections
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Premium product collection"
                width={600}
                height={500}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Product 1 - Premium Wireless Headphones */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Premium Wireless Headphones"
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">Sale</Badge>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Premium Wireless Headphones</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.8 (128)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">$299</span>
                      <span className="text-sm text-gray-500 line-through">$399</span>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 - Smart Fitness Watch */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Smart Fitness Watch"
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-blue-500 text-white">New</Badge>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Smart Fitness Watch</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.9 (89)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">$199</span>
                      <span className="text-sm text-gray-500 line-through">$249</span>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 - Minimalist Backpack */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Minimalist Backpack"
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-white">Best Seller</Badge>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Minimalist Backpack</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.7 (156)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">$89</span>
                      <span className="text-sm text-gray-500 line-through">$120</span>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 4 - Eco-Friendly Water Bottle */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Eco-Friendly Water Bottle"
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">Eco</Badge>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Eco-Friendly Water Bottle</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.6 (203)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">$25</span>
                      <span className="text-sm text-gray-500 line-through">$35</span>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-6 text-lg font-semibold rounded-full bg-transparent"
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-purple-700">
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
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold">
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
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
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
