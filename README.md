# Kebook - Teste Tech

Sistema completo para gestão e escala de infoprodutos digitais, com organização de experts, produtos e tarefas em um fluxo estruturado. Inclui integração com inteligência artificial para geração de conteúdo e automação de processos.

## Características

- 🎯 **Gestão de Experts**: Cadastro e organização de especialistas com nichos, redes sociais e contatos
- 📦 **Gerenciamento de Produtos**: Crie infoprodutos com preço, público-alvo e transformação prometida
- 📋 **Kanban Board**: Acompanhe tarefas em 6 estágios de produção
- 🤖 **Integração com OpenAI**: Gere copies profissionais com IA
- 🎨 **Landing Page Preview**: Visualize como será a página de vendas do seu produto
- 📊 **Dashboard**: Visão geral de experts, produtos e tarefas
- 🎯 **Tipagem Forte**: TypeScript completo com Zod para validações
- 💾 **Banco de Dados**: SQLite com Prisma ORM

## Stack Técnico

### Frontend
- **Next.js 16** - App Router com React 19
- **TypeScript** - Tipagem completa
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de alta qualidade
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Fetch e cache de dados
- **Zustand** - Estado global simples
- **Lucide React** - Ícones
- **Sonner** - Notificações toast

### Backend
- **Next.js Route Handlers** - API REST
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados leve
- **OpenAI API** - Geração de conteúdo com IA
- **Zod** - Validação de schemas

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Chave da API OpenAI

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd KebookTechCode
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente(cria um novo arquivo chamado `.env` com base no `.env.example`):
```bash
cp .env.example .env
```

4. Configure o arquivo `.env`:
```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="SUA CHAVE DA OPEN API"
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate deploy
```

6. (Opcional) Gere o cliente Prisma:
```bash
npx prisma generate
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Produção
```bash
npm run build
npm start
```

## Estrutura do Projeto

```
src/
├── app/                      # Next.js App Router
│   ├── dashboard/           # Dashboard principal
│   │   ├── page.tsx         # Home do dashboard
│   │   ├── experts/         # Gestão de experts
│   │   ├── products/        # Gestão de produtos
│   │   ├── kanban/          # Kanban board
│   │   └── layout.tsx       # Layout com sidebar
│   ├── preview/             # Páginas públicas
│   │   └── product/[id]/    # Preview de produto
│   ├── api/                 # Route handlers
│   │   ├── experts/         # API de experts
│   │   ├── products/        # API de produtos
│   │   ├── tasks/           # API de tarefas
│   │   └── copy/            # API de copy com IA
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Layout raiz
│   └── globals.css          # Estilos globais
├── components/              # Componentes React
│   ├── ui/                  # Componentes shadcn/ui
│   ├── experts/             # Componentes de experts
│   ├── products/            # Componentes de produtos
│   └── kanban/              # Componentes de kanban
├── features/                # Funcionalidades específicas
├── services/                # Serviços (API, OpenAI)
├── repositories/            # Acesso a dados (Prisma)
├── schemas/                 # Validações Zod
├── hooks/                   # Custom React hooks
├── lib/                     # Utilitários
├── types/                   # Tipos TypeScript
├── providers/               # Provedores de contexto
└── prisma/                  # Configuração Prisma
    ├── schema.prisma        # Schema do banco
    └── migrations/          # Migrations

