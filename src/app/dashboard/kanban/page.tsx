'use client';

import { useState, useEffect } from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { useProducts } from '@/hooks/use-products';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreateTask } from '@/hooks/use-tasks';
import { TaskStage } from '@/generated/prisma/enums';
import { CardDescription } from '@/components/ui/card';




export default function KanbanPage() {

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const createTask = useCreateTask();

  const handleCreateTask = async (data: {
    title: string;
    description?: string;
    stage: TaskStage;
  }) => {
    await createTask.mutateAsync({
      title: data.title,
      description: data.description || '',
      stage: data.stage,
      productId: selectedProductId,
      responsible: '',
    });
  };
  const products = useProducts('', 1);
  const tasks = useTasks(selectedProductId);

  useEffect(() => {
    if (products.data?.data && products.data.data.length > 0 && !selectedProductId) {
      setSelectedProductId(products.data.data[0]?.id || '');
    }
  }, [products.data?.data, selectedProductId]);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Kanban</h1>
        <p className="text-zinc-400 mt-1">Acompanhe o progresso das tarefas</p>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-white font-medium">Selecione um produto:</label>
        {products.isLoading ? (
          <Skeleton className="h-10 w-64 bg-zinc-800" />
        ) : (
            <Select
            value={selectedProductId || ''}
            onValueChange={(value) => setSelectedProductId(value || '')}
            >
            <SelectTrigger className="w-64 bg-zinc-800 border-zinc-700 text-white">
                <SelectValue>
                {
                    products.data?.data?.find(
                    (product) => product.id === selectedProductId
                    )?.name || "Selecione um produto"
                }
                </SelectValue>
            </SelectTrigger>

            <SelectContent className="bg-zinc-950 border border-zinc-800 text-white rounded-xl">
                {products.data?.data?.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                    {product.name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        )}
      </div>

      {!selectedProductId ? (
        <div className="text-center py-12">
          <p className="text-zinc-400">Selecione um produto para visualizar as tarefas</p>
        </div>
      ) : tasks.isLoading ? (
        <div className="grid grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 bg-zinc-800" />
          ))}
        </div>
      ) : (
        <KanbanBoard tasks={tasks.data || []} 
        productId={selectedProductId} 
        onCreateTask={handleCreateTask}/>
      )}
    </div>
  );
}
