import { ShieldCheck, BadgeCheck, HeadphonesIcon, Wallet, Clock, Award, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Listings",
    description: "Every apartment is personally verified by our team to ensure quality.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Bank-level encryption protects your financial data.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team available around the clock.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "No hidden fees. Clear breakdown of all costs.",
  },
  {
    icon: Clock,
    title: "Flexible Terms",
    description: "Short-term to long-term options to fit your timeline.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Satisfaction guaranteed or we'll make it right.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
                alt="Happy residents"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">#1 Trusted Platform</p>
                    <p className="text-white/80 text-sm">Voted by thousands of renters in Addis Ababa.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Why Grace Apartments</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              The Smart Choice for Renters
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              We've built our platform with your needs in mind. Experience a hassle-free rental process designed for modern living.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 group-hover:border-primary group-hover:text-primary transition-colors duration-300 shadow-sm">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
