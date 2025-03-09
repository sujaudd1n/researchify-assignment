import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export const ENDPOINT = "http://localhost:8000/api/v1/researchify/"
export const ENDPOINT = "https://api.sujauddin.me/api/v1/researchify/"

export async function get_resource(name) {
  try {
    const res = await fetch(ENDPOINT + name);
    if (!res.ok)
      return []
    const data = await res.json();
    const resource = data.data;
    return resource;
  }
  catch (err) {
    console.log(err)
    return [];
  }
}

export async function get_groups() {
  return await get_resource("groups");
}

export async function get_tasks() {
  return await get_resource("tasks");
}

export async function get_escalations() {
  return await get_resource("escalations");
}