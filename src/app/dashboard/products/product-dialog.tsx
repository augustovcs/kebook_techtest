'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductInput } from '@/schemas/product.schema';
import { useExpertsList } from '@/hooks/use-experts';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { PRODUCT_TYPE_OPTIONS } from '@/lib/constants';

interface ProductDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: ProductInput) => Promise<void>;
  isLoading?: boolean;
}

export function ProductDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: ProductDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const { data: experts } = useExpertsList();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      type: 'COURSE',
      price: 0,
      targetAudience: '',
      mainPain: '',
      promisedTransformation: '',
      notes: '',
      expertId: '',
    },
  });

  const onSubmitHandler = async (data: ProductInput) => {
    try {
      await onSubmit(data);
      reset();
      setOpen(false);
    } catch (error) {
      toast.error('Erro ao criar produto');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus size={20} />
          Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Criar Novo Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <Input
                {...register('name')}
                placeholder="Nome do produto"
                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <Select
                value={watch('type')}
                onValueChange={(value) => setValue('type', value as any)}
              >
                <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-700 border-zinc-600">
                  {PRODUCT_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Preço (R$)</label>
              <Input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
              />
              {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Expert</label>
              <Select
                value={watch('expertId')}
                onValueChange={(value) => setValue('expertId', value)}
              >
                <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                  <SelectValue placeholder="Selecione um expert" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-700 border-zinc-600">
                  {experts?.map((expert) => (
                    <SelectItem key={expert.id} value={expert.id} className="text-white">
                      {expert.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.expertId && (
                <p className="text-red-400 text-sm mt-1">{errors.expertId.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Público-Alvo</label>
            <Input
              {...register('targetAudience')}
              placeholder="Descreva o público-alvo"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
            {errors.targetAudience && (
              <p className="text-red-400 text-sm mt-1">{errors.targetAudience.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dor Principal</label>
            <Textarea
              {...register('mainPain')}
              placeholder="Qual é o principal problema que seu produto resolve?"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
            {errors.mainPain && (
              <p className="text-red-400 text-sm mt-1">{errors.mainPain.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Transformação Prometida</label>
            <Textarea
              {...register('promisedTransformation')}
              placeholder="O que o cliente vai conseguir com seu produto?"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
            />
            {errors.promisedTransformation && (
              <p className="text-red-400 text-sm mt-1">{errors.promisedTransformation.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <Textarea
              {...register('notes')}
              placeholder="Anotações sobre o produto"
              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
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
              Criar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
