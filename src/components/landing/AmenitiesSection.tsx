import { Wifi, Car, Sofa, Building2, Shield, Waves, Dumbbell, Coffee, Snowflake, Tv } from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Fast, reliable internet included.",
  },
  {
    icon: Car,
    title: "Secure Parking",
    description: "Designated spots available.",
  },
  {
    icon: Sofa,
    title: "Fully Furnished",
    description: "Move-in ready with essentials.",
  },
  {
    icon: Building2,
    title: "Elevator Access",
    description: "Convenient access to all floors.",
  },
  {
    icon: Shield,
    title: "24/7 Security",
    description: "Round-the-clock protection.",
  },
  {
    icon: Waves,
    title: "Laundry",
    description: "In-unit or building facilities.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art gym access.",
  },
  {
    icon: Coffee,
    title: "Co-working",
    description: "Stylish lounges for work.",
  },
  {
    icon: Snowflake,
    title: "Climate Control",
    description: "AC and heating for comfort.",
  },
  {
    icon: Tv,
    title: "Smart TV",
    description: "Streaming ready entertainment.",
  },
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-background/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-background/80 font-medium text-sm uppercase tracking-wider">Everything You Need</span>
          <h2 className="text-3xl md:text-4xl font-bold text-background mt-2 mb-4">
            Premium Amenities Included
          </h2>
          <p className="text-background/60 max-w-2xl mx-auto text-lg">
            Designed for your comfort. Enjoy a hotel-like experience with the privacy of a home.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.title}
              className="group flex flex-col items-center text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-background/5 border border-background/10 flex items-center justify-center mb-5 group-hover:bg-background/10 group-hover:border-background/20 group-hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
                <amenity.icon className="w-8 h-8 text-background group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-background mb-2 text-lg">{amenity.title}</h3>
              <p className="text-sm text-background/50 leading-relaxed max-w-[160px]">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
