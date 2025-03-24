
"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redirect to dashboard
    redirect("/dashboard");
  }, []);

  return <div>Redirecting to dashboard...</div>;
}
