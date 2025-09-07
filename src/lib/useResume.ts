"use client";

import { useEffect, useState } from "react";

export type ResumeHookData = {
  education: { school: string; degree?: string; graduation?: string; location?: string }[];
  experience: { company: string; role?: string; duration?: string; location?: string }[];
  projects: { title: string; stack?: string[]; description?: string }[];
  skills: string[];
  certifications: string[];
} | null;

export function useResumeData() {
  const [data, setData] = useState<ResumeHookData>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/resume")
      .then((r) => r.json())
      .then((res) => {
        if (!mounted) return;
        if (res?.ok) setData(res.data);
        else setError(res?.error ?? "Failed to load resume data");
      })
      .catch(() => mounted && setError("Failed to load resume data"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}


