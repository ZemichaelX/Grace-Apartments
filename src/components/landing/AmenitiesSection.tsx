import { Wifi, Car, Sofa, Building2, Shield, Waves, Dumbbell, Coffee, Snowflake, Tv } from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Stay connected with fast, reliable internet included in every apartment",
  },
  {
    icon: Car,
    title: "Parking Available",
    description: "Secure parking spots available for residents at select properties",
  },
  {
    icon: Sofa,
    title: "Fully Furnished",
    description: "Move-in ready apartments with quality furniture and essentials",
  },
  {
    icon: Building2,
    title: "Elevator Access",
    description: "Modern buildings with convenient elevator access on all floors",
  },
  {
    icon: Shield,
    title: "24/7 Security",
    description: "Round-the-clock security systems and doorman services",
  },
  {
    icon: Waves,
    title: "Laundry Facilities",
    description: "In-unit or building laundry facilities for your convenience",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art gym facilities to maintain your workout routine",
  },
  {
    icon: Coffee,
    title: "Common Areas",
    description: "Stylish lounges and co-working spaces for work and relaxation",
  },
  {
    icon: Snowflake,
    title: "Climate Control",
    description: "Central heating and air conditioning for year-round comfort",
  },
  {
    icon: Tv,
    title: "Smart TV",
    description: "Entertainment ready with smart TVs and streaming capabilities",
  },
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Everything You Need</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Premium Amenities Included
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our apartments come equipped with modern amenities to ensure your comfort and convenience during your stay.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.title}
              className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <amenity.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{amenity.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
