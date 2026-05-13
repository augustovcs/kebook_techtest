import Link from "next/link";
import { ArrowRight, BookOpen, BarChart3, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      <header className="border-b border-zinc-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-white">Kebook</span>
            <span className="text-blue-500"> Projects</span>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            Entrar no Dashboard
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Sistema Profissional de Gestão de Infoprodutos
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Organize experts, produtos, tarefas e gere conteúdo com IA. Tudo em um só lugar.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Começar Agora
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-8">
              <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Gerenciar Experts</h3>
              <p className="text-zinc-400">
                Cadastre e organize seus especialistas com nichos, contatos e anotações
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-8">
              <BarChart3 className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Produtos</h3>
              <p className="text-zinc-400">
                Crie produtos com informações de preço, público-alvo e transformação prometida
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-8">
              <Zap className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">IA Integrada</h3>
              <p className="text-zinc-400">
                Gere headlines, copywriting e conteúdo profissional com OpenAI
              </p>
            </div>
          </div>

          <div className="mt-20 bg-zinc-800/30 border border-zinc-700 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Fluxo de Trabalho</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Experts</h4>
                <p className="text-sm text-zinc-400">Organize seus criadores</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Produtos</h4>
                <p className="text-sm text-zinc-400">Crie infoprodutos</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Kanban</h4>
                <p className="text-sm text-zinc-400">Acompanhe tarefas</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  4
                </div>
                <h4 className="font-semibold mb-2">Preview</h4>
                <p className="text-sm text-zinc-400">Visualize landing page</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500">
        <p>Augusto Berriel © 2026. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
