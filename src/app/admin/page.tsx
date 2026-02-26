"use client";

import { useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  if (!password) {
    return <AdminLogin onLogin={setPassword} />;
  }

  return (
    <AdminDashboard password={password} onLogout={() => setPassword(null)} />
  );
}
