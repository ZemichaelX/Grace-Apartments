import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";

const categories = ["All", "Living", "Bedroom", "Kitchen", "View"];

const galleryImages = [
  {
    id: 1,
    title: "Bole Japan Penthouse",
    description: "Panoramic skyline views with entertainers' kitchen.",
    category: "Living",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
    size: "large", // 2x2
  },
  {
    id: 2,
    title: "Summit Retreat",
    description: "Soft neutrals and custom millwork.",
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&auto=format&fit=crop&q=80",
    size: "tall", // 1x2
  },
  {
    id: 3,
    title: "CMC Sky Residence",
    description: "Floor-to-ceiling glass wrapped around the living core.",
    category: "Living",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80",
    size: "normal", // 1x1
  },
  {
    id: 4,
    title: "Gourmet Kitchen",
    description: "Chef-grade appliances and marble islands.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    size: "normal", // 1x1
  },
  {
    id: 5,
    title: "Serene Bath",
    description: "Spa-inspired bathrooms with soaking tubs.",
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop&q=80",
    size: "wide", // 2x1
  },
  {
    id: 6,
    title: "City Views",
    description: "Breathtaking views of Addis Ababa.",
    category: "View",
    image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&auto=format&fit=crop&q=80",
    size: "normal", // 1x1
  },
  {
    id: 7,
    title: "Morning Light",
    description: "Sun-drenched corners perfect for reading.",
    category: "Living",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80",
    size: "normal", // 1x1
  },
];

const LifestyleGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -left-20 top-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-medium text-sm uppercase tracking-[0.4em] animate-fade-in">
            Residences
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-6 mb-6 tracking-tight">
            A Glimpse Inside
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every residence is designer-styled, softly lit, and serviced daily.
            Explore the spaces our residents call home.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {filteredImages.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-muted ${
                // Grid span logic based on size
                item.size === "large" ? "md:col-span-2 md:row-span-2" :
                  item.size === "tall" ? "md:col-span-1 md:row-span-2" :
                    item.size === "wide" ? "md:col-span-2 md:row-span-1" :
                      "md:col-span-1 md:row-span-1"
                } animate-in fade-in zoom-in duration-500 fill-mode-backwards`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-medium text-primary-foreground/80 uppercase tracking-wider mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.description}
                </p>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black/95 border-none">
          <div className="relative aspect-video w-full h-[80vh]">
            {selectedImage && (
              <>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-white/80">{selectedImage.description}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LifestyleGallery;

