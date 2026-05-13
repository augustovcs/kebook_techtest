'use client';

import { type ExpertWithProducts } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Trash2, ExternalLink } from 'lucide-react';

interface ExpertsTableProps {
  experts: ExpertWithProducts[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ExpertsTable({ experts, onDelete, isDeleting }: ExpertsTableProps) {
  if (experts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Nenhum expert encontrado</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-700 overflow-hidden">
      <Table className="bg-zinc-800">
        <TableHeader>
          <TableRow className="border-zinc-700 hover:bg-transparent">
            <TableHead className="text-zinc-300 font-semibold">Nome</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Nicho</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Contato</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Produtos</TableHead>
            <TableHead className="text-right text-zinc-300 font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experts.map((expert) => (
            <TableRow key={expert.id} className="border-zinc-700 hover:bg-zinc-700/50 transition-colors">
              <TableCell className="text-white font-medium">{expert.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                  {expert.niche}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-400">
                {expert.email ? (
                  <a
                    href={`mailto:${expert.email}`}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Mail size={16} />
                    {expert.email}
                  </a>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell className="text-zinc-300">{expert.products.length}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(expert.id)}
                  disabled={isDeleting}
                  className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
