import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/intergrations/supabase/client";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSending(true);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || null,
          message: form.message.trim(),
        });

      if (error) {
        throw error;
      }

      toast.success("Message sent! We'll reply within a few hours.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSending(false);
    }
  };

  const input =
    "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <p className="text-xs uppercase tracking-widest text-[color:var(--rose)]">
        Contact
      </p>

      <h1 className="mt-2 font-display text-5xl text-[color:var(--burgundy)]">
        We'd love to hear from you.
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Questions about an order, custom bouquet ideas, or wholesale
        inquiries — reach out and we'll reply within a few hours.
      </p>

      {/* Content */}
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Contact information */}
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
            <Mail className="mt-1 h-5 w-5 text-[color:var(--burgundy)]" />

            <div>
              <p className="font-display text-lg">Email</p>

              <a
                href="mailto:blumoraflorals@gmail.com"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                blumoraflorals@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
            <Phone className="mt-1 h-5 w-5 text-[color:var(--burgundy)]" />

            <div>
              <p className="font-display text-lg">Phone</p>

              <p className="text-sm text-muted-foreground">
                (555) 010-2468 · 9am–7pm daily
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
            <MapPin className="mt-1 h-5 w-5 text-[color:var(--burgundy)]" />

            <div>
              <p className="font-display text-lg">Studio</p>

              <p className="text-sm text-muted-foreground">
                42 Rose Lane, Blossom City
              </p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-card p-6"
        >
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                name: e.target.value,
              }))
            }
            className={input}
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                email: e.target.value,
              }))
            }
            className={input}
          />

          <input
            placeholder="Subject (optional)"
            value={form.subject}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                subject: e.target.value,
              }))
            }
            className={input}
          />

          <textarea
            required
            rows={5}
            placeholder="How can we help?"
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                message: e.target.value,
              }))
            }
            className={input}
          />

          <Button
            type="submit"
            size="lg"
            disabled={sending}
            className="w-full rounded-full bg-[color:var(--burgundy)] text-white hover:bg-[color:var(--rose)]"
          >
            {sending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </div>
  );
}