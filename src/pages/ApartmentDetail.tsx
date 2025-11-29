import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Shield,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Star,
  Check,
  FileText,
  Clock,
  User,
} from "lucide-react";

// Mock apartment data
const apartmentData = {
  id: 1,
  title: "Modern 2BR at Bole Japan",
  location: "Bole Japan, Addis Ababa",
  address: "Near Bole Japan Traffic Light, Addis Ababa, Ethiopia",
  site: "bole-japan",
  neighborhood: "A short walk inside from Bole Japan Traffic Light - quiet residential area with easy access to shops and restaurants",
  priceUsd: 1600,
  priceBirr: 45000,
  minMonths: 6,
  bedrooms: 2,
  bathrooms: 1,
  sqm: 85,
  description:
    "Experience comfortable living in this beautifully furnished apartment at our Bole Japan site. Located just a short walk from Bole Japan Traffic Light, this modern 2-bedroom apartment features quality finishes, natural lighting, and all the amenities you need for a comfortable stay. Perfect for professionals and small families looking for a prime location in Addis Ababa.",
  images: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
  ],
  amenities: [
    { icon: Wifi, name: "High-Speed WiFi" },
    { icon: Shield, name: "24/7 Security Guard" },
    { icon: Car, name: "Parking Space" },
    { icon: Waves, name: "Water Tank" },
    { icon: Dumbbell, name: "Generator Backup" },
    { icon: Coffee, name: "Common Area" },
  ],
  furnishedItems: [
    "Queen-size bed with mattress",
    "Sofa set",
    "Dining table with chairs",
    "Wardrobe",
    "TV stand",
    "Full kitchen equipment",
    "Linens & towels",
    "Water heater",
  ],
  rules: [
    "No smoking inside the apartment",
    "Pets negotiable - ask management",
    "Quiet hours: 10 PM - 7 AM",
    "Maximum 4 guests overnight",
    "Maintain cleanliness in common areas",
  ],
  rating: 4.8,
  reviewCount: 23,
  host: {
    name: "Grace Apartments Management",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
    responseTime: "within a few hours",
    verified: true,
  },
};

const ApartmentDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [stayMonths, setStayMonths] = useState(apartmentData.minMonths);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartmentData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + apartmentData.images.length) % apartmentData.images.length
    );
  };

  // Price calculations
  const monthlyRentUsd = apartmentData.priceUsd;
  const monthlyRentBirr = apartmentData.priceBirr;
  const deposit = monthlyRentBirr;
  const serviceFee = Math.round(monthlyRentBirr * 0.1);
  const totalFirst = monthlyRentBirr + deposit + serviceFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        {/* Image Gallery */}
        <div className="relative h-[50vh] md:h-[60vh] bg-secondary">
          <img
            src={apartmentData.images[currentImageIndex]}
            alt={apartmentData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {apartmentData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-card" : "bg-card/50"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-12 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {apartmentData.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{apartmentData.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">{apartmentData.rating}</span>
                    <span className="text-muted-foreground">({apartmentData.reviewCount})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <span>{apartmentData.bedrooms} Bedroom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-primary" />
                    <span>{apartmentData.bathrooms} Bathroom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-primary" />
                    <span>{apartmentData.sqm} m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Min {apartmentData.minMonths} months</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h2 className="text-xl font-semibold text-foreground mb-4">About This Place</h2>
                <p className="text-muted-foreground leading-relaxed">{apartmentData.description}</p>
              </div>

              {/* Amenities */}
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h2 className="text-xl font-semibold text-foreground mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {apartmentData.amenities.map((amenity) => (
                    <div
                      key={amenity.name}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                    >
                      <amenity.icon className="w-5 h-5 text-primary" />
                      <span className="text-foreground">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Furnished Items */}
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h2 className="text-xl font-semibold text-foreground mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {apartmentData.furnishedItems.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-success" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h2 className="text-xl font-semibold text-foreground mb-6">House Rules</h2>
                <ul className="space-y-3">
                  {apartmentData.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-6">
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Rental Agreement
                </Button>
              </div>

              {/* Host */}
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h2 className="text-xl font-semibold text-foreground mb-6">Meet Your Host</h2>
                <div className="flex items-center gap-4">
                  <img
                    src={apartmentData.host.image}
                    alt={apartmentData.host.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{apartmentData.host.name}</h3>
                      {apartmentData.host.verified && (
                        <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Responds {apartmentData.host.responseTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
                <div className="flex flex-col gap-1 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      ${monthlyRentUsd.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">USD / month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ≈ {monthlyRentBirr.toLocaleString()} Birr / month
                  </p>
                </div>

                {/* Calendar */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Move-in Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-xl border border-border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                {/* Stay Duration */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Stay Duration (months)
                  </label>
                  <div className="flex gap-2">
                    {[3, 6, 9, 12].map((months) => (
                      <button
                        key={months}
                        onClick={() => setStayMonths(months)}
                        className={`flex-1 py-2 rounded-lg border text-sm transition-colors ${
                          stayMonths === months
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {months}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-t border-border">
                  <div className="flex justify-between text-foreground">
                    <span>First month rent</span>
                    <span>{monthlyRentBirr.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Security deposit</span>
                    <span>{deposit.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Service fee</span>
                    <span>{serviceFee.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground pt-3 border-t border-border">
                    <span>Due at booking</span>
                    <span>{totalFirst.toLocaleString()} ETB</span>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full mt-4" asChild>
                  <Link to={`/booking/${apartmentData.id}`}>Book Now</Link>
                </Button>

                <p className="text-center text-muted-foreground text-sm mt-4">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApartmentDetail;
