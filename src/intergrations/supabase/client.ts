import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing VITE_SUPABASE_URL environment variable");
}

if (!supabaseKey) {
  throw new Error("Missing VITE_SUPABASE_PUBLISHABLE_KEY environment variable");
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey
);

export async function isGoogleProviderEnabled() {
  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/auth/v1/settings`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Could not check Google sign-in availability (HTTP ${response.status}).`
    );
  }

  const settings: unknown = await response.json();
  if (
    typeof settings !== "object" ||
    settings === null ||
    !("external" in settings)
  ) {
    throw new Error("Supabase returned invalid authentication settings.");
  }

  const external = settings.external;
  if (
    typeof external !== "object" ||
    external === null ||
    !("google" in external) ||
    typeof external.google !== "boolean"
  ) {
    throw new Error("Supabase returned invalid Google provider settings.");
  }

  return external.google;
}