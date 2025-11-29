// Shared apartment data for the application
export interface Apartment {
    id: number;
    title: string;
    location: string;
    address: string;
    site: string;
    neighborhood: string;
    priceUsd: number;
    priceBirr: number;
    minMonths: number;
    bedrooms: number;
    bathrooms: number;
    sqm: number;
    description: string;
    images: string[];
    amenities: Array<{ icon: any; name: string }>;
    furnishedItems: string[];
    rules: string[];
    rating: number;
    reviewCount: number;
    host: {
        name: string;
        image: string;
        responseTime: string;
        verified: boolean;
    };
    featured?: boolean;
}

import {
    Wifi,
    Car,
    Dumbbell,
    Waves,
    Shield,
    Coffee,
} from "lucide-react";

export const apartments: Apartment[] = [
    {
        id: 1,
        title: "Modern 2BR at Bole Japan",
        location: "Bole Japan, Addis Ababa",
        address: "Near Bole Japan Traffic Light, Addis Ababa, Ethiopia",
        site: "bole-japan",
        neighborhood: "A short walk inside from Bole Japan Traffic Light - quiet residential area with easy access to shops and restaurants",
        priceUsd: 1600,
        priceBirr: 45000,
        minMonths: 6,
        bedrooms: 2,
        bathrooms: 1,
        sqm: 85,
        description:
            "Experience comfortable living in this beautifully furnished apartment at our Bole Japan site. Located just a short walk from Bole Japan Traffic Light, this modern 2-bedroom apartment features quality finishes, natural lighting, and all the amenities you need for a comfortable stay. Perfect for professionals and small families looking for a prime location in Addis Ababa.",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
        ],
        amenities: [
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: Shield, name: "24/7 Security Guard" },
            { icon: Car, name: "Parking Space" },
            { icon: Waves, name: "Water Tank" },
            { icon: Dumbbell, name: "Generator Backup" },
            { icon: Coffee, name: "Common Area" },
        ],
        furnishedItems: [
            "Queen-size bed with mattress",
            "Sofa set",
            "Dining table with chairs",
            "Wardrobe",
            "TV stand",
            "Full kitchen equipment",
            "Linens & towels",
            "Water heater",
        ],
        rules: [
            "No smoking inside the apartment",
            "Pets negotiable - ask management",
            "Quiet hours: 10 PM - 7 AM",
            "Maximum 4 guests overnight",
            "Maintain cleanliness in common areas",
        ],
        rating: 4.8,
        reviewCount: 23,
        host: {
            name: "Grace Apartments Management",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
            responseTime: "within a few hours",
            verified: true,
        },
        featured: true,
    },
    {
        id: 2,
        title: "Summit Executive 3BR",
        location: "Summit Fiyel Bet, Addis Ababa",
        address: "Beside Summit Square, Addis Ababa, Ethiopia",
        site: "summit-fiyel-bet",
        neighborhood: "Beside Summit Square - premium location with shopping and dining",
        priceUsd: 2000,
        priceBirr: 65000,
        minMonths: 12,
        bedrooms: 3,
        bathrooms: 2,
        sqm: 120,
        description:
            "Luxurious 3-bedroom executive apartment in the heart of Summit area. This spacious unit offers premium finishes, modern appliances, and stunning views. Ideal for executives and families seeking upscale living with convenient access to business districts and amenities.",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
        ],
        amenities: [
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: Shield, name: "24/7 Security Guard" },
            { icon: Car, name: "Parking Space" },
            { icon: Waves, name: "Water Tank" },
            { icon: Dumbbell, name: "Generator Backup" },
            { icon: Coffee, name: "Common Area" },
        ],
        furnishedItems: [
            "King-size bed with premium mattress",
            "Luxury sofa set",
            "Dining table with 6 chairs",
            "Built-in wardrobes",
            "Entertainment center",
            "Full kitchen equipment",
            "Premium linens & towels",
            "Water heater",
        ],
        rules: [
            "No smoking inside the apartment",
            "Pets negotiable - ask management",
            "Quiet hours: 10 PM - 7 AM",
            "Maximum 6 guests overnight",
            "Maintain cleanliness in common areas",
        ],
        rating: 4.9,
        reviewCount: 31,
        host: {
            name: "Grace Apartments Management",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
            responseTime: "within a few hours",
            verified: true,
        },
        featured: true,
    },
    {
        id: 3,
        title: "CMC Skyline Penthouse",
        location: "CMC, Addis Ababa",
        address: "Opposite CMC Africa Avenue, Addis Ababa, Ethiopia",
        site: "cmc",
        neighborhood: "Opposite CMC Africa Avenue - diplomatic area with excellent security",
        priceUsd: 2800,
        priceBirr: 78000,
        minMonths: 6,
        bedrooms: 3,
        bathrooms: 2,
        sqm: 145,
        description:
            "Stunning penthouse apartment in the prestigious CMC area. This premium residence features floor-to-ceiling windows, high-end finishes, and panoramic city views. Perfect for discerning tenants who appreciate luxury living in a prime diplomatic neighborhood.",
        images: [
            "https://images.unsplash.com/photo-1658218635253-64728f6234be?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
        ],
        amenities: [
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: Shield, name: "24/7 Security Guard" },
            { icon: Car, name: "Parking Space" },
            { icon: Waves, name: "Water Tank" },
            { icon: Dumbbell, name: "Generator Backup" },
            { icon: Coffee, name: "Common Area" },
        ],
        furnishedItems: [
            "King-size bed with luxury mattress",
            "Designer sofa set",
            "Marble dining table with 8 chairs",
            "Walk-in closets",
            "Premium entertainment system",
            "Gourmet kitchen equipment",
            "Designer linens & towels",
            "Premium water heater",
        ],
        rules: [
            "No smoking inside the apartment",
            "Pets negotiable - ask management",
            "Quiet hours: 10 PM - 7 AM",
            "Maximum 6 guests overnight",
            "Maintain cleanliness in common areas",
        ],
        rating: 5.0,
        reviewCount: 18,
        host: {
            name: "Grace Apartments Management",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
            responseTime: "within a few hours",
            verified: true,
        },
        featured: true,
    },
    {
        id: 4,
        title: "Designer 2BR in Bole Japan",
        location: "Bole Japan, Addis Ababa",
        address: "Minutes from Bole International Airport, Addis Ababa, Ethiopia",
        site: "bole-japan",
        neighborhood: "Minutes from Bole International Airport - perfect for frequent travelers",
        priceUsd: 2400,
        priceBirr: 64000,
        minMonths: 6,
        bedrooms: 2,
        bathrooms: 2,
        sqm: 98,
        description:
            "Contemporary designer apartment near Bole International Airport. Features custom interiors, premium appliances, and thoughtful design throughout. Ideal for professionals and travelers who value style, comfort, and convenience in a prime location.",
        images: [
            "https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
        ],
        amenities: [
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: Shield, name: "24/7 Security Guard" },
            { icon: Car, name: "Parking Space" },
            { icon: Waves, name: "Water Tank" },
            { icon: Dumbbell, name: "Generator Backup" },
            { icon: Coffee, name: "Common Area" },
        ],
        furnishedItems: [
            "Queen-size bed with premium mattress",
            "Designer sofa set",
            "Modern dining table with chairs",
            "Custom wardrobes",
            "Smart TV setup",
            "Designer kitchen equipment",
            "Premium linens & towels",
            "Instant water heater",
        ],
        rules: [
            "No smoking inside the apartment",
            "Pets negotiable - ask management",
            "Quiet hours: 10 PM - 7 AM",
            "Maximum 4 guests overnight",
            "Maintain cleanliness in common areas",
        ],
        rating: 4.7,
        reviewCount: 27,
        host: {
            name: "Grace Apartments Management",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
            responseTime: "within a few hours",
            verified: true,
        },
        featured: true,
    },
    {
        id: 5,
        title: "Summit Garden Loft",
        location: "Summit Fiyel Bet, Addis Ababa",
        address: "Overlooks Summit Green Park, Addis Ababa, Ethiopia",
        site: "summit-fiyel-bet",
        neighborhood: "Overlooks Summit Green Park - serene environment with greenery",
        priceUsd: 1900,
        priceBirr: 60000,
        minMonths: 6,
        bedrooms: 2,
        bathrooms: 2,
        sqm: 102,
        description:
            "Charming garden loft with views of Summit Green Park. This bright and airy apartment combines modern comfort with natural surroundings. Perfect for those seeking a peaceful retreat while staying connected to the city's amenities and business centers.",
        images: [
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
        ],
        amenities: [
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: Shield, name: "24/7 Security Guard" },
            { icon: Car, name: "Parking Space" },
            { icon: Waves, name: "Water Tank" },
            { icon: Dumbbell, name: "Generator Backup" },
            { icon: Coffee, name: "Common Area" },
        ],
        furnishedItems: [
            "Queen-size bed with mattress",
            "Comfortable sofa set",
            "Dining table with chairs",
            "Wardrobe",
            "TV stand",
            "Full kitchen equipment",
            "Linens & towels",
            "Water heater",
        ],
        rules: [
            "No smoking inside the apartment",
            "Pets negotiable - ask management",
            "Quiet hours: 10 PM - 7 AM",
            "Maximum 4 guests overnight",
            "Maintain cleanliness in common areas",
        ],
        rating: 4.6,
        reviewCount: 19,
        host: {
            name: "Grace Apartments Management",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
            responseTime: "within a few hours",
            verified: true,
        },
        featured: false,
    },
    {
        id: 6,
        title: "CMC Executive Loft",
        location: "CMC, Addis Ababa",
        address: "Tucked inside the diplomatic enclave, Addis Ababa, Ethiopia",
        site: "cmc",
        neighborhood: "Tucked inside the diplomatic enclave - exclusive and secure",
        priceUsd: 2200,
        priceBirr: 70000,
        minMonths: 12,
        bedrooms: 3,
        bathrooms: 2,
        sqm: 135,
        description:
            "Exclusive executive loft in the diplomatic enclave of CMC. This sophisticated apartment offers privacy, security, and refined living spaces. Ideal for diplomats, executives, and professionals seeking a prestigious address with top-tier amenities.",
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
        ],
        amenities: [
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: Shield, name: "24/7 Security Guard" },
            { icon: Car, name: "Parking Space" },
            { icon: Waves, name: "Water Tank" },
            { icon: Dumbbell, name: "Generator Backup" },
            { icon: Coffee, name: "Common Area" },
        ],
        furnishedItems: [
            "King-size bed with premium mattress",
            "Executive sofa set",
            "Elegant dining table with chairs",
            "Built-in wardrobes",
            "Entertainment center",
            "Full kitchen equipment",
            "Premium linens & towels",
            "Water heater",
        ],
        rules: [
            "No smoking inside the apartment",
            "Pets negotiable - ask management",
            "Quiet hours: 10 PM - 7 AM",
            "Maximum 6 guests overnight",
            "Maintain cleanliness in common areas",
        ],
        rating: 4.8,
        reviewCount: 22,
        host: {
            name: "Grace Apartments Management",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
            responseTime: "within a few hours",
            verified: true,
        },
        featured: false,
    },
];

// Helper function to get apartment by ID
export const getApartmentById = (id: number): Apartment | undefined => {
    return apartments.find((apt) => apt.id === id);
};
