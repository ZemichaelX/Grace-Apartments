import { ShieldCheck, BadgeCheck, HeadphonesIcon, Wallet, Clock, Award } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Listings",
    description: "Every apartment is personally verified by our team to ensure quality and accuracy of listings.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your payments are protected with bank-level encryption and secure payment processing.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist with any questions.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "No hidden fees. What you see is what you pay, with clear breakdowns of all costs.",
  },
  {
    icon: Clock,
    title: "Flexible Terms",
    description: "From short-term stays to long-term leases, find options that fit your timeline.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Not satisfied? We'll help you find an alternative or offer a full refund.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Why Grace Apartments</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            The Smart Choice for Renters
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've built our platform with your needs in mind. Here's why thousands of renters choose Grace Apartments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground">Prime Locations</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">50+</p>
            <p className="text-sm text-muted-foreground">Happy Tenants</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">100%</p>
            <p className="text-sm text-muted-foreground">Furnished</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Hidden Fees</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
