import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ENDPOINT = "http://localhost:8000/api/v1/"

export async function get_groups() {
  try {
    const res = await fetch(ENDPOINT + "groups");
    if (!res.ok)
      return []
    const data = await res.json();
    const groups = data.data;
    return groups;
  }
  catch (err) {
    console.log(err)
    return []
  }
}

export async function get_tasks() {
  try {
    const res = await fetch(ENDPOINT + "tasks");
    if (!res.ok)
      return []
    const data = await res.json();
    const tasks = data.data;
    return tasks;
  }
  catch (err) {
    console.log(err)
    return []
  }
}