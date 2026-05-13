'use client';

import { useState } from 'react';
import { useExperts, useCreateExpert, useDeleteExpert } from '@/hooks/use-experts';
import { ExpertsTable } from '@/components/experts/experts-table';
import { ExpertDialog } from '@/components/experts/expert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function ExpertsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error } = useExperts(search, page);
  const createExpert = useCreateExpert();
  const deleteExpert = useDeleteExpert();

  const handleCreate = async (formData: any) => {
    try {
      await createExpert.mutateAsync(formData);
      toast.success('Expert criado com sucesso');
      setDialogOpen(false);
    } catch (error) {
      toast.error('Erro ao criar expert');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpert.mutateAsync(id);
      toast.success('Expert deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar expert');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Experts</h1>
        <p className="text-zinc-400 mt-1">Gerencie seus especialistas</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
          <Input
            placeholder="Buscar por nome, nicho ou email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>
        <ExpertDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleCreate}
          isLoading={createExpert.isPending}
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
          <p className="text-zinc-400">Erro ao carregar experts</p>
        </div>
      ) : data ? (
        <>
          <ExpertsTable
            experts={data.data}
            onDelete={handleDelete}
            isDeleting={deleteExpert.isPending}
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
