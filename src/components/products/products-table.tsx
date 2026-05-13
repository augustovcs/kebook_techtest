'use client';

import { type ProductWithRelations } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye } from 'lucide-react';
import { PRODUCT_TYPES, PRODUCT_TYPE_COLORS } from '@/lib/constants';
import Link from 'next/link';

interface ProductsTableProps {
  products: ProductWithRelations[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ProductsTable({ products, onDelete, isDeleting }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-700 overflow-hidden">
      <Table className="bg-zinc-800">
        <TableHeader>
          <TableRow className="border-zinc-700 hover:bg-transparent">
            <TableHead className="text-zinc-300 font-semibold">Nome</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Tipo</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Expert</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Preço</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Tarefas</TableHead>
            <TableHead className="text-right text-zinc-300 font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const typeLabel = PRODUCT_TYPES[product.type as keyof typeof PRODUCT_TYPES] || product.type;
            const typeColors = PRODUCT_TYPE_COLORS[product.type] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

            return (
              <TableRow key={product.id} className="border-zinc-700 hover:bg-zinc-700/50 transition-colors">
                <TableCell className="text-white font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge className={typeColors}>{typeLabel}</Badge>
                </TableCell>
                <TableCell className="text-zinc-400">{product.expert.name}</TableCell>
                <TableCell className="text-white font-medium">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell className="text-zinc-400">{product.tasks.length}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/preview/product/${product.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                    >
                      <Eye size={16} />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                    disabled={isDeleting}
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
