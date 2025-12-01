import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  User,
  Calendar,
  Shield,
  Lock,
  UserPlus,
  Smartphone,
  Banknote,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Brandmark } from "@/components/Brandmark";
import { getApartmentById } from "@/data/apartments";
import { useAuth } from "@/context/AuthContext";
import { RentalAgreementModal } from "@/components/RentalAgreementModal";

const steps = [
  { id: 1, name: "Dates & Duration", icon: Calendar },
  { id: 2, name: "Guest Info", icon: User },
  { id: 3, name: "Account Access", icon: UserPlus },
  { id: 4, name: "Rules & Agreement", icon: Shield },
  { id: 5, name: "Payment", icon: CreditCard },
];
const successStep = steps.length + 1;

type PaymentMethod = "card" | "telebirr" | "cash";

const Booking = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const apartment = getApartmentById(Number(id));
  const { user, login, addBooking } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [telebirrStep, setTelebirrStep] = useState<"input" | "processing" | "success">("input");
  const [showAgreement, setShowAgreement] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    moveInDate: new Date().toISOString().split("T")[0],
    stayMonths: 3,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    acceptRules: false,
    acceptAgreement: false,
    cardNumber: "",
    expiry: "",
    cvc: "",
    telebirrPhone: "",
    accountEmail: "",
    accountPassword: "",
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountEmail: user.email,
      }));
    }
  }, [user]);

  const demoCredentials = useMemo(() => {
    const slug = Math.random().toString(36).slice(2, 8);
    return {
      email: `grace.guest+${slug}@example.com`,
      password: `Stay@${Math.floor(Math.random() * (999 - 111) + 111)}`,
    };
  }, []);

  // If apartment not found, redirect or show error
  if (!apartment) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <Brandmark />
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-foreground mb-4">Apartment Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The apartment you're trying to book doesn't exist.
            </p>
            <Button variant="hero" asChild>
              <Link to="/listings">Browse All Apartments</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const EXCHANGE_RATE = 152.10; // 1 USD = 152.10 ETB
  const monthlyRentUsd = apartment.priceUsd;
  const monthlyRentBirr = Math.round(monthlyRentUsd * EXCHANGE_RATE);
  const deposit = monthlyRentBirr;
  const serviceFee = Math.round(monthlyRentBirr * 0.1);
  const totalFirst = monthlyRentBirr + deposit + serviceFee;

  const handleNext = () => {
    if (currentStep < steps.length) {
      // Skip auth step if already logged in
      if (currentStep === 2 && user) {
        setCurrentStep(4);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // Skip auth step if already logged in
      if (currentStep === 4 && user) {
        setCurrentStep(2);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleTelebirrPayment = async () => {
    setLoading(true);
    setTelebirrStep("processing");

    // Simulate USSD Push
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setTelebirrStep("success");
    setLoading(false);

    toast({
      title: "Payment Confirmed",
      description: "Telebirr payment received successfully.",
    });

    // Proceed to complete booking after short delay
    setTimeout(() => {
      completeBookingProcess();
    }, 1500);
  };

  const completeBookingProcess = async () => {
    // Add booking to context
    if (user) {
      addBooking({
        apartmentId: apartment.id,
        apartmentTitle: apartment.title,
        apartmentImage: apartment.images[0],
        moveInDate: formData.moveInDate || new Date().toISOString(),
        stayMonths: formData.stayMonths,
        totalPrice: totalFirst,
      });
    }
    setCurrentStep(successStep);
  };

  const handleSubmit = async () => {
    if (paymentMethod === "telebirr") {
      handleTelebirrPayment();
      return;
    }

    setLoading(true);
    // Simulate API call for Card or Cash
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    completeBookingProcess();
  };

  const handleDemoAuth = () => {
    // Use demo credentials to login
    const email = formData.accountEmail || demoCredentials.email;
    // For demo purposes, we'll extract names from email or use defaults
    const firstName = formData.firstName || "Guest";
    const lastName = formData.lastName || "User";

    login(email, firstName, lastName);

    toast({
      title: authMode === "signup" ? "Account created" : "Signed in successfully",
      description: `Welcome, ${firstName}!`,
    });
  };

  const renderStepContent = () => {
    if (currentStep === successStep) {
      return (
        <div className="text-center py-12 animate-in fade-in zoom-in duration-700 relative">
          {/* Celebration Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full opacity-0 animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Success Icon with Animation */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
            <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-2xl ring-8 ring-success/20">
              <Check className="w-16 h-16 text-white animate-in zoom-in duration-500 delay-300" strokeWidth={3} />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-3 animate-in slide-in-from-bottom duration-500 delay-500">
            Booking Confirmed! 🎉
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto animate-in slide-in-from-bottom duration-500 delay-700">
            Your reservation has been confirmed. Check your email for the confirmation details and rental agreement.
          </p>

          <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm rounded-2xl p-8 text-left mb-8 border border-border/50 shadow-lg animate-in slide-in-from-bottom duration-500 delay-900">
            <h3 className="font-bold text-lg text-foreground mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              Booking Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                <span className="text-muted-foreground font-medium">Confirmation #</span>
                <span className="text-foreground font-bold">GA-2024-001234</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                <span className="text-muted-foreground font-medium">Property</span>
                <span className="text-foreground font-semibold">{apartment.title}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                <span className="text-muted-foreground font-medium">Move-in Date</span>
                <span className="text-foreground font-semibold">{formData.moveInDate || "TBD"}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                <span className="text-muted-foreground font-medium">Payment Method</span>
                <span className="text-foreground font-semibold capitalize">
                  {paymentMethod === "telebirr" ? "Telebirr" : paymentMethod === "cash" ? "Cash on Arrival" : "Credit Card"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom duration-500 delay-1000">
            <Button variant="outline" asChild size="lg">
              <Link to="/">Return Home</Link>
            </Button>
            <Button variant="hero" asChild size="lg" className="group">
              <Link to="/dashboard">
                View My Bookings
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label>Move-in Date</Label>
              <div className="mt-2 p-4 border border-border rounded-xl bg-card">
                <Calendar className="w-6 h-6 text-primary mb-2" />
                <Input
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Duration of Stay</Label>
              <div className="grid grid-cols-4 gap-3 mt-2">
                {[3, 6, 9, 12].map((months) => (
                  <button
                    key={months}
                    onClick={() => setFormData({ ...formData, stayMonths: months })}
                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${formData.stayMonths === months
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card border-border hover:border-primary/50"
                      }`}
                  >
                    {months} Months
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1.5"
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1.5"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1.5"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            {user ? (
              <div className="bg-success/10 border border-success/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Account Verified</h3>
                <p className="text-muted-foreground mt-1">
                  You are signed in as{" "}
                  <span className="font-medium text-foreground">{user.email}</span>
                </p>
                <Button variant="outline" size="sm" onClick={handleNext} className="mt-4">
                  Continue to Rules
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex gap-4 mb-6 border-b border-border">
                  <button
                    className={`pb-2 text-sm font-medium transition-colors ${authMode === "signup"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    onClick={() => setAuthMode("signup")}
                  >
                    Create Account
                  </button>
                  <button
                    className={`pb-2 text-sm font-medium transition-colors ${authMode === "signin"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    onClick={() => setAuthMode("signin")}
                  >
                    Sign In
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accountEmail">Email Address</Label>
                    <Input
                      id="accountEmail"
                      type="email"
                      value={formData.accountEmail}
                      onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                      className="mt-1.5"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountPassword">Password</Label>
                    <Input
                      id="accountPassword"
                      type="password"
                      value={formData.accountPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, accountPassword: e.target.value })
                      }
                      className="mt-1.5"
                      placeholder="••••••••"
                    />
                  </div>

                  <Button className="w-full mt-2" onClick={handleDemoAuth}>
                    {authMode === "signup" ? "Create Account" : "Sign In"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">House Rules</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• No smoking inside the apartment</li>
                <li>• No pets allowed</li>
                <li>• Quiet hours: 10 PM - 8 AM</li>
                <li>• Maximum 2 guests overnight</li>
                <li>• No parties or events</li>
              </ul>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.acceptRules}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptRules: checked as boolean })
                }
              />
              <span className="text-sm text-foreground">
                I have read and agree to follow the house rules
              </span>
            </label>

            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Rental Agreement</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                By proceeding with this booking, you agree to the standard rental agreement
                including terms for security deposit, maintenance responsibilities, and lease
                termination conditions. The full agreement will be sent to your email for review and
                electronic signature.
              </p>
              <Button variant="link" className="px-0 mt-2" onClick={() => setShowAgreement(true)}>
                Read Full Agreement
              </Button>

              <RentalAgreementModal
                isOpen={showAgreement}
                onOpenChange={setShowAgreement}
                onAgree={() => setFormData((prev) => ({ ...prev, acceptAgreement: true }))}
                apartmentTitle={apartment.title}
                apartmentLocation={apartment.location}
                moveInDate={formData.moveInDate}
                stayMonths={formData.stayMonths}
                monthlyRentUsd={monthlyRentUsd}
                deposit={deposit}
                tenantName={`${formData.firstName} ${formData.lastName}`}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.acceptAgreement}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptAgreement: checked as boolean })
                }
              />
              <span className="text-sm text-foreground">
                I accept the rental agreement and terms of service
              </span>
            </label>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Lock className="w-4 h-4" />
              Your payment information is encrypted and secure
            </div>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <div>
                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  Credit Card
                </Label>
              </div>
              <div>
                <RadioGroupItem value="telebirr" id="telebirr" className="peer sr-only" />
                <Label
                  htmlFor="telebirr"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                >
                  <Smartphone className="mb-3 h-6 w-6" />
                  Telebirr
                </Label>
              </div>
              <div>
                <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                <Label
                  htmlFor="cash"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                >
                  <Banknote className="mb-3 h-6 w-6" />
                  Cash on Arrival
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "card" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="mt-1.5"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="mt-1.5"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                      className="mt-1.5"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "telebirr" && (
              <div className="space-y-4 animate-fade-in">
                {telebirrStep === "input" && (
                  <>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary">
                      <p>Enter your Telebirr number. We will send a USSD push notification to your phone to complete the payment.</p>
                    </div>
                    <div>
                      <Label htmlFor="telebirrPhone">Telebirr Number</Label>
                      <Input
                        id="telebirrPhone"
                        type="tel"
                        value={formData.telebirrPhone}
                        onChange={(e) => setFormData({ ...formData, telebirrPhone: e.target.value })}
                        className="mt-1.5"
                        placeholder="0911234567"
                      />
                    </div>
                  </>
                )}

                {telebirrStep === "processing" && (
                  <div className="text-center py-8">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                      <Smartphone className="absolute inset-0 m-auto w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Check your phone</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                      We've sent a payment request to {formData.telebirrPhone}. Please enter your PIN to confirm.
                    </p>
                  </div>
                )}

                {telebirrStep === "success" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-lg text-success">Payment Successful!</h3>
                    <p className="text-muted-foreground text-sm">Redirecting to confirmation...</p>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-secondary/50 border border-border rounded-xl p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-primary" />
                    Pay on Arrival
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You can pay the full amount in cash (USD or ETB) when you arrive at the property.
                    Please note that your reservation is held for 24 hours after your scheduled move-in time.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-foreground">
                <span>First month rent</span>
                <div className="text-right">
                  <div className="font-semibold">${monthlyRentUsd.toLocaleString()} USD</div>
                  <div className="text-xs text-muted-foreground">
                    ({monthlyRentBirr.toLocaleString()} Birr)
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Security deposit</span>
                <div className="text-right">
                  <div className="font-semibold">${monthlyRentUsd.toLocaleString()} USD</div>
                  <div className="text-xs text-muted-foreground">
                    ({deposit.toLocaleString()} Birr)
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Service fee</span>
                <div className="text-right">
                  <div className="font-semibold">
                    ${Math.round(monthlyRentUsd * 0.1).toLocaleString()} USD
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ({serviceFee.toLocaleString()} Birr)
                  </div>
                </div>
              </div>
              <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
                <span>Total due today</span>
                <div className="text-right">
                  <div>
                    $
                    {(
                      monthlyRentUsd * 2 +
                      Math.round(monthlyRentUsd * 0.1)
                    ).toLocaleString()}{" "}
                    USD
                  </div>
                  <div className="text-xs text-muted-foreground font-normal">
                    ({totalFirst.toLocaleString()} Birr)
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Birr amounts based on today's CBE rate (1 USD = 152.10 ETB)
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Brandmark />
            </Link>
            <Link
              to={`/apartment/${id}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentStep < successStep && (
            <>
              {/* Enhanced Progress Steps with Percentage */}
              <div className="mb-8 md:mb-12 relative">
                {/* Progress Percentage Circle - Hidden on mobile */}
                <div className="hidden md:flex justify-center mb-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-border"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 60}`}
                        strokeDashoffset={`${2 * Math.PI * 60 * (1 - currentStep / steps.length)}`}
                        className="text-primary transition-all duration-500 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{Math.round((currentStep / steps.length) * 100)}%</span>
                      <span className="text-xs text-muted-foreground">Complete</span>
                    </div>
                  </div>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-between max-w-2xl mx-auto px-2">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center relative">
                        <div
                          className={`flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 shadow-lg ${currentStep >= step.id
                              ? "bg-primary border-primary text-primary-foreground md:scale-110"
                              : "border-border text-muted-foreground bg-background"
                            } ${currentStep === step.id ? "ring-2 md:ring-4 ring-primary/20" : ""}`}
                        >
                          {currentStep > step.id ? (
                            <Check className="w-4 h-4 md:w-6 md:h-6 animate-in zoom-in duration-300" />
                          ) : (
                            <step.icon className="w-4 h-4 md:w-6 md:h-6" />
                          )}
                        </div>
                        <span
                          className={`text-xs mt-2 font-medium transition-colors hidden md:block ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                            }`}
                        >
                          {step.name}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="relative flex-1 mx-1 md:mx-2" style={{ width: '30px', maxWidth: '60px' }}>
                          <div className="h-0.5 md:h-1 bg-border rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-primary transition-all duration-500 ease-out ${currentStep > step.id ? "w-full" : "w-0"
                                }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className={`${currentStep === successStep ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {/* Decorative gradient background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  {currentStep < successStep && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          {React.createElement(steps[currentStep - 1]?.icon, { className: "w-5 h-5 text-primary" })}
                        </div>
                        {steps[currentStep - 1]?.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2">
                        Step {currentStep} of {steps.length}
                      </p>
                    </div>
                  )}

                  <div className="animate-in fade-in slide-in-from-right-5 duration-500">
                    {renderStepContent()}
                  </div>

                  {currentStep < successStep && (
                    <div className="flex gap-4 mt-8 pt-6 border-t border-border/50">
                      {currentStep > 1 && (
                        <Button variant="outline" onClick={handleBack} className="group">
                          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                          Back
                        </Button>
                      )}
                      {currentStep < steps.length ? (
                        <Button
                          variant="hero"
                          className="ml-auto group"
                          onClick={handleNext}
                          disabled={
                            (currentStep === 1 && !formData.moveInDate) ||
                            (currentStep === 2 && (!formData.firstName || !formData.lastName || !formData.email)) ||
                            (currentStep === 3 && !user) ||
                            (currentStep === 4 && (!formData.acceptRules || !formData.acceptAgreement))
                          }
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      ) : (
                        <Button
                          variant="hero"
                          className="ml-auto"
                          onClick={handleSubmit}
                          disabled={
                            loading ||
                            (paymentMethod === "telebirr" && telebirrStep !== "input") ||
                            (paymentMethod === "telebirr" && !formData.telebirrPhone)
                          }
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : paymentMethod === "telebirr" ? (
                            "Pay with Telebirr"
                          ) : (
                            "Complete Booking"
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Apartment Summary - Enhanced Sticky Sidebar */}
            {currentStep < successStep && (
              <div className="lg:col-span-1">
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-6 border border-border/50 shadow-xl sticky top-24 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
                  <img
                    src={apartment.images[0]}
                    alt={apartment.title}
                    className="w-full h-48 object-cover rounded-2xl mb-4 ring-1 ring-border/50"
                  />
                  <h3 className="font-bold text-lg text-foreground mb-1">{apartment.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {apartment.location}
                  </p>

                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-foreground">
                        ${monthlyRentUsd.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">USD / month</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ≈ {monthlyRentBirr.toLocaleString()} Birr / month
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Duration
                      </span>
                      <span className="text-foreground font-semibold">{formData.stayMonths} months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly rent</span>
                      <span className="text-foreground font-medium">
                        {monthlyRentBirr.toLocaleString()} ETB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
