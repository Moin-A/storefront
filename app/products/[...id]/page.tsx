"use client"

import { useState, useEffect, use } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Checkbox } from "../../../components/ui/checkbox"
import { Label } from "../../../components/ui/label"
import { Slider } from "../../../components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Search, ShoppingCart, Star, Heart, Filter, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SOLIDUS_ROUTES } from '../../../lib/routes';


export default function GamesPage({ params }: { params: { id: string } }) {
  const [priceRange, setPriceRange] = useState([299, 19999])
  const [inStock, setInStock] = useState(false)
  const [items, setItems] = useState<any>(null)
  const [error, setError] = useState<any>("")
  const [condition, setCondition] = useState("")
  const { id } = use(params)

  const topRatedProducts = [
    {
      id: 1,
      name: "Demons Souls",
      platform: "PS5 (Pre-owned)",
      originalPrice: "Rs. 1,699",
      salePrice: "Rs. 1,599",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Cyberpunk 2077",
      platform: "PS4 (Pre-owned)",
      originalPrice: "Rs. 1,899",
      salePrice: "Rs. 1,499",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.5,
    },
    {
      id: 3,
      name: "PS4 Controller",
      platform: "Repair",
      originalPrice: "",
      salePrice: "Rs. 1,299",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
    },
  ]

  const products = [
    {
      id: 1,
      name: "NBA 2K26 PS4",
      price: "Rs. 4,999",
      originalPrice: "Rs. 5,999",
      status: "Pre order",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["New"],
      rating: 4.6,
      reviews: 128,
    },
    {
      id: 2,
      name: "EA Sports FC 26 PS4",
      price: "Rs. 4,999",
      originalPrice: "Rs. 5,499",
      status: "Pre order",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["New"],
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: "Like a Dragon Infinite Wealth PS4",
      price: "Rs. 3,999",
      originalPrice: "Rs. 4,999",
      status: "In Stock",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["Best Seller"],
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 4,
      name: "Sekiro Shadows Die Twice PS4",
      price: "Rs. 3,299",
      originalPrice: "Rs. 4,299",
      status: "In Stock",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["Pre-owned"],
      rating: 4.7,
      reviews: 203,
    },
    {
      id: 5,
      name: "Call of Duty Black Ops PS4",
      price: "Rs. 2,999",
      originalPrice: "Rs. 3,999",
      status: "In Stock",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["Sale", "Pre-owned"],
      rating: 4.5,
      reviews: 342,
    },
    {
      id: 6,
      name: "Finding Nightreon PS4",
      price: "Rs. 3,499",
      originalPrice: "Rs. 4,199",
      status: "In Stock",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["Sale"],
      rating: 4.4,
      reviews: 87,
    },
    {
      id: 7,
      name: "Dark Souls III PS4",
      price: "Rs. 2,799",
      originalPrice: "Rs. 3,799",
      status: "In Stock",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["Sale"],
      rating: 4.8,
      reviews: 298,
    },
    {
      id: 8,
      name: "EA Sports FC 25 PS4",
      price: "Rs. 3,999",
      originalPrice: "Rs. 4,999",
      status: "In Stock",
      image: "/placeholder.svg?height=200&width=200",
      platform: "PS4",
      badges: ["Sale", "Pre-owned"],
      rating: 4.6,
      reviews: 176,
    },
  ]

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${SOLIDUS_ROUTES.api.products}?perma_link=${id.join("/")}`, {
          headers: {
            Accept: "application/json",
          }
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
        setItems(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message)
      }
    }
    fetchProducts()
  },[])

  return (
    <div className="min-h-screen bg-white">
      {/* Gaming Categories Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-[4.2rem] z-40">
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6 py-3 overflow-x-auto mx-auto justify-center">
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                <span className="font-medium text-sm">PLAYSTATION</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                <span className="font-medium text-sm">XBOX</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                <span className="font-medium text-sm">NINTENDO</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Link href="#" className="font-medium text-sm hover:text-blue-600 whitespace-nowrap">
                SELL
              </Link>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                <span className="font-medium text-sm">CONSOLES</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                <span className="font-medium text-sm">REPAIRS</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                <span className="font-medium text-sm">PC</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Link href="#" className="font-medium text-sm hover:text-blue-600 whitespace-nowrap">
                LAPTOPS
              </Link>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                <span className="font-medium text-sm">ELECTRONICS</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Link href="#" className="font-medium text-sm hover:text-blue-600 whitespace-nowrap">
                DIGITAL
              </Link>
              <Link href="#" className="font-medium text-sm hover:text-blue-600 whitespace-nowrap">
                OPEN BOX
              </Link>
              <Link href="#" className="font-medium text-sm hover:text-blue-600 whitespace-nowrap">
                COLLECTIBLE
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                Gaming Collection
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover premium gaming experiences with our curated selection of PS4 games and accessories
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span>Showing 1 - 12 of 1135 results</span>
              <Badge className="bg-blue-100 text-purple-700">Free EMI Available</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Top Rated Products */}
            <Card className="mb-6 shadow-md border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Top Rated Products</h3>
                <div className="space-y-4">
                  {topRatedProducts.splice(0,2).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">{product.platform}</p>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                          )}
                          <span className="text-sm font-bold text-blue-600">{product.salePrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="shadow-md border-0 sticky top-32">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-900">Price Range</h4>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={19999}
                      min={299}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="bg-blue-100 text-purple-700 px-3 py-1 rounded-full">Rs. {priceRange[0]}</span>
                      <span className="bg-blue-100 text-purple-700 px-3 py-1 rounded-full">Rs. {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-900">Availability</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inStock" checked={inStock} onCheckedChange={setInStock} />
                    <Label htmlFor="inStock" className="text-gray-700">
                      In stock only
                    </Label>
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900">Condition</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new"
                        checked={condition === "new"}
                        onCheckedChange={(checked) => setCondition(checked ? "new" : "")}
                      />
                      <Label htmlFor="new" className="text-gray-700">
                        New
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="preowned"
                        checked={condition === "preowned"}
                        onCheckedChange={(checked) => setCondition(checked ? "preowned" : "")}
                      />
                      <Label htmlFor="preowned" className="text-gray-700">
                        Pre-owned
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">PS4 Games</h2>
                <p className="text-gray-600">Premium gaming collection for PlayStation 4</p>
              </div>
              <Select defaultValue="default">
                <SelectTrigger className="w-48 border-gray-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Sorting</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {items?.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                    <Link key={id} href={`/product/${product.slug}`}>
                      <Image
                        src={product.images[0]["url"] || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>  

                      {/* Wishlist Button */}
                      <div className="absolute top-4 right-4">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1">
                        {product?.badges?.map((badge, index) => (
                          <Badge
                            key={index}
                            className={`text-xs ${
                              badge === "Sale"
                                ? "bg-blue-500 text-white"
                                : badge === "Pre-owned"
                                  ? "bg-orange-500 text-white"
                                  : badge === "Best Seller"
                                    ? "bg-green-500 text-white"
                                    : "bg-blue-500 text-white"
                            }`}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating || 4.5} ({product.reviews ||4.6})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                        {product.price && (
                          <span className="text-sm text-gray-500 line-through">{product.price}</span>
                        )}
                      </div>

                      {/* Status and Button */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-3 py-1 rounded-sm ${
                            product.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {product.status || 'avaialable'}
                        </span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm px-6">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg font-semibold rounded-full bg-transparent"
              >
                Load More Games
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Same as homepage */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Be the first to know about new game releases, exclusive offers, and gaming events
          </p>

          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white border-0"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
