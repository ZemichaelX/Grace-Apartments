import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
    const { user, bookings, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-12 container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.firstName}!</h1>
                        <p className="text-muted-foreground mt-1">Manage your bookings and account details</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        Sign Out
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Bookings */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold text-foreground">Your Bookings</h2>

                        {bookings.length === 0 ? (
                            <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                                    <Calendar className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
                                <p className="text-muted-foreground mb-6">You haven't made any reservations yet.</p>
                                <Button variant="hero" asChild>
                                    <Link to="/listings">Browse Apartments</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-1/3 h-48 md:h-auto relative">
                                                <img
                                                    src={booking.apartmentImage}
                                                    alt={booking.apartmentTitle}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-success/90 text-success-foreground text-xs font-medium flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Confirmed
                                                </div>
                                            </div>
                                            <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-foreground mb-2">{booking.apartmentTitle}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>Move in: {new Date(booking.moveInDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{booking.stayMonths} months</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Total Paid</p>
                                                        <p className="font-semibold text-foreground">{booking.totalPrice.toLocaleString()} ETB</p>
                                                    </div>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link to={`/apartment/${booking.apartmentId}`}>View Property</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Account Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-2xl p-6 border border-border/50 sticky top-24">
                            <h2 className="text-xl font-semibold text-foreground mb-6">Account Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                                    <p className="text-foreground font-medium">{user.firstName} {user.lastName}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                                    <p className="text-foreground font-medium">{user.email}</p>
                                </div>

                                <div className="pt-4 border-t border-border/50">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
                                        <AlertCircle className="w-5 h-5 shrink-0 text-primary" />
                                        <p>Need help with your booking? Contact our support team at support@graceapartments.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
