import { ReactNode } from "react";
import Link from "next/link";
import { Home, Users, Package, Kanban, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-zinc-900">
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Kebook</span>
            <span className="text-blue-500"> Projects</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            href="/dashboard/experts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Users size={20} />
            <span className="font-medium">Experts</span>
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Package size={20} />
            <span className="font-medium">Produtos</span>
          </Link>

          <Link
            href="/dashboard/kanban"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Kanban size={20} />
            <span className="font-medium">Kanban</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Configurações</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
