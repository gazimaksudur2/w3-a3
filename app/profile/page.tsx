import { redirect } from "next/navigation";
import { sessionAction } from "../lib/server-auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await sessionAction();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-10 text-navy dark:text-white">
      <section className="mx-auto max-w-3xl rounded-lg bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 border-b border-gray-200 pb-6 sm:flex-row sm:items-center dark:border-gray-700">
          <img
            src={user?.avatar}
            alt={`${user?.name}'s profile`}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-text-secondary">Profile</p>
            <h1 className="mt-1 text-3xl font-semibold">{user?.name}</h1>
            <p className="mt-1 text-text-secondary">{user?.email}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-text-secondary">User ID</dt>
            <dd className="mt-1 text-lg">{user?.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-text-secondary">Role</dt>
            <dd className="mt-1 text-lg capitalize">{user?.role}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-text-secondary">Email address</dt>
            <dd className="mt-1 text-lg break-all">{user?.email}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
