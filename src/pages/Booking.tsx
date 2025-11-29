import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Brandmark } from "@/components/Brandmark";

const steps = [
  { id: 1, name: "Dates & Duration", icon: Calendar },
  { id: 2, name: "Guest Info", icon: User },
  { id: 3, name: "Account Access", icon: UserPlus },
  { id: 4, name: "Rules & Agreement", icon: Shield },
  { id: 5, name: "Payment", icon: CreditCard },
];
const successStep = steps.length + 1;

const Booking = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [authCompleted, setAuthCompleted] = useState(false);
  const [authenticatedEmail, setAuthenticatedEmail] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    moveInDate: "",
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
    accountEmail: "",
    accountPassword: "",
  });

  const demoCredentials = useMemo(() => {
    const slug = Math.random().toString(36).slice(2, 8);
    return {
      email: `grace.guest+${slug}@example.com`,
      password: `Stay@${Math.floor(Math.random() * (999 - 111) + 111)}`,
    };
  }, []);

  // Mock apartment data
  const apartment = {
    title: "Modern 2BR at Bole Japan",
    location: "Bole Japan, Addis Ababa",
    priceUsd: 1600,
    priceBirr: 45000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&auto=format&fit=crop",
  };

  const monthlyRentUsd = apartment.priceUsd;
  const monthlyRentBirr = apartment.priceBirr;
  const deposit = monthlyRentBirr;
  const serviceFee = Math.round(monthlyRentBirr * 0.1);
  const totalFirst = monthlyRentBirr + deposit + serviceFee;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setCurrentStep(successStep); // Success state
  };

  const handleDemoAuth = () => {
    setAuthCompleted(true);
    setAuthenticatedEmail(demoCredentials.email);
    setFormData((prev) => ({
      ...prev,
      email: prev.email || demoCredentials.email,
      accountEmail: demoCredentials.email,
      accountPassword: demoCredentials.password,
    }));
    toast({
      title: authMode === "signup" ? "Demo account created" : "Signed in successfully",
      description: `Authenticated as ${demoCredentials.email}`,
    });
  };

  const renderStepContent = () => {
    if (currentStep === successStep) {
      return (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your reservation has been confirmed. Check your email for the confirmation details
            and rental agreement.
          </p>
          <div className="bg-secondary/50 rounded-xl p-6 text-left mb-6">
            <h3 className="font-semibold text-foreground mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmation #</span>
                <span className="text-foreground font-medium">GA-2024-001234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property</span>
                <span className="text-foreground">{apartment.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Move-in Date</span>
                <span className="text-foreground">{formData.moveInDate || "TBD"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground">{formData.stayMonths} months</span>
              </div>
              {authenticatedEmail && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account</span>
                  <span className="text-foreground">{authenticatedEmail}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="hero" className="flex-1" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="moveInDate">Move-in Date</Label>
              <Input
                id="moveInDate"
                type="date"
                value={formData.moveInDate}
                onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                className="mt-1.5"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <Label>Stay Duration (months)</Label>
              <div className="grid grid-cols-4 gap-3 mt-1.5">
                {[3, 6, 9, 12].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setFormData({ ...formData, stayMonths: months })}
                    className={`py-3 rounded-lg border text-center transition-colors ${
                      formData.stayMonths === months
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {months} mo
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
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
              <Label htmlFor="email">Email</Label>
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
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Choose whether to sign in or create a Grace Apartments account. We&apos;ll pass the
                flow automatically with secure demo credentials so you can keep booking.
              </p>
              <div className="flex gap-3">
                {(["signup", "signin"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setAuthMode(mode);
                      setAuthCompleted(false);
                    }}
                    className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${
                      authMode === mode
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    {mode === "signup" ? "Create account" : "Sign in"}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 p-6 space-y-4">
              <div>
                <p className="text-foreground font-semibold mb-1">
                  {authMode === "signup" ? "Demo account credentials" : "Demo login credentials"}
                </p>
                <p className="text-sm text-muted-foreground">
                  We pre-filled a random email and password so you can breeze through authentication.
                </p>
              </div>

              <div className="bg-secondary/40 rounded-xl p-4 space-y-2 font-mono text-sm text-foreground">
                <div>
                  <span className="text-muted-foreground mr-2">Email:</span>
                  {demoCredentials.email}
                </div>
                <div>
                  <span className="text-muted-foreground mr-2">Password:</span>
                  {demoCredentials.password}
                </div>
              </div>

              <Button variant="hero" className="w-full" type="button" onClick={handleDemoAuth}>
                Use demo credentials
              </Button>

              {authCompleted && (
                <div className="flex items-center gap-2 text-success text-sm">
                  <Check className="w-4 h-4" />
                  Authenticated as {authenticatedEmail}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
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
                termination conditions. The full agreement will be sent to your email for
                review and electronic signature.
              </p>
              <Button variant="link" className="px-0 mt-2">
                Read Full Agreement
              </Button>
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
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Lock className="w-4 h-4" />
              Your payment information is encrypted and secure
            </div>

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

            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-foreground">
                <span>First month rent</span>
                <span>{monthlyRentBirr.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Security deposit</span>
                <span>{deposit.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Service fee</span>
                <span>{serviceFee.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
                <span>Total due today</span>
                <span>{totalFirst.toLocaleString()} ETB</span>
              </div>
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
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                          currentStep >= step.id
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-24 h-0.5 mx-2 transition-colors ${
                            currentStep > step.id ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {steps.map((step) => (
                    <span
                      key={step.id}
                      className={`text-xs ${
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className={`${currentStep === successStep ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                {currentStep < successStep && (
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    {steps[currentStep - 1]?.name}
                  </h2>
                )}
                {renderStepContent()}

                {currentStep < successStep && (
                  <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                    {currentStep > 1 && (
                      <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    )}
                    {currentStep < steps.length ? (
                      <Button
                        variant="hero"
                        className="ml-auto"
                        onClick={handleNext}
                        disabled={currentStep === 3 && !authCompleted}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        variant="hero"
                        className="ml-auto"
                        onClick={handleSubmit}
                        disabled={
                          loading ||
                          !formData.acceptRules ||
                          !formData.acceptAgreement ||
                          !authCompleted
                        }
                      >
                        {loading ? "Processing..." : "Complete Booking"}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Apartment Summary */}
            {currentStep < successStep && (
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl p-6 border border-border/50 sticky top-24">
                  <img
                    src={apartment.image}
                    alt={apartment.title}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <h3 className="font-semibold text-foreground mb-1">{apartment.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{apartment.location}</p>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        ${monthlyRentUsd.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">USD / month</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ≈ {monthlyRentBirr.toLocaleString()} Birr / month
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly rent</span>
                      <span className="text-foreground">{monthlyRentBirr.toLocaleString()} ETB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="text-foreground">{formData.stayMonths} months</span>
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
