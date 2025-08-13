"use client"

import { useEffect, useState, use } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Search, ShoppingCart, BaggageClaim, Star, Heart, Plus, Minus, Shield, Truck, RotateCcw, Share } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SOLIDUS_ROUTES } from "../../../lib/routes"
import getSymbolFromCurrency from 'currency-symbol-map';


export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string | number>("standard")
  const [details, setDetails] = useState<any>()
  const [error, setError] = useState<string | null>(null)
  const { id } = use(params)
 
  useEffect(() => {
    const fetchStore = async () => {
      try {

        const res = await fetch(`${SOLIDUS_ROUTES.api.product}/${id}`, {
          method: 'get',
          headers: {
            Accept: "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }

        const data = await res.json()
        setDetails(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message)
      }
    }
    fetchStore()
  }, [id])

  
  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "AudioTech",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.8,
    reviews: 1284,
    inStock: true,
    stockCount: 15,
    images: [
      "/placeholder.svg?height=500&width=500&text=Headphones+Main",
      "/placeholder.svg?height=500&width=500&text=Headphones+Side",
      "/placeholder.svg?height=500&width=500&text=Headphones+Back",
      "/placeholder.svg?height=500&width=500&text=Headphones+Case",
    ],
    variants: [
      { id: "standard", name: "Standard Edition", price: 2999 },
      { id: "pro", name: "Pro Edition", price: 3999 },
      { id: "limited", name: "Limited Edition", price: 4999 },
    ],
    colors: [
      { id: "black", name: "Midnight Black", hex: "#000000" },
      { id: "white", name: "Pearl White", hex: "#FFFFFF" },
      { id: "blue", name: "Ocean Blue", hex: "#1E40AF" },
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 5 min = 3 hours",
      "Premium leather ear cups",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "30 hours playback",
    },
    description:
      "Experience premium audio quality with our flagship wireless headphones. Featuring advanced noise cancellation technology and superior comfort for extended listening sessions.",
  }

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as other pages */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold text-gray-900">Store</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-600 hover:text-purple-600 transition-colors">
                Shop
              </Link>
              <Link href="/games" className="text-gray-600 hover:text-purple-600 transition-colors">
                Games
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </Link>
            </nav>

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

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b sticky top-[4.2rem] z-40 overflow-hidden">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
          { (details?.primary_taxon ? details?.primary_taxon?.permalink.split("/") : details?.taxons[0]?.permalink.split("/") )?.map((part: string, index:number) => {
            
            let taxon_length =  details?.primary_taxon? details?.primary_taxon?.permalink.split("/").length : details?.taxons[0].permalink.split("/").length
           
             return   (index+1)!==taxon_length ?
                (
                 <span key={index}>
                <Link
                  key={index}
                  href={`/products?taxon=${part}`}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {part}
                </Link>
                <span>/</span>
                </span>
                
              ):
              (
                
                <span
                  key={index}
                  className="cursor-pointer text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {part}
                </span>
               
                
                
              )

            
            }) }
            
          </nav>
        </div>
      </div>


      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4 md:sticky md:top-[9rem] self-start overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={details?.images[selectedImage]['url'] || "/placeholder.svg"}
                alt={details?.name||""}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">{product.discount}% OFF</Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {details?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-purple-600" : "border-gray-200"
                    }`}
                >
                  <Image
                    src={image?.url || "/placeholder.svg"}
                    alt={`${image?.alt} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            {/* Product Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-purple-600 font-medium uppercase tracking-wide">{product.brand}</span>
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                  Best Seller
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{details?.name}</h1>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-lg font-semibold ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
                <span className="text-green-600 font-medium">✓ Verified Purchase</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 shadow-sm">
              <div className="flex items-end gap-4 mb-3">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  ₹{product.price.toLocaleString()}
                </span>

                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}

                {product.discount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {product.originalPrice > product.price && (
                <p className="text-green-600 font-medium mb-2">
                  You save ₹{(product.originalPrice - product.price).toLocaleString()} ({product.discount}%)
                </p>
              )}

              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Truck className="w-4 h-4 text-purple-500" />
                Inclusive of all taxes • Free shipping above ₹499
              </div>
            </div>


            {/* Variants */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Choose Your Edition</h3>
              <div className="grid grid-cols-1 gap-3">
                {details?.variants.map((variant:Record<string,string>) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`p-4 border-1 rounded-sm cursor-pointer text-left transition-all duration-200 ${selectedVariant === variant.id
                        ? "border-purple-500 bg-purple-50 shadow-sm"
                        : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-gray-900">{variant.name}</span>
                        <p className="text-sm text-gray-600 mt-1">Premium quality with enhanced features</p>
                      </div>
                      <span className="text-sm font-bold text-black-600">
                        <span className="px-1">{getSymbolFromCurrency(variant?.cost_currency)}</span>
                        {variant?.cost_price?.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Available Colors</h3>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <div key={color.id} className="text-center">
                    <button
                      className="w-12 h-12 rounded-full border-3 border-gray-300 hover:border-purple-500 transition-colors shadow-md hover:shadow-lg"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="text-xs text-gray-600 mt-2 block">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-12 w-12 hover:bg-purple-50"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stockCount}
                      className="h-12 w-12 hover:bg-purple-50"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">{product.stockCount} items in stock</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 space-x-4 flex">
                <Button
                  size="sm"
                  className="w-[14rem] cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-6 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ShoppingCart className=" h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  size="sm"
                  className="w-[14rem] cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-6 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <BaggageClaim className=" h-5 w-5" />
                  Buy Now
                </Button>

              </div>
            </div>

            {/* Delivery & Services */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <CardContent className="p-6 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900">What You Get</h4>

                <div className="space-y-5">
                  {/* Free Express Delivery */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Free Express Delivery</p>
                      <p className="text-sm text-gray-600">Get it by <span className="font-medium text-gray-800">tomorrow</span> • Order within 2 hours</p>
                    </div>
                  </div>

                  {/* Easy Returns */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                      <RotateCcw className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">30-Day Easy Returns</p>
                      <p className="text-sm text-gray-600">Hassle-free returns & full refund</p>
                    </div>
                  </div>

                  {/* Warranty */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-purple-100 rounded-full flex items-center justify-center shadow-sm">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">2-Year Premium Warranty</p>
                      <p className="text-sm text-gray-600">Complete protection & lifetime support</p>
                    </div>
                  </div>
                </div>
              </CardContent>

            </Card>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Why You'll Love It</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100"
                  >
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              <button className="py-4 px-1 border-b-2 border-purple-600 text-purple-600 font-medium">
                Description
              </button>
              <button className="py-4 px-1 text-gray-600 hover:text-gray-900">Specifications</button>
              <button className="py-4 px-1 text-gray-600 hover:text-gray-900">Reviews ({product.reviews})</button>
            </nav>
          </div>

          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


