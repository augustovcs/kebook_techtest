'use client';

import { type TaskWithProduct } from '@/types';
import { TASK_STAGES, TASK_STAGE_ORDER, STAGE_COLORS } from '@/lib/constants';
import { useMoveTask, useDeleteTask } from '@/hooks/use-tasks';
import { KanbanColumn } from './kanban-column';
import { toast } from 'sonner';

interface KanbanBoardProps {
  tasks: TaskWithProduct[];
  productId: string;
}

export function KanbanBoard({ tasks, productId }: KanbanBoardProps) {
  const moveTask = useMoveTask();
  const deleteTask = useDeleteTask();

  const tasksByStage = TASK_STAGE_ORDER.reduce(
    (acc, stage) => {
      acc[stage] = tasks.filter((task) => task.stage === stage);
      return acc;
    },
    {} as Record<string, TaskWithProduct[]>
  );

  const handleMoveTask = async (taskId: string, newStage: string) => {
    try {
      await moveTask.mutateAsync({ id: taskId, stage: newStage });
      toast.success('Tarefa movida com sucesso');
    } catch (error) {
      toast.error('Erro ao mover tarefa');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask.mutateAsync(taskId);
      toast.success('Tarefa deletada com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar tarefa');
    }
  };

  const columns = TASK_STAGE_ORDER.map((stage) => ({
    stage,
    label: TASK_STAGES[stage],
    color: STAGE_COLORS[stage],
    tasks: tasksByStage[stage] || [],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.stage}
          stage={column.stage}
          label={column.label}
          color={column.color}
          tasks={column.tasks}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
          productId={productId}
        />
      ))}
    </div>
  );
}
