"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface VendorFiltersProps {
  priceRange: string
  setPriceRange: (range: string) => void
  onClose: () => void
}

const priceRanges = ["$", "$$", "$$$", "$$$$"]
const serviceTypes = [
  "Wedding Specialists",
  "Corporate Events",
  "Birthday Parties",
  "Anniversary Celebrations",
  "Holiday Events",
  "Graduation Parties",
]

const amenities = [
  "Free Consultation",
  "Custom Packages",
  "Same Day Service",
  "Delivery Included",
  "Setup Service",
  "24/7 Support",
]

export function VendorFilters({ priceRange, setPriceRange, onClose }: VendorFiltersProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Advanced Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Badge
                  key={range}
                  variant={priceRange === range ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => setPriceRange(priceRange === range ? "" : range)}
                >
                  {range}
                </Badge>
              ))}
            </div>
          </div>

          {/* Service Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Service Types</Label>
            <div className="space-y-2">
              {serviceTypes.slice(0, 4).map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <Label htmlFor={type} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Amenities</Label>
            <div className="space-y-2">
              {amenities.slice(0, 4).map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={amenity} />
                  <Label htmlFor={amenity} className="text-sm">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Minimum Rating</Label>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="text-sm">
                    {rating}+ Stars
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Clear All
          </Button>
          <Button onClick={onClose} className="gradient-royal text-white">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
