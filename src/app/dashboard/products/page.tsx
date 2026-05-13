'use client';

import { useState } from 'react';
import { useProducts, useCreateProduct, useDeleteProduct } from '@/hooks/use-products';
import { ProductsTable } from '@/components/products/products-table';
import { ProductDialog } from '@/components/products/product-dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error } = useProducts(search, page);
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const handleCreate = async (formData: any) => {
    try {
      await createProduct.mutateAsync(formData);
      toast.success('Produto criado com sucesso');
      setDialogOpen(false);
    } catch (error) {
      toast.error('Erro ao criar produto');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success('Produto deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar produto');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Produtos</h1>
        <p className="text-zinc-400 mt-1">Gerencie seus infoprodutos</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
          <Input
            placeholder="Buscar por nome ou tipo..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>
        <ProductDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleCreate}
          isLoading={createProduct.isPending}
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 bg-zinc-800" />
          <Skeleton className="h-12 bg-zinc-800" />
          <Skeleton className="h-12 bg-zinc-800" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-zinc-400">Erro ao carregar produtos</p>
        </div>
      ) : data ? (
        <>
          <ProductsTable
            products={data.data}
            onDelete={handleDelete}
            isDeleting={deleteProduct.isPending}
          />
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <span className="text-zinc-400">
                Página {page} de {data.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(Math.min(data.totalPages, page + 1))}
                disabled={page === data.totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
