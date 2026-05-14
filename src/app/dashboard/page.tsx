'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package, Zap } from 'lucide-react';
import { useDashboardStats } from '@/hooks/use-dashboard';


export default function DashboardPage() {
  const stats = useDashboardStats();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Bem-vindo ao Kebook Projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Experts"
          value={stats.data?.experts ?? 0}
          icon={Users}
          color="text-blue-400"
          bgColor="bg-blue-500/10"
        />
        <StatsCard
          title="Produtos"
          value={stats.data?.products ?? 0}
          icon={Package}
          color="text-cyan-400"
          bgColor="bg-cyan-500/10"
        />
        <StatsCard
          title="Tarefas"
          value={stats.data?.tasks ?? 0}
          icon={TrendingUp}
          color="text-amber-400"
          bgColor="bg-amber-500/10"
        />
        <StatsCard
          title="Gerações com IA"
          value={stats.data?.copies ?? 0}
          icon={Zap}
          color="text-purple-400"
          bgColor="bg-purple-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Ações Rápidas</CardTitle>
            <CardDescription>Acesse as funcionalidades principais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/dashboard/experts"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-700/50 hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <span className="text-white font-medium">Gerenciar Experts</span>
              <span className="text-zinc-400">→</span>
            </a>
            <a
              href="/dashboard/products"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-700/50 hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <span className="text-white font-medium">Criar Produto</span>
              <span className="text-zinc-400">→</span>
            </a>
            <a
              href="/dashboard/kanban"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-700/50 hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <span className="text-white font-medium">Visualizar Kanban</span>
              <span className="text-zinc-400">→</span>
            </a>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Sobre o Projeto</CardTitle>
            <CardDescription>Sistema profissional de gestão</CardDescription>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-3">
            <p>
              O sistema é completo para gerenciar infoprodutos digitais.
            </p>
            <p>
              Organize seus experts, produtos, tarefas e gere conteúdo com IA de forma profissional.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: any;
  color: string;
  bgColor: string;
}

function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-6 border border-zinc-700`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <Icon className={`${color} w-8 h-8`} />
      </div>
    </div>
  );
}
