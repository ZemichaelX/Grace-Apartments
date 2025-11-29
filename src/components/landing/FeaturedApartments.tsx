import { MapPin, Bed, Bath, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const apartments = [
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
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1658218635253-64728f6234be?w=600&auto=format&fit=crop&q=60",
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
    image: "https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?w=600&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80",
    featured: false,
  },
];

const siteLabels: Record<string, string> = {
  "bole-japan": "Bole Japan",
  "summit-fiyel-bet": "Summit Fiyel Bet",
  cmc: "CMC",
};

const ApartmentCard = ({ apartment }: { apartment: typeof apartments[0] }) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-soft card-hover">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={apartment.image}
          alt={apartment.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Save Button */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card hover:scale-110">
          <Heart className="w-5 h-5 text-foreground" />
        </button>

        {/* Featured Badge */}
        {apartment.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
            Featured
          </div>
        )}

        {/* Site Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium">
          {siteLabels[apartment.site] ?? apartment.site}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {apartment.title}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{apartment.location}</span>
        </div>
        
        <p className="text-xs text-muted-foreground mb-4">{apartment.neighborhood}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{apartment.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{apartment.bathrooms} Bath</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-foreground">
              ${apartment.priceUsd.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-sm"> USD/mo</span>
            <p className="text-xs text-muted-foreground mt-1">
              ({apartment.priceBirr.toLocaleString()} Birr · As of Today&apos;s Rate)
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild className="group/btn">
            <Link to={`/apartment/${apartment.id}`}>
              View Details
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedApartments = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Apartments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium apartments, ready for immediate move-in with all amenities included.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/listings">
              View All Apartments
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedApartments;
