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
import { SOLIDUS_ROUTES } from '../../../lib/routes'
import { motion, AnimatePresence } from "framer-motion"
import type { TaxonDetail } from "../../types/solidus"


export default function GamesPage({ params }: { params: { id: string | string[] } }) {
  const [priceRange, setPriceRange] = useState([299, 19999])
  const [inStock, setInStock] = useState(false)
  const [items, setItems] = useState<any>([])
  const [error, setError] = useState<any>("")
  const [page_no, setPage_no] = useState<any>(1)
  const [condition, setCondition] = useState("")
  const [taxonDetail, setTaxonsDetail] = useState<TaxonDetail | null>(null)
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())
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
        const res = await fetch(`${SOLIDUS_ROUTES.api.products}?page=${page_no}&&perma_link=${Array.isArray(id) ? id.join("/") : id}`, {
          headers: {
            Accept: "application/json",
          }
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
         setItems(prevData => ([...data, ...prevData]));
      } catch (err: any) {
        console.error(err)
        setError(err.message)
      }
    }
    const fetchTaxonsDetail = async () => {
      try {
        const permalink = Array.isArray(id) ? id.join('/') : id
        const res = await fetch(SOLIDUS_ROUTES.api.category_taxons(permalink), {
          method: 'GET',
          headers: {
            Accept: "application/json",
          }
        })
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
        setTaxonsDetail(data)
      } catch(err: any) {
        setError(err.message)
      }
    }
    
    fetchTaxonsDetail()
    fetchProducts()

  },[page_no])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gaming Categories Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[4.2rem] z-40 shadow-sm">
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-8 py-4 overflow-x-auto mx-auto justify-center">
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              {taxonDetail?.name || 'Explore Our Exclusive PS4 Games Collection'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {taxonDetail?.description || taxonDetail?.description || 'Explore the collection of premium products'}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span>Showing 1 - 12 of 1,135 results</span>
              <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Free EMI Available</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Top Rated Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-medium text-gray-900">Top Rated Products</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {topRatedProducts.splice(0,2).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-lg bg-white shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{product.platform}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-500">{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                          )}
                          <span className="text-sm font-semibold text-gray-900">{product.salePrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-32 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <h3 className="text-xl font-medium text-gray-900">Filters</h3>
                </div>

                {/* Price Filter */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4 text-gray-900">Price Range</h4>
                  <div className="space-y-6">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={19999}
                      min={299}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-200">Rs. {priceRange[0]}</span>
                      <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-200">Rs. {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4 text-gray-900">Availability</h4>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="inStock" checked={inStock} onCheckedChange={(checked) => setInStock(checked === true)} />
                    <Label htmlFor="inStock" className="text-gray-600">
                      In stock only
                    </Label>
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <h4 className="font-medium mb-4 text-gray-900">Condition</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="new"
                        checked={condition === "new"}
                        onCheckedChange={(checked) => setCondition(checked ? "new" : "")}
                      />
                      <Label htmlFor="new" className="text-gray-600">
                        New
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="preowned"
                        checked={condition === "preowned"}
                        onCheckedChange={(checked) => setCondition(checked ? "preowned" : "")}
                      />
                      <Label htmlFor="preowned" className="text-gray-600">
                        Pre-owned
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-3">{taxonDetail?.meta_title || 'Explore'}</h2>
                <p className="text-gray-600 text-sm">{taxonDetail?.meta_description || taxonDetail?.description || 'Premium gaming collection for PlayStation 4'}</p>
              </div>
              <Select defaultValue="default">
                <SelectTrigger className="w-52 border-gray-200 rounded-xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {items?.map((product: any) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Link key={product.id} href={`/product/${product.slug}`}>
                      <Image
                        src={product?.images[0]["url"] || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>  

                    {/* Animated Wishlist Button */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 1 }}
                      >
                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={(e) => {
                            e.preventDefault()
                            setLikedItems(prev => {
                              const newSet = new Set(prev)
                              if (newSet.has(product.id)) {
                                newSet.delete(product.id)
                              } else {
                                newSet.add(product.id)
                              }
                              return newSet
                            })
                          }}
                          className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm border border-gray-200 relative overflow-visible"
                        >
                          <AnimatePresence mode="wait">
                            {likedItems.has(product.id) ? (
                              <motion.div
                                key="liked"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 400, 
                                  damping: 20 
                                }}
                              >
                                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="unliked"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 400, 
                                  damping: 20 
                                }}
                              >
                                <Heart className="h-4 w-4 text-gray-600" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Gentle glow effect on like */}
                          <AnimatePresence>
                            {likedItems.has(product.id) && (
                              <motion.div
                                className="absolute inset-0 rounded-full bg-red-500/20"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                  scale: [0, 1.5, 1.2],
                                  opacity: [0, 0.6, 0]
                                }}
                                exit={{ scale: 1, opacity: 0 }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeOut"
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product?.badges?.map((badge: any, index: number) => (
                        <Badge
                          key={index}
                          className={`text-xs ${
                            badge === "Sale"
                              ? "bg-red-500 text-white"
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
                    <h3 className="font-medium text-lg text-gray-900 mb-3 line-clamp-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {product.rating || 4.5} ({product.reviews || 4.6})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-semibold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>

                    {/* Status and Button */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-3 py-1 rounded-lg ${
                          product.status === "In Stock" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.status || 'Available'}
                      </span>
                      <Button size="sm" className="bg-black hover:bg-gray-800 text-white rounded-xl px-6 py-2">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button
                onClick={()=>{setPage_no((prev: number)=> prev+1 )}}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-4 text-base font-medium rounded-xl bg-transparent"
              >
                Load More Games
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-600 mb-8">
              Be the first to know about new game releases, exclusive offers, and gaming events
            </p>

            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 border border-gray-200"
              />
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-xl font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