```

## Banco de Dados

### Modelos

**Expert**
- id: String (PK)
- name: String
- niche: String
- instagram: String
- youtube: String
- email: String
- notes: String
- createdAt: DateTime

**Product**
- id: String (PK)
- name: String
- type: ProductType (COURSE, EBOOK, MENTORSHIP, CONSULTING, COMMUNITY)
- price: Float
- targetAudience: String
- mainPain: String
- promisedTransformation: String
- notes: String
- expertId: String (FK)
- createdAt: DateTime

**Task**
- id: String (PK)
- title: String
- description: String
- stage: TaskStage (MARKET_ANALYSIS, COPY, DESIGN, DEVELOPMENT, REVIEW, PUBLISHED)
- responsible: String
- productId: String (FK)
- createdAt: DateTime

**Copy**
- id: String (PK)
- headline: String
- subheadline: String
- benefits: String (separados por |)
- audience: String
- cta: String
- faq: String (formatado como P: pergunta? R: resposta)
- productId: String (FK unique)
- createdAt: DateTime

## API Endpoints

### Experts
- `GET /api/experts` - Lista experts com busca e paginação
- `GET /api/experts?all=true` - Lista simples de experts
- `GET /api/experts/:id` - Detalhes do expert
- `POST /api/experts` - Criar expert
- `PUT /api/experts/:id` - Atualizar expert
- `DELETE /api/experts/:id` - Deletar expert

### Products
- `GET /api/products` - Lista produtos com busca e paginação
- `GET /api/products/:id` - Detalhes do produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Tasks
- `GET /api/tasks` - Lista tarefas com filtro por produto
- `POST /api/tasks` - Criar tarefa
- `PUT /api/tasks/:id` - Atualizar tarefa
- `PATCH /api/tasks/:id` - Mover tarefa entre estágios
- `DELETE /api/tasks/:id` - Deletar tarefa

### Copy
- `GET /api/copy?productId=:id` - Obter copy de um produto
- `POST /api/copy/generate` - Gerar copy com IA

## Decisões Técnicas

### Por que Next.js?
- App Router mais moderno e escalável
- Server Components para performance
- Route Handlers como API REST integrada
- Suporte nativo a TypeScript
- Deploy simples em Vercel ou auto-hospedado

### Por que Prisma?
- Type-safe, gera tipos automaticamente
- Migrations versionadas
- Suporte a SQLite, PostgreSQL, MySQL
- Dev experience excelente

### Por que SQLite?
- Sem dependências externas
- Arquivo único e portável
- Excelente para MVP e prototipagem
- Fácil migration para PostgreSQL/MySQL

### Por que TanStack Query?
- Sincronização de dados automática
- Cache inteligente
- Retry automático
- Otimista updates
- Dev Tools excelentes

### Por que Zod?
- Validação e parsing em TypeScript
- Type inference automático
- Mensagens de erro customizáveis
- Integração com React Hook Form

## Performance

- Server Components para reduzir JavaScript no cliente
- Lazy loading de componentes
- Otimização de imagens com Next.js Image
- Caching inteligente com TanStack Query
- Minificação automática

## Segurança

- Chave OpenAI nunca exposta no frontend
- CORS headers apropriados
- Validação de entrada com Zod
- Proteção contra XSS com React
- CSRF tokens em formulários (implementar em produção)

## Melhorias Futuras

- [ ] Autenticação e autorização (NextAuth.js)
- [ ] Múltiplos usuários com permissões
- [ ] Drag and drop no Kanban
- [ ] Histórico de versões de copies
- [ ] Agendamento de tarefas
- [ ] Integração com Google Analytics
- [ ] Webhooks para automações
- [ ] Exportação de dados (PDF, CSV)
- [ ] Temas customizáveis
- [ ] PWA com offline support
- [ ] Notifications em tempo real com WebSockets
- [ ] Rate limiting na API
- [ ] Logging e monitoring
- [ ] Testes automatizados
- [ ] Documentação OpenAPI/Swagger

## Troubleshooting

### Erro de conexão com OpenAI
- Verifique se `OPENAI_API_KEY` está configurada
- Confirme se a chave é válida no console da OpenAI
- Verifique limites de requisições

### Erro ao conectar no banco de dados
- Delete o arquivo `dev.db` para resetar
- Execute `npx prisma migrate deploy` novamente
- Verifique permissões de arquivo

### Componentes não aparecem
- Execute `npx prisma generate`
- Limpe o cache do Next.js: `rm -rf .next`
- Reinicie o servidor de desenvolvimento

## Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença - All Rights Reserved

Copyright (c) 2026

Todos os direitos reservados.

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica.
Nenhuma parte deste código pode ser copiada, modificada, distribuída ou utilizada sem autorização expressa do autor.

## Suporte

Para suporte, abra uma issue no GitHub ou contate o desenvolvedor.

---
