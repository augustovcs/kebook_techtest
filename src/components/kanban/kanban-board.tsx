'use client';

import { useState } from 'react';
import { type TaskWithProduct } from '@/types';
import { type TaskStage } from '@/generated/prisma/enums';
import { TASK_STAGES, TASK_STAGE_ORDER, STAGE_COLORS } from '@/lib/constants';
import { useMoveTask, useDeleteTask } from '@/hooks/use-tasks';
import { KanbanColumn } from './kanban-column';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { DndContext, DragEndEvent } from '@dnd-kit/core';

interface KanbanBoardProps {
  tasks: TaskWithProduct[];
  productId: string;
  onCreateTask: (data: {
    title: string;
    description?: string;
    stage: TaskStage;
  }) => Promise<void>;
}

export function KanbanBoard({
  tasks,
  productId,
  onCreateTask,
}: KanbanBoardProps) {
  const moveTask = useMoveTask();
  const deleteTask = useDeleteTask();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStage, setSelectedStage] = useState<TaskStage>('TODO');

  const tasksByStage = TASK_STAGE_ORDER.reduce((acc, stage) => {
    acc[stage] = tasks.filter((task) => task.stage === stage);
    return acc;
  }, {} as Record<string, TaskWithProduct[]>);

  // 🔥 MOVE TASK (backend)
  const handleMoveTask = async (taskId: string, newStage: TaskStage) => {
    try {
      await moveTask.mutateAsync({
        id: taskId,
        stage: newStage,
      });

      toast.success('Tarefa movida');
    } catch {
      toast.error('Erro ao mover tarefa');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask.mutateAsync(taskId);
      toast.success('Tarefa deletada');
    } catch {
      toast.error('Erro ao deletar tarefa');
    }
  };

  // 🔥 DRAG END (DnD KIT)
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStage = over.id as TaskStage;

    if (!taskId || !newStage) return;

    await handleMoveTask(taskId, newStage);
  };

  const handleCreate = async () => {
    if (!title.trim()) return;

    await onCreateTask({
      title,
      description: description ?? '',
      stage: selectedStage,
    });

    setTitle('');
    setDescription('');
    setOpen(false);
  };

  const columns = TASK_STAGE_ORDER.map((stage) => ({
    stage,
    label: TASK_STAGES[stage],
    color: STAGE_COLORS[stage],
    tasks: tasksByStage[stage] || [],
  }));

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="space-y-4">

        {/* BUTTON */}
        <div className="flex justify-end">
          <Button onClick={() => setOpen(true)}>
            + Nova tarefa
          </Button>
        </div>

        {/* BOARD */}
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

        {/* MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Nova tarefa</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <Input
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-zinc-700 border-zinc-600"
              />

              <Textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-zinc-700 border-zinc-600"
              />

              <select
                value={selectedStage}
                onChange={(e) =>
                  setSelectedStage(e.target.value as TaskStage)
                }
                className="w-full bg-zinc-700 border border-zinc-600 p-2 rounded"
              >
                {TASK_STAGE_ORDER.map((stage) => (
                  <option key={stage} value={stage}>
                    {TASK_STAGES[stage]}
                  </option>
                ))}
              </select>

              <Button onClick={handleCreate} className="w-full">
                Criar tarefa
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </DndContext>
  );
}