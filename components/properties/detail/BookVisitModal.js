"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Stepper } from "@/components/ui/Stepper";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle2, Phone, User } from "lucide-react";

const guestSteps = ["Your Details", "Pick a Slot", "Confirm"];
const clientSteps = ["Pick a Slot", "Confirm"];

export function BookVisitModal({ open, onClose, propertyTitle, propertySlug, client }) {
  const steps = client ? clientSteps : guestSteps;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: client?.name || "", phone: client?.phone || "", date: "", time: "" });
  const { toast } = useToast();

  function reset() {
    setStep(0);
    setForm({ name: client?.name || "", phone: client?.phone || "", date: "", time: "" });
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  function submit() {
    toast({ tone: "success", title: "Site visit requested", description: `We'll confirm your visit to ${propertyTitle} shortly.` });
    handleClose();
  }

  if (client) {
    return (
      <Modal open={open} onClose={handleClose} title="Book a Site Visit" description={propertyTitle} size="md">
        <div className="mb-8">
          <Stepper steps={steps} current={step} />
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <Input label="Preferred date" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            <Select label="Preferred time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}>
              <option value="">Select a slot</option>
              <option>10:00 AM – 11:00 AM</option>
              <option>11:30 AM – 12:30 PM</option>
              <option>3:00 PM – 4:00 PM</option>
              <option>4:30 PM – 5:30 PM</option>
            </Select>
            <Button className="mt-2 w-full" onClick={() => setStep(1)} disabled={!form.date || !form.time}>
              Continue
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <div>
              <p className="font-display text-xl text-ink">Confirm your visit</p>
              <p className="mt-1 text-sm text-ink-muted">
                {form.date} · {form.time} · Advisor will call {form.phone}
              </p>
              <p className="mt-1 text-xs text-ink-faint">Ref: {propertySlug}</p>
            </div>
            <Button className="w-full" onClick={submit}>Confirm Site Visit</Button>
          </div>
        )}
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} title="Book a Site Visit" description={propertyTitle} size="md">
      <div className="mb-8">
        <Stepper steps={steps} current={step} />
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <Input label="Full name" icon={User} placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="Phone number" icon={Phone} placeholder="+91 98480 12345" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          <Button className="mt-2 w-full" onClick={() => setStep(1)} disabled={!form.name || !form.phone}>
            Continue
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Input label="Preferred date" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
          <Select label="Preferred time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}>
            <option value="">Select a slot</option>
            <option>10:00 AM – 11:00 AM</option>
            <option>11:30 AM – 12:30 PM</option>
            <option>3:00 PM – 4:00 PM</option>
            <option>4:30 PM – 5:30 PM</option>
          </Select>
          <div className="flex gap-3">
            <Button variant="outline" className="w-full" onClick={() => setStep(0)}>Back</Button>
            <Button className="w-full" onClick={() => setStep(2)} disabled={!form.date || !form.time}>Continue</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <div>
            <p className="font-display text-xl text-ink">Confirm your visit</p>
            <p className="mt-1 text-sm text-ink-muted">
              {form.date} · {form.time} · Advisor will call {form.phone}
            </p>
          </div>
          <Button className="w-full" onClick={submit}>Confirm Site Visit</Button>
        </div>
      )}
    </Modal>
  );
}
