import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brandmark } from "@/components/Brandmark";

const heroImage =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedSite) params.set("site", selectedSite);
    if (bedrooms) params.set("bedrooms", bedrooms);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden text-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern apartment interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/78 to-amber-50/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/65 to-transparent backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-5xl w-full flex flex-col items-center space-y-6">
          <Brandmark stacked textClassName="text-primary" className="text-primary" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-secondary/80 border border-border/60 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-primary">Homes curated for Addis Ababa executives</span>
          </div>

          <div className="w-full flex flex-col items-center space-y-10">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-slide-up text-balance px-6">
              Find Your Perfect <span className="gradient-text block">Home in Addis Ababa</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-2xl text-muted-foreground w-full max-w-6xl animate-slide-up text-balance px-4 lg:px-0"
              style={{ animationDelay: "100ms" }}
            >
              Grace Apartments offers designer residences across Bole Japan, Summit Fiyel Bet, and CMC—three of the
              capital&apos;s most connected districts.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="bg-card/95 rounded-[2.25rem] p-10 shadow-floating border border-border/50 animate-slide-up w-full max-w-4xl"
              style={{ animationDelay: "200ms" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Site Selection */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      className="w-full h-14 pl-10 pr-3 rounded-2xl bg-secondary/70 border border-border/50 text-foreground focus:ring-2 focus:ring-primary"
                      value={selectedSite}
                      onChange={(e) => setSelectedSite(e.target.value)}
                    >
                      <option value="">All Sites</option>
                      <option value="bole-japan">Bole Japan</option>
                      <option value="summit-fiyel-bet">Summit Fiyel Bet</option>
                      <option value="cmc">CMC</option>
                    </select>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bedrooms</label>
                  <select
                    className="w-full h-14 px-4 rounded-2xl bg-secondary/70 border border-border/50 text-foreground focus:ring-2 focus:ring-primary"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Button type="submit" variant="hero" size="lg" className="w-full h-14 rounded-2xl text-base">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
