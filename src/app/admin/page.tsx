import Link from "next/link";
import { ArrowLeftIcon, LockKeyholeIcon } from "lucide-react";

import { AdminWorkEditor } from "@/components/admin-work-editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Card className="bg-card/70">
            <CardHeader>
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <LockKeyholeIcon className="size-5" />
              </div>
              <CardTitle className="font-display text-4xl">Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <form action="/admin" className="flex flex-col gap-4" method="get">
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Entry code
                  <input
                    autoComplete="current-password"
                    className="h-11 rounded-full border border-input bg-background/60 px-4 text-base outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    name="code"
                    placeholder="Enter code"
                    type="password"
                  />
                </label>
                <button
                  className={buttonVariants({ className: "w-fit rounded-full" })}
                  type="submit"
                >
                  Open editor
                </button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
