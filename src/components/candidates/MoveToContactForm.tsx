import React, { useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import useCandidates from "@hooks/useCandidates"; // your hook for API calls

interface MoveToContactFormProps {
  candidateId: string; // InitialScreening _id
  candidateName: string; // optional display
  onSuccess?: () => void; // callback after success
}

export default function MoveToContactForm({ candidateId, candidateName, onSuccess }: MoveToContactFormProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { moveToStage } = useCandidates();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone || !address) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await moveToStage({
        initialScreeningId: candidateId,
        email,
        phone,
        address,
      });

      toast.success("Candidate moved to Contact Stage!");
      setEmail("");
      setPhone("");
      setAddress("");

      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to move candidate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 max-w-md mx-auto mt-4">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">
          Move "{candidateName}" to Contact Stage
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Move to Contact"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
