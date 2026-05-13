'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { expertSchema, type ExpertInput } from '@/schemas/expert.schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Loader } from 'lucide-react';
import { toast } from 'sonner';

interface ExpertEditProps {
  expert: {
    id: string;
    name: string;
    niche: string;
    email?: string;
    instagram?: string;
    youtube?: string;
    notes?: string;
  };
  onSubmit: (id: string, data: ExpertInput) => Promise<void>;
  isLoading?: boolean;
}

export function ExpertEdit({
  expert,
  onSubmit,
  isLoading,
}: ExpertEditProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpertInput>({
    resolver: zodResolver(expertSchema),
    defaultValues: {
      name: expert.name,
      niche: expert.niche,
      email: expert.email || '',
      instagram: expert.instagram || '',
      youtube: expert.youtube || '',
      notes: expert.notes || '',
    },
  });

  const onSubmitHandler = async (data: ExpertInput) => {
    try {
      await onSubmit(expert.id, data);
      setOpen(false);
    } catch (error) {
      toast.error('Erro ao atualizar expert');
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Editar Expert</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <Input
              {...register('name')}
              placeholder="Nome do expert"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nicho</label>
            <Input
              {...register('niche')}
              placeholder="ex: Marketing Digital"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
            {errors.niche && <p className="text-red-400 text-sm mt-1">{errors.niche.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <Input
              {...register('email')}
              type="email"
              placeholder="contato@example.com"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <Input
              {...register('instagram')}
              placeholder="@usuario"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">YouTube</label>
            <Input
              {...register('youtube')}
              placeholder="https://youtube.com/..."
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <Textarea
              {...register('notes')}
              placeholder="Anotações sobre o expert"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500 min-h-20"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading && <Loader className="animate-spin" size={16} />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
