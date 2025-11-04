# MELEIO Platform

Projeto Next.js (App Router) com foco em analytics socioemocional.

## Scripts

- `npm run dev` – inicia o dev server com Turbopack.
- `npm run build` – gera o bundle de produção com `NODE_ENV=production`.
- `npm start` – executa o servidor de produção após o build.

## Estrutura de Pastas

```
src/
  app/          # rotas e layouts (Server Components por padrão)
  components/   # componentes compartilhados
  lib/          # utilitários e serviços server-first
  styles/       # folhas de estilo globais
public/         # assets estáticos
```

## Orientações

- Componentes interativos trazem "`use client`"; os demais são Server Components para evitar enviar cópia estática ao cliente.
- Sourcemaps de browser estão desabilitados em dev e prod; bundles de produção são minificados via SWC.
- Garanta que `.next/` permaneça fora do versionamento (conferido via `.gitignore`).

## Checklist de Verificação

1. Rode `npm run build && npm start` e valide o servidor de produção local.
2. No DevTools → Network, confirme que os bundles entregues não têm sourcemap nem blocos `eval(...)`.
