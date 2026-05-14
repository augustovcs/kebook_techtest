'use client';

import { useEffect, useMemo, useState } from 'react';
import { useProducts } from '@/hooks/use-products';
import { useCopy, useGenerateCopy } from '@/hooks/use-copy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Sparkles, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function CopyPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const products = useProducts('', 1);
  const copyQuery = useCopy(selectedProductId);
  const generateCopy = useGenerateCopy();

  const selectedProduct = useMemo(
    () => products.data?.data.find((product) => product.id === selectedProductId),
    [products.data, selectedProductId]
  );

  useEffect(() => {
    if (!selectedProductId && products.data?.data?.length) {
      setSelectedProductId(products.data.data[0].id);
    }
  }, [products.data, selectedProductId]);

  const currentCopy = copyQuery.data;

  const benefits = useMemo(
    () => currentCopy?.benefits.split('|').map((benefit) => benefit.trim()).filter(Boolean) ?? [],
    [currentCopy?.benefits]
  );

  const faqItems = useMemo(
    () => currentCopy?.faq.split('|').map((item) => item.trim()).filter(Boolean) ?? [],
    [currentCopy?.faq]
  );

  const handleGenerate = async () => {
    if (!selectedProductId) {
      toast.error('Selecione um produto primeiro');
      return;
    }

    try {
      await generateCopy.mutateAsync(selectedProductId);
      toast.success('Copy gerada com sucesso');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao gerar copy com IA'
      );
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Geração de Copy</h1>
        <p className="text-zinc-400 mt-1">Crie copy de vendas automática com OpenAI e salve no banco.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 ">
                <div>
                  <CardTitle className='w-full text-white'>Produto</CardTitle>
                  <CardDescription>Selecione o produto que terá a copy gerada.</CardDescription>
                </div>
                <BookOpen className="text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex flex-col gap-3">
                {products.isLoading ? (
                  <Skeleton className="h-10 w-full bg-zinc-800" />
                ) : (
                  <Select
                    value={selectedProductId || ''}
                    onValueChange={(value) => setSelectedProductId(value || '')}
                  >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Selecione um produto">
                        {selectedProduct?.name || "Selecione um produto"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border border-zinc-800 text-white rounded-xl">
                      {products.data?.data.map((product) => (
                        <SelectItem key={product.id} value={product.id} className="text-white">
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {selectedProduct && (
                  <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
                    <p className="text-sm text-zinc-400">Expert</p>
                    <p className="text-white font-semibold">{selectedProduct.expert.name}</p>
                    <p className="text-sm text-zinc-400">Nicho: {selectedProduct.expert.niche}</p>
                    <p className="text-sm text-zinc-400">Público-alvo: {selectedProduct.targetAudience}</p>
                    <p className="text-sm text-zinc-400">Dor principal: {selectedProduct.mainPain}</p>
                    <p className="text-sm text-zinc-400">Transformação: {selectedProduct.promisedTransformation}</p>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={handleGenerate}
                    disabled={!selectedProductId || generateCopy.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                        {generateCopy.isPending ? 'Gerando copy...' : 'Gerar copy com IA'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyQuery.refetch()}
                    disabled={!selectedProductId || copyQuery.isFetching}
                    className="flex-1"
                  >
                    <RefreshCcw size={16} className="mr-2" />
                    Atualizar copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className='text-white'>Histórico</CardTitle>
              <CardDescription>Os dados são salvos automaticamente no banco.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {copyQuery.isLoading ? (
                <Skeleton className="h-72 bg-zinc-800" />
              ) : copyQuery.isError ? (
                <p className="text-zinc-400">Nenhuma copy armazenada para este produto.</p>
              ) : currentCopy ? (
                <div className="space-y-3 text-sm text-zinc-300">
                  <p className="text-white font-semibold">Última copy salva</p>
                  <p>{currentCopy.headline}</p>
                  <p>{currentCopy.subheadline}</p>
                </div>
              ) : (
                <p className="text-zinc-400">Selecione um produto e gere a copy para salvá-la automaticamente.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className='text-white'>Copy gerada</CardTitle>
                  <CardDescription>Veja o conteúdo pronto após a geração.</CardDescription>
                </div>
                <Sparkles className="text-cyan-400" />
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-0">
              {generateCopy.isPending ? (
                <div className="space-y-3">
                  <Skeleton className="h-6 bg-zinc-800" />
                  <Skeleton className="h-6 bg-zinc-800" />
                  <Skeleton className="h-52 bg-zinc-800" />
                </div>
              ) : currentCopy ? (
                <div className="space-y-6">
                  <section className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-400">Headline</p>
                    <h2 className="text-xl font-semibold text-white">{currentCopy.headline}</h2>
                  </section>

                  <section className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-400">Subheadline</p>
                    <p className="text-zinc-300">{currentCopy.subheadline}</p>
                  </section>

                  <section className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-400">Benefícios</p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-300">
                      {benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-400">Para quem é</p>
                    <p className="text-zinc-300">{currentCopy.audience}</p>
                  </section>

                  <section className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-400">CTA</p>
                    <p className="text-zinc-300 font-semibold">{currentCopy.cta}</p>
                  </section>

                  <section className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-400">FAQ</p>
                    <div className="space-y-2 text-zinc-300">
                      {faqItems.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  </section>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-zinc-500">
                  Selecione um produto e gere a copy para ver o resultado aqui.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
