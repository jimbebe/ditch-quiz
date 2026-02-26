"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

function AdminContent() {
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

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  );
}
