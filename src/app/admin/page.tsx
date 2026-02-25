"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState<string | null>(null);
  const directAccess = searchParams.has("login");

  if (!password) {
    return <AdminLogin onLogin={setPassword} directAccess={directAccess} />;
  }

  return (
    <AdminDashboard password={password} onLogout={() => setPassword(null)} />
  );
}
