import { Search, ClipboardList, CreditCard, Key } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Browse Apartments",
    description: "Search through our curated collection of verified apartments. Filter by location, price, amenities, and minimum stay requirements.",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Review Details",
    description: "Explore detailed photos, amenities lists, furnished inventory, and read the full rental agreement before making a decision.",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Book Securely",
    description: "Complete your booking with our secure payment system. Pay your first month's rent and security deposit safely online.",
  },
  {
    icon: Key,
    number: "04",
    title: "Move In",
    description: "Receive your keys on move-in day and start enjoying your new home. Our support team is always here to help.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your journey to a perfect home in 4 simple steps.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center group">
                {/* Number Circle */}
                <div className="w-24 h-24 rounded-full bg-background border-4 border-border flex items-center justify-center mb-6 relative z-10 group-hover:border-primary transition-colors duration-300 shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
