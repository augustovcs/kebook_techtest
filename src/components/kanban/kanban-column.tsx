'use client';

import { type TaskWithProduct } from '@/types';
import { type TaskStage } from '@/generated/prisma/enums';
import { useDroppable } from '@dnd-kit/core';
import { TASK_STAGE_ORDER } from '@/lib/constants';
import { TaskCard } from './kanban-taskcard';

interface KanbanColumnProps {
  stage: TaskStage;
  label: string;
  color: string;
  tasks: TaskWithProduct[];
  onDeleteTask: (taskId: string) => Promise<void>;
}

export function KanbanColumn({
  stage,
  label,
  color,
  tasks,
  onDeleteTask,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-zinc-800/50 rounded-lg border border-zinc-700 flex flex-col min-h-96"
    >
      <div className={`${color} border-b border-zinc-700 p-4`}>
        <h3 className="font-semibold text-white">{label}</h3>
        <p className="text-xs text-zinc-400">{tasks.length} tarefas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tasks.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-8">
            Nenhuma tarefa
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}