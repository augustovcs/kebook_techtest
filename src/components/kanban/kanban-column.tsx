'use client';

import { type TaskWithProduct } from '@/types';
import { type TaskStage } from '@/generated/prisma/enums';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TASK_STAGE_ORDER } from '@/lib/constants';

interface KanbanColumnProps {
  stage: TaskStage;
  label: string;
  color: string;
  tasks: TaskWithProduct[];
  onMoveTask: (taskId: string, newStage: string) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  productId: string;
}

export function KanbanColumn({
  stage,
  label,
  color,
  tasks,
  onMoveTask,
  onDeleteTask,
  productId,
}: KanbanColumnProps) {
  const stageIndex = TASK_STAGE_ORDER.indexOf(stage);
  const canMovePrevious = stageIndex > 0;
  const canMoveNext = stageIndex < TASK_STAGE_ORDER.length - 1;

  return (
    <div className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden flex flex-col min-h-96">
      <div className={`${color} border-b border-zinc-700 p-4`}>
        <h3 className="font-semibold text-white mb-1">{label}</h3>
        <p className="text-xs text-zinc-400">{tasks.length} tarefas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-zinc-500 text-sm">Nenhuma tarefa</p>
          </div>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="bg-zinc-700 border-zinc-600 p-4 cursor-move hover:bg-zinc-700/80 transition-colors">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white text-sm line-clamp-2">
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>

                {task.responsible && (
                  <Badge variant="secondary" className="bg-zinc-600 text-white border-0 text-xs">
                    {task.responsible}
                  </Badge>
                )}

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {canMovePrevious && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onMoveTask(task.id, TASK_STAGE_ORDER[stageIndex - 1])
                        }
                        className="h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-600 hover:text-white"
                      >
                        <ChevronLeft size={16} />
                      </Button>
                    )}
                    {canMoveNext && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onMoveTask(task.id, TASK_STAGE_ORDER[stageIndex + 1])
                        }
                        className="h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-600 hover:text-white"
                      >
                        <ChevronRight size={16} />
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTask(task.id)}
                    className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
