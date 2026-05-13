'use client';

import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PRODUCT_TYPES, PRODUCT_TYPE_COLORS } from '@/lib/constants';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ProductPreviewProps {
  params: Promise<{ id: string }>;
}

export default function ProductPreviewPage({ params }: ProductPreviewProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const paramId = (params as any).id;

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', paramId],
    queryFn: () => productsApi.get(paramId),
    enabled: !!paramId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 bg-gray-200" />
          <Skeleton className="h-6 bg-gray-200 w-2/3" />
          <Skeleton className="h-40 bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Produto não encontrado</h1>
          <p className="text-gray-600 mt-2">O produto que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  const faqItems = product.copy?.faq
    ? product.copy.faq.split('|').map((item) => {
        const [question, answer] = item.split('R:');
        return {
          q: question.replace('P:', '').trim(),
          a: answer?.trim() || '',
        };
      })
    : [];

  const benefits = product.copy?.benefits
    ? product.copy.benefits.split('|').map((b) => b.trim())
    : [];

  const typeLabel = PRODUCT_TYPES[product.type as keyof typeof PRODUCT_TYPES] || product.type;
  const typeColors = PRODUCT_TYPE_COLORS[product.type] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white border-b">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-gray-900">Kebook</span>
            <span className="text-blue-600"> Preview</span>
          </div>
          <a
            href="/dashboard/products"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Voltar ao Dashboard
          </a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={typeColors}>{typeLabel}</Badge>
            <span className="text-sm text-gray-600">por {product.expert.name}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {product.copy?.headline || product.name}
          </h1>

          <p className="text-2xl text-gray-600 mb-8">
            {product.copy?.subheadline || product.promisedTransformation}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg">
              {product.copy?.cta || 'Obter Acesso Agora'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-900 border-gray-300 hover:bg-gray-50"
            >
              Saiba Mais
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-gray-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-gray-600 mt-2">Investimento para transformação</p>
          </div>
        </div>

        <div className="py-20 border-y">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">O que você vai conseguir</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Para quem é este {typeLabel}?</h2>
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed">
              {product.copy?.audience || product.targetAudience}
            </p>
          </div>
        </div>

        {faqItems.length > 0 && (
          <div className="py-20 border-t">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Perguntas Frequentes</h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaqId(openFaqId === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 text-left">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${
                        openFaqId === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openFaqId === index && (
                    <div className="px-6 pb-6 text-gray-700 border-t border-gray-200">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="py-20 bg-blue-600 rounded-xl text-white text-center -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Não deixe mais esta oportunidade passar. Transforme sua vida agora.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold"
          >
            {product.copy?.cta || 'Obter Acesso Agora'}
          </Button>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 {product.expert.name}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
