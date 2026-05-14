'use client';

import { type TaskWithProduct } from '@/types';
import { type TaskStage } from '@/generated/prisma/enums';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TASK_STAGE_ORDER } from '@/lib/constants';

interface KanbanColumnProps {
  stage: TaskStage;
  label: string;
  color: string;
  tasks: TaskWithProduct[];
  onMoveTask: (taskId: string, newStage: TaskStage) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

export function KanbanColumn({
  stage,
  label,
  color,
  tasks,
  onMoveTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const stageIndex = TASK_STAGE_ORDER.indexOf(stage);

  const canMoveLeft = stageIndex > 0;
  const canMoveRight = stageIndex < TASK_STAGE_ORDER.length - 1;

  return (
    <div className="bg-zinc-800/50 rounded-xl border border-zinc-800 flex flex-col min-h-96 overflow-hidden">

      {/* HEADER */}
      <div className={`${color} border-b border-zinc-700 p-4`}>
        <h3 className="font-semibold text-white">{label}</h3>
        <p className="text-xs text-zinc-400">{tasks.length} tarefas</p>
      </div>

      {/* TASKS */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center">
            Nenhuma tarefa
          </p>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              className="bg-zinc-700 border-zinc-600 p-4"
            >
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  {task.title}
                </h4>

                {task.description && (
                  <p className="text-zinc-400 text-xs">
                    {task.description}
                  </p>
                )}

                {/* CONTROLES */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-1">
                    {canMoveLeft && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          onMoveTask(
                            task.id,
                            TASK_STAGE_ORDER[stageIndex - 1]
                          )
                        }
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft size={16} />
                      </Button>
                    )}

                    {canMoveRight && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          onMoveTask(
                            task.id,
                            TASK_STAGE_ORDER[stageIndex + 1]
                          )
                        }
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight size={16} />
                      </Button>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteTask(task.id)}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
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