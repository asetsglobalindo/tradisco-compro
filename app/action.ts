"use server";

import {cookies} from "next/headers";

export async function UpdateLangPreference(payload: string) {
  // Mutate data
  (await cookies()).set("lang", payload);
}

