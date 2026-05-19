# Sites (um JSON por presente)

Cada arquivo `nome-do-casal.json` vira um link:

```
https://seu-dominio.com/nome-do-casal
```

## Sites incluídos

| Arquivo | Uso |
|---------|-----|
| `ana-livia.json` | Site pessoal do Luiz para a Ana Lívia (link `/ana-livia`) |
| `demo.json` | Exemplo para mostrar a clientes (`/demo`) |

A raiz `/` redireciona para `/formulario`. O presente da Ana Lívia fica em `/ana-livia` (só quem tem o link).

## Novo cliente (venda)

**Namoro:** formulário `FORMULARIO-NAMORO-WHATSAPP.txt`  
**Cartinha (sem namoro):** `FORMULARIO-CARTINHA-WHATSAPP.txt`

1. Copie `demo.json` → `slug-do-cliente.json`
2. Edite textos, nomes e quiz (se tiver)
3. Fotos opcionais — se não tiver, use `"photos": []`
4. Deploy → `https://seu-dominio.com/slug-do-cliente`

## Quiz (opcional)

Sem quiz: deixe `"questions": []` no JSON — o site abre direto.

Com quiz — tipos de resposta:

```json
{ "type": "name", "value": "luiz" }
{ "type": "full-date", "day": 7, "month": 11, "year": 2008 }
{ "type": "day-month", "day": 5, "month": 3 }
```

Datas aceitam `05/03`, `5/3`, `0503`, etc.

## Fotos (opcional)

Sem fotos: `"photos": []` na seção `gallery` — a galeria some do site.

Com fotos, use caminhos a partir de `public/`:

```json
"src": "/sites/joao-e-maria/photos/01.jpg"
```

O site da Ana Lívia continua usando `/photos/...` como antes.
