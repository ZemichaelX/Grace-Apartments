import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface RentalAgreementModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onAgree?: () => void;
    apartmentTitle: string;
    apartmentLocation: string;
    moveInDate?: string;
    stayMonths: number;
    monthlyRentUsd: number;
    deposit: number;
    tenantName?: string;
    showAgreeButton?: boolean;
}

export const RentalAgreementModal = ({
    isOpen,
    onOpenChange,
    onAgree,
    apartmentTitle,
    apartmentLocation,
    moveInDate,
    stayMonths,
    monthlyRentUsd,
    deposit,
    tenantName,
    showAgreeButton = true,
}: RentalAgreementModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Rental Agreement</DialogTitle>
                    <DialogDescription>
                        Please read the terms and conditions for your stay at {apartmentTitle}.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 p-4 border rounded-md">
                    <div className="space-y-4 text-sm">
                        <h4 className="font-bold">1. PARTIES</h4>
                        <p>
                            This Lease Agreement ("Agreement") is entered into on{" "}
                            {new Date().toLocaleDateString()} between Grace Apartments ("Landlord") and{" "}
                            {tenantName || "[Tenant Name]"} ("Tenant").
                        </p>

                        <h4 className="font-bold">2. PROPERTY</h4>
                        <p>
                            Landlord agrees to lease to Tenant the property located at {apartmentLocation}{" "}
                            ("Premises").
                        </p>

                        <h4 className="font-bold">3. TERM</h4>
                        <p>
                            The lease term shall commence on {moveInDate || "[Move-in Date]"} and shall continue
                            for a period of {stayMonths} months.
                        </p>

                        <h4 className="font-bold">4. RENT</h4>
                        <p>
                            Tenant agrees to pay the sum of ${monthlyRentUsd.toLocaleString()} USD (or equivalent
                            in ETB) per month, payable in advance on the 1st day of each month.
                        </p>

                        <h4 className="font-bold">5. SECURITY DEPOSIT</h4>
                        <p>
                            Tenant shall deposit with Landlord the sum of ${deposit.toLocaleString()} USD as
                            security for the performance of Tenant's obligations under this Agreement.
                        </p>

                        <h4 className="font-bold">6. USE OF PREMISES</h4>
                        <p>
                            The Premises shall be used and occupied by Tenant and Tenant's immediate family
                            exclusively as a private single-family dwelling.
                        </p>

                        <h4 className="font-bold">7. RULES AND REGULATIONS</h4>
                        <p>
                            Tenant agrees to comply with all rules and regulations established by Landlord,
                            including but not limited to:
                        </p>
                        <ul className="list-disc pl-5">
                            <li>No smoking inside the apartment.</li>
                            <li>No pets allowed without prior written consent.</li>
                            <li>Quiet hours are from 10:00 PM to 8:00 AM.</li>
                        </ul>

                        <h4 className="font-bold">8. GOVERNING LAW</h4>
                        <p>
                            This Agreement shall be governed by and construed in accordance with the laws of
                            Ethiopia.
                        </p>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                    {showAgreeButton && onAgree && (
                        <Button
                            onClick={() => {
                                onAgree();
                                onOpenChange(false);
                            }}
                        >
                            I Agree
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
