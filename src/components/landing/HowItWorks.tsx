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
    title: "Review Details & Rules",
    description: "Explore detailed photos, amenities lists, furnished inventory, and read the full rental agreement before making a decision.",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Book & Pay Securely",
    description: "Complete your booking with our secure payment system. Pay your first month's rent and security deposit safely online.",
  },
  {
    icon: Key,
    number: "04",
    title: "Move In & Enjoy",
    description: "Receive your keys on move-in day and start enjoying your new home. Our support team is always here to help.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding and booking your perfect apartment has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="relative bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 group">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-elevated">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
