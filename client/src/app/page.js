import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4 bg-slate-200 text-black">
      <h1 className="text-4xl font-bold">sCRUD </h1>
      <p className="text-lg">
        A simple CRUD app to manage your tasks.
      </p>
      <Link
        href="/login"
        className="px-4 py-2 bg-slate-300 border-b-2 text-black rounded-2xl"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="px-4 py-2 bg-slate-300 border-b-2 text-black rounded-2xl"
      >
        Register
      </Link>
    </main>
  );
}
