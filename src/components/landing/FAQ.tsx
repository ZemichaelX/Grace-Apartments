import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the monthly rent?",
    answer: "Our monthly rent typically includes all utilities (water, electricity, heating/cooling, internet), furniture, and basic amenities. Specific inclusions are listed on each apartment's detail page. Some premium amenities like parking may have additional fees.",
  },
  {
    question: "What is the minimum stay requirement?",
    answer: "Minimum stay requirements vary by apartment and are set by property owners. You can find this information on each listing page. Common options range from 1 month to 12 months, with many properties offering flexible 3-month minimum stays.",
  },
  {
    question: "How does the booking process work?",
    answer: "Simply browse our listings, select your preferred apartment, choose your move-in date and duration, review the rental agreement, and complete your secure payment. You'll receive confirmation within 24 hours and move-in instructions before your arrival date.",
  },
  {
    question: "Is there a security deposit required?",
    answer: "Yes, most apartments require a security deposit equivalent to one month's rent. This is fully refundable upon move-out, subject to the property condition. The exact amount is displayed during checkout.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Cancellation policies vary by listing. Most properties offer free cancellation up to 14 days before move-in. Cancellations within 14 days may be subject to fees. Full details are provided before you complete your booking.",
  },
  {
    question: "How are the apartments verified?",
    answer:
      "Our team personally inspects every apartment listed on Grace Apartments. We verify the accuracy of photos, amenities, and descriptions. We also vet property owners to ensure they meet our quality standards.",
  },
  {
    question: "What if something goes wrong during my stay?",
    answer: "Our 24/7 support team is available to help with any issues. We also have a satisfaction guarantee - if your apartment doesn't match the listing, we'll help you find an alternative or provide a full refund.",
  },
  {
    question: "Can I extend my stay?",
    answer: "Yes! You can request an extension through your dashboard. Subject to availability, extensions are usually approved within 24-48 hours. We recommend requesting at least 2 weeks before your current lease ends.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Support</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about renting with Grace Apartments. Can't find what you're looking for?
            Contact our support team.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-soft transition-all duration-200"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
