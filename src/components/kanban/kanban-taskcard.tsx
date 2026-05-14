'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, GripVertical } from 'lucide-react';
import { type TaskWithProduct } from '@/types';

interface TaskCardProps {
  task: TaskWithProduct;
  onDeleteTask: (taskId: string) => void;
}

export function TaskCard({ task, onDeleteTask }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
      }}
      className={`
        p-4 mb-3 bg-zinc-800 border border-zinc-700
        transition
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex gap-2">
        {/* 🔥 HANDLE (SÓ AQUI ARRASRA) */}
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing p-1 opacity-60 hover:opacity-100"
        >
          <GripVertical size={16} />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h4 className="text-white text-sm font-medium">
            {task.title}
          </h4>

          {task.description && (
            <p className="text-zinc-400 text-xs">
              {task.description}
            </p>
          )}

          <div className="flex justify-between mt-2">
            {task.responsible ? (
              <Badge className="text-xs bg-zinc-700 text-zinc-200">
                {task.responsible}
              </Badge>
            ) : (
              <div />
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
              className="h-7 w-7 p-0 text-red-400"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}