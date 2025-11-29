const galleryImages = [
  {
    title: "Bole Japan Penthouse",
    description: "Panoramic skyline views with entertainers' kitchen.",
    image: "https://images.unsplash.com/photo-1620086385485-d0bd6daa815c?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Summit Fiyel Bet Retreat",
    description: "Soft neutrals, custom millwork, and curated art.",
    image: "https://images.unsplash.com/photo-1501876725168-00c445821c9e?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "CMC Sky Residence",
    description: "Floor-to-ceiling glass wrapped around the living core.",
    image: "https://images.unsplash.com/photo-1542928658-22251e208ac1?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Penthouse at CMC",
    description: "Tailored lighting and Italian furnishings throughout.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
  },
];

const LifestyleGallery = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-primary font-medium text-sm uppercase tracking-[0.4em]">Residences</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            A Glimpse Inside Grace Apartments
          </h2>
          <p className="text-muted-foreground">
            Every residence is designer-styled, softly lit, and serviced daily. Explore a few of the spaces our residents
            call home before diving into the details.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card shadow-soft"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#05030d]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 space-y-1">
                <h3 className="text-xl font-semibold text-card">{item.title}</h3>
                <p className="text-sm text-card/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;

