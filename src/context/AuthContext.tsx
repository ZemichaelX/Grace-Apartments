import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
}

export interface Booking {
    id: string;
    apartmentId: number;
    apartmentTitle: string;
    apartmentImage: string;
    moveInDate: string;
    stayMonths: number;
    totalPrice: number;
    status: "confirmed" | "pending" | "cancelled";
    bookingDate: string;
}

interface AuthContextType {
    user: User | null;
    bookings: Booking[];
    login: (email: string, firstName: string, lastName: string) => void;
    logout: () => void;
    addBooking: (booking: Omit<Booking, "id" | "bookingDate" | "status">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("grace_user");
        const storedBookings = localStorage.getItem("grace_bookings");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
        }
    }, []);

    const login = (email: string, firstName: string, lastName: string) => {
        const newUser = { email, firstName, lastName };
        setUser(newUser);
        localStorage.setItem("grace_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("grace_user");
    };

    const addBooking = (bookingData: Omit<Booking, "id" | "bookingDate" | "status">) => {
        const newBooking: Booking = {
            ...bookingData,
            id: Math.random().toString(36).substr(2, 9),
            status: "confirmed",
            bookingDate: new Date().toISOString(),
        };

        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem("grace_bookings", JSON.stringify(updatedBookings));
    };

    return (
        <AuthContext.Provider value={{ user, bookings, login, logout, addBooking }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
