import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { AdminWorkEditor } from "@/components/admin-work-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminPageProps = {
  searchParams: Promise<{
    code?: string | string[];
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const code = Array.isArray(params.code) ? params.code[0] : params.code;
  const isUnlocked = code === "malaka";

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Button
          className="w-fit rounded-full"
          nativeButton={false}
          render={<Link href="/" />}
          variant="outline"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Back
        </Button>

        {isUnlocked ? (
          <AdminWorkEditor />
        ) : (
          <form
            action="/admin"
            className="mx-auto flex w-full max-w-sm items-center gap-3 pt-24"
            method="get"
          >
            <label className="sr-only" htmlFor="admin-code">
              Enter code
            </label>
            <Input
              autoComplete="current-password"
              className="h-12 rounded-full px-5 text-base"
              id="admin-code"
              name="code"
              placeholder="Enter code"
              type="password"
            />
            <Button className="h-12 rounded-full px-5" type="submit">
              Enter
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
