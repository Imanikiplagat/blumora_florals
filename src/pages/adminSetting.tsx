import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/intergrations/supabase/client";

type Business = {
  name: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
};

const DEFAULTS: Business = {
  name: "Blumora",
  email: "",
  phone: "",
  address: "",
  instagram: "",
  facebook: "",
};

export default function Settings() {
  const [form, setForm] = useState<Business>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "business")
          .maybeSingle();

        if (error) throw error;

        if (data?.value) {
          setForm({
            ...DEFAULTS,
            ...(data.value as Partial<Business>),
          });
        }
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateField = <K extends keyof Business>(
    key: K,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Save settings
  const save = async () => {
    setSaving(true);

    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          key: "business",
          value: form,
        });

      if (error) throw error;

      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const input =
    "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[color:var(--burgundy)] focus:ring-2 focus:ring-[color:var(--burgundy)]/20";

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-[color:var(--burgundy)]">
          Settings
        </h1>

        <p className="text-sm text-muted-foreground">
          Business information and site configuration.
        </p>
      </div>

      {/* Business Information */}
      <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div>
          <h2 className="font-display text-lg">
            Business information
          </h2>

          <p className="text-sm text-muted-foreground">
            Update the information displayed across your Blumora website.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name">
            <input
              value={form.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
              className={input}
            />
          </Field>

          <Field label="Contact email">
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              className={input}
            />
          </Field>

          <Field label="Phone">
            <input
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              className={input}
            />
          </Field>

          <Field label="Address">
            <input
              value={form.address}
              onChange={(e) =>
                updateField("address", e.target.value)
              }
              className={input}
            />
          </Field>

          <Field label="Instagram URL">
            <input
              value={form.instagram}
              onChange={(e) =>
                updateField("instagram", e.target.value)
              }
              placeholder="https://instagram.com/..."
              className={input}
            />
          </Field>

          <Field label="Facebook URL">
            <input
              value={form.facebook}
              onChange={(e) =>
                updateField("facebook", e.target.value)
              }
              placeholder="https://facebook.com/..."
              className={input}
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={saving}
            onClick={save}
            className="rounded-full bg-[color:var(--burgundy)] text-primary-foreground hover:bg-[color:var(--rose)]"
          >
            <Save className="mr-2 h-4 w-4" />

            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </section>

      {/* User Management */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg">
          User management
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Additional roles such as Editor, Inventory Manager, and
          Sales Staff can be enabled later. For now, Blumora has
          Admin and Customer roles.
        </p>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>

      {children}
    </label>
  );
}