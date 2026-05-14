'use client';

import { useState, use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, ChevronDown, ArrowLeft } from 'lucide-react';
import { PRODUCT_TYPES, PRODUCT_TYPE_COLORS } from '@/lib/constants';

interface ProductPreviewPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPreviewPage({
  params,
}: ProductPreviewPageProps) {
  const { id } = use(params);

  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.get(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <Skeleton className="h-12 bg-zinc-800" />
          <Skeleton className="h-7 w-3/4 bg-zinc-800" />
          <Skeleton className="h-72 bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold">Produto não encontrado</h1>
          <p className="text-zinc-400 mt-4">Verifique se o produto existe e tente novamente.</p>
        </div>
      </div>
    );
  }

  const benefits = product.copy?.benefits
    ? product.copy.benefits.split('|').map((item) => item.trim()).filter(Boolean)
    : [];

  const faqItems = product.copy?.faq
    ? product.copy.faq.split('|').map((item) => item.trim()).filter(Boolean)
    : [];

  const typeLabel = PRODUCT_TYPES[product.type as keyof typeof PRODUCT_TYPES] || product.type;
  const typeColors = PRODUCT_TYPE_COLORS[product.type] || 'bg-zinc-800 text-zinc-300 border-zinc-700';

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-400">Preview de Landing</p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2">Página de vendas - preview</h1>
          </div>
          <a
            href="/dashboard/products"
            className="inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-200 hover:bg-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <section className="rounded-[32px] border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-blue-200">
                <span>{typeLabel}</span>
              </div>
              <h2 className="text-5xl font-bold leading-tight text-white">{product.copy?.headline || product.name}</h2>
              <p className="mt-4 max-w-2xl text-lg text-zinc-300">{product.copy?.subheadline || product.promisedTransformation}</p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Investimento</p>
              <p className="mt-4 text-4xl font-semibold text-white">R$ {product.price.toFixed(2).replace('.', ',')}</p>
              <p className="text-sm text-zinc-400 mt-1">Preço exibido no preview</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              {product.copy?.cta || 'Quero acesso agora'}
            </Button>
            <Button variant="outline" size="lg" className="text-blue-300 border-blue-500/20 hover:bg-blue-500/10">
              Saiba como funciona
            </Button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-semibold text-white">Sobre o expert</h3>
              <p className="mt-4 text-zinc-300">
                {product.expert.name} é especialista em {product.expert.niche} e ajuda a criar produtos digitais que convertem.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-semibold text-white">Transformação prometida</h3>
              <p className="mt-4 text-zinc-300">{product.promisedTransformation}</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-semibold text-white">Para quem é</h3>
              <p className="mt-4 text-zinc-300">{product.copy?.audience || product.targetAudience}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-semibold text-white">Benefícios</h3>
              <div className="mt-6 grid gap-4">
                {benefits.length > 0 ? (
                  benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="mt-1 text-blue-400">•</span>
                      <p className="text-zinc-300">{benefit}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400">Sem benefícios gerados ainda. Depois de gerar copy, eles aparecerão aqui.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-semibold text-white">Headline</h3>
              <p className="mt-4 text-zinc-300">{product.copy?.headline || 'Título principal do produto'}</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-semibold text-white">Subheadline</h3>
              <p className="mt-4 text-zinc-300">{product.copy?.subheadline || 'Frase de apoio que reforça a promessa.'}</p>
            </div>
          </div>
        </section>

        {faqItems.length > 0 && (
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
            <h3 className="text-2xl font-semibold text-white">Perguntas Frequentes</h3>
            <div className="mt-6 space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="rounded-3xl border border-zinc-800 bg-zinc-950/80">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(openFaqId === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-white hover:bg-zinc-900"
                  >
                    <span className="font-semibold">{item}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform ${openFaqId === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaqId === index && (
                    <div className="px-6 pb-6 text-zinc-300">
                      {item}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
