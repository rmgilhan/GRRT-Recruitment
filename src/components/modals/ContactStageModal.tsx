import React, { useState } from "react";
import {Button} from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

interface Props {
  open: boolean;
  onClose: () => void;
  candidate: any;
  onSubmit: (formData: any) => Promise<void>;
}

export default function ContactStageModal({ open, onClose, candidate, onSubmit }: Props) {

  const [form, setForm] = useState({
    email: "",
    phone: "",
    address: "",
  });

  if (!open || !candidate) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onSubmit({
      initialScreeningId: candidate._id,
      email: form.email,
      phone: form.phone,
      address: form.address,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg p-4 space-y-4 bg-white">
        <div className="-m-4 p-2 rounded-t-xl border-b bg-emerald-500 mb-5">
          <h2 className="text-xl font-lg text-center text-white">Candidate Contact</h2>
        </div>

        <CardContent className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={candidate.name}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Position Applied</label>
            <input
              value={candidate.positionApplied}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Editable Fields */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
