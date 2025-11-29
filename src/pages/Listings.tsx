import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Heart,
  SlidersHorizontal,
  X,
  Search,
  Grid3X3,
  List,
  ArrowRight,
} from "lucide-react";

// Mock data - Ethiopian apartments
const allApartments = [
  {
    id: 1,
    title: "Modern 2BR at Bole Japan",
    location: "Bole Japan, Addis Ababa",
    site: "bole-japan",
    neighborhood: "Steps from Bole Japan Plaza",
    priceUsd: 1600,
    priceBirr: 45000,
    minMonths: 6,
    bedrooms: 2,
    bathrooms: 1,
    sqm: 85,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    amenities: ["wifi", "parking", "generator", "guard"],
    furnished: true,
    featured: true,
  },
  {
    id: 2,
    title: "Summit Executive 3BR",
    location: "Summit Fiyel Bet, Addis Ababa",
    site: "summit-fiyel-bet",
    neighborhood: "Beside Summit Square",
    priceUsd: 2000,
    priceBirr: 65000,
    minMonths: 12,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 120,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    amenities: ["wifi", "parking", "generator", "guard", "balcony"],
    furnished: true,
    featured: true,
  },
  {
    id: 3,
    title: "CMC Skyline Penthouse",
    location: "CMC, Addis Ababa",
    site: "cmc",
    neighborhood: "Opposite CMC Africa Avenue",
    priceUsd: 2800,
    priceBirr: 78000,
    minMonths: 6,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 145,
    image: "https://images.unsplash.com/photo-1658218635253-64728f6234be?w=600&auto=format&fit=crop&q=60",
    amenities: ["wifi", "parking", "generator", "guard", "gym"],
    furnished: true,
    featured: true,
  },
  {
    id: 4,
    title: "Designer 2BR in Bole Japan",
    location: "Bole Japan, Addis Ababa",
    site: "bole-japan",
    neighborhood: "Minutes from Bole International Airport",
    priceUsd: 2400,
    priceBirr: 64000,
    minMonths: 6,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 98,
    image: "https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?w=600&auto=format&fit=crop&q=60",
    amenities: ["wifi", "parking", "generator", "guard", "balcony"],
    furnished: true,
    featured: true,
  },
  {
    id: 5,
    title: "Summit Garden Loft",
    location: "Summit Fiyel Bet, Addis Ababa",
    site: "summit-fiyel-bet",
    neighborhood: "Overlooks Summit Green Park",
    priceUsd: 1900,
    priceBirr: 60000,
    minMonths: 6,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 102,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
    amenities: ["wifi", "parking", "generator", "guard"],
    furnished: true,
    featured: false,
  },
  {
    id: 6,
    title: "CMC Executive Loft",
    location: "CMC, Addis Ababa",
    site: "cmc",
    neighborhood: "Tucked inside the diplomatic enclave",
    priceUsd: 2200,
    priceBirr: 70000,
    minMonths: 12,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 135,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80",
    amenities: ["wifi", "parking", "generator", "guard", "balcony"],
    furnished: true,
    featured: false,
  },
];

const siteLabels: Record<string, string> = {
  "bole-japan": "Bole Japan",
  "summit-fiyel-bet": "Summit Fiyel Bet",
  cmc: "CMC",
};

const amenityOptions = [
  { id: "wifi", label: "WiFi" },
  { id: "parking", label: "Parking" },
  { id: "generator", label: "Generator" },
  { id: "guard", label: "24/7 Guard" },
  { id: "balcony", label: "Balcony" },
  { id: "gym", label: "Gym" },
];

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter state
  const [selectedSite, setSelectedSite] = useState(searchParams.get("site") || "");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get("bedrooms") || "");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Filter apartments
  const filteredApartments = useMemo(() => {
    return allApartments.filter((apt) => {
      if (selectedSite && apt.site !== selectedSite) {
        return false;
      }
      if (apt.priceBirr < priceRange[0] || apt.priceBirr > priceRange[1]) {
        return false;
      }
      if (bedrooms && apt.bedrooms !== parseInt(bedrooms)) {
        return false;
      }
      if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => apt.amenities.includes(a))) {
        return false;
      }
      return true;
    });
  }, [selectedSite, priceRange, bedrooms, selectedAmenities]);

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((a) => a !== amenityId) : [...prev, amenityId]
    );
  };

  const clearFilters = () => {
    setSelectedSite("");
    setPriceRange([0, 100000]);
    setBedrooms("");
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Find Your Perfect Apartment</h1>
              <p className="text-muted-foreground mt-1">
                {filteredApartments.length} apartments available in Addis Ababa
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-card shadow-sm" : ""
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" ? "bg-card shadow-sm" : ""
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : "hidden"
              } md:block md:relative md:w-72 md:shrink-0`}
            >
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-6">
                {/* Site Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <select
                    className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border text-foreground focus:ring-2 focus:ring-primary"
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                  >
                    <option value="">All Sites</option>
                    <option value="bole-japan">Bole Japan</option>
                    <option value="summit-fiyel-bet">Summit Fiyel Bet</option>
                    <option value="cmc">CMC</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Price: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ETB
                  </label>
                  <Slider
                    defaultValue={[0, 100000]}
                    max={100000}
                    step={5000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-4"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bedrooms</label>
                  <div className="flex flex-wrap gap-2">
                    {["", "1", "2", "3"].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBedrooms(num)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                          bedrooms === num
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {num === "" ? "Any" : `${num} Bed`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Amenities</label>
                  <div className="space-y-2">
                    {amenityOptions.map((amenity) => (
                      <label
                        key={amenity.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity.id)}
                          onCheckedChange={() => toggleAmenity(amenity.id)}
                        />
                        <span className="text-sm text-foreground">{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {filteredApartments.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No apartments found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredApartments.map((apt) => (
                    <Link
                      key={apt.id}
                      to={`/apartment/${apt.id}`}
                      className={`group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-soft card-hover transition-all duration-300 block focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        viewMode === "list" ? "md:flex" : ""
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "list" ? "md:w-64 md:shrink-0 h-56 md:h-auto" : "aspect-[4/3]"
                        }`}
                      >
                        <img
                          src={apt.image}
                          alt={apt.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Heart className="w-4 h-4 text-foreground" aria-hidden="true" />
                        </div>
                        {apt.featured && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                            Featured
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                          {siteLabels[apt.site] ?? apt.site}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {apt.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                          <MapPin className="w-4 h-4" />
                          {apt.location}
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">{apt.neighborhood}</p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            {apt.bedrooms} Bed
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            {apt.bathrooms} Bath
                          </span>
                          <span>{apt.sqm} m²</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <span className="text-2xl font-bold text-foreground">
                              ${apt.priceUsd.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground text-sm"> USD/mo</span>
                            <p className="text-xs text-muted-foreground mt-1">
                              ({apt.priceBirr.toLocaleString()} Birr · As of Today&apos;s Rate)
                            </p>
                          </div>
                          <div className="flex items-center text-sm font-medium text-primary gap-1">
                            View Details
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
