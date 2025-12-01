import { useState, useEffect } from "react";
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
import { getApartmentById } from "@/data/apartments";
import { RentalAgreementModal } from "@/components/RentalAgreementModal";

const ApartmentDetail = () => {
  const { id } = useParams();
  const apartmentData = getApartmentById(Number(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [stayMonths, setStayMonths] = useState(apartmentData?.minMonths || 6);
  const [showAgreement, setShowAgreement] = useState(false);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // If apartment not found, show error
  if (!apartmentData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="text-3xl font-bold text-foreground mb-4">Apartment Not Found</h1>
            <p className="text-muted-foreground mb-6">The apartment you're looking for doesn't exist.</p>
            <Button variant="hero" asChild>
              <Link to="/listings">Browse All Apartments</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartmentData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + apartmentData.images.length) % apartmentData.images.length
    );
  };

  // Price calculations
  const EXCHANGE_RATE = 152.10; // 1 USD = 152.10 ETB
  const monthlyRentUsd = apartmentData.priceUsd;
  const monthlyRentBirr = Math.round(monthlyRentUsd * EXCHANGE_RATE);
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
                className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-card" : "bg-card/50"
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
                <Button variant="outline" className="mt-6" onClick={() => setShowAgreement(true)}>
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Rental Agreement
                </Button>

                <RentalAgreementModal
                  isOpen={showAgreement}
                  onOpenChange={setShowAgreement}
                  apartmentTitle={apartmentData.title}
                  apartmentLocation={apartmentData.location}
                  moveInDate={selectedDate?.toLocaleDateString()}
                  stayMonths={stayMonths}
                  monthlyRentUsd={monthlyRentUsd}
                  deposit={deposit}
                  showAgreeButton={false}
                />
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
                        className={`flex-1 py-2 rounded-lg border text-sm transition-colors ${stayMonths === months
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
                    <div className="text-right">
                      <div className="font-semibold">${monthlyRentUsd.toLocaleString()} USD</div>
                      <div className="text-xs text-muted-foreground">({monthlyRentBirr.toLocaleString()} Birr)</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Security deposit</span>
                    <div className="text-right">
                      <div className="font-semibold">${monthlyRentUsd.toLocaleString()} USD</div>
                      <div className="text-xs text-muted-foreground">({deposit.toLocaleString()} Birr)</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Service fee</span>
                    <div className="text-right">
                      <div className="font-semibold">${Math.round(monthlyRentUsd * 0.1).toLocaleString()} USD</div>
                      <div className="text-xs text-muted-foreground">({serviceFee.toLocaleString()} Birr)</div>
                    </div>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground pt-3 border-t border-border">
                    <span>Due at booking</span>
                    <div className="text-right">
                      <div>${(monthlyRentUsd * 2 + Math.round(monthlyRentUsd * 0.1)).toLocaleString()} USD</div>
                      <div className="text-xs text-muted-foreground font-normal">({totalFirst.toLocaleString()} Birr)</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Birr amounts based on today's CBE rate (1 USD = 152.10 ETB)
                  </p>
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
