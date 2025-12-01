import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Hana Tesfaye",
    role: "Business Professional",
    location: "Bole Japan",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
    rating: 5,
    text:
      "Grace Apartments made finding my apartment so easy! The Bole Japan location is perfect - close to everything I need. The apartment was exactly as pictured, fully furnished and ready to move in.",
  },
  {
    id: 2,
    name: "Daniel Bekele",
    role: "IT Consultant",
    location: "Summit Fiyel Bet",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    rating: 5,
    text: "The Summit location is excellent - right beside the convention center and easy access to the city biggest malls. The team was very professional and responsive throughout.",
  },
  {
    id: 3,
    name: "Sara Mulugeta",
    role: "NGO Worker",
    location: "Bole Japan",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
    rating: 5,
    text:
      "I relocated to Addis for work and needed a furnished place quickly. Grace Apartments delivered exactly what I needed. The quality of the apartments and service is outstanding!",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 relative">
      {/* Quote Icon */}
      <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-warning text-warning" />
        ))}
      </div>

      {/* Text */}
      <p className="text-foreground leading-relaxed mb-6">"{testimonial.text}"</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} · {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            What Our Tenants Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied tenants have to say about their experience with Grace Apartments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
