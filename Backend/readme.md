# API da tia Tuts

## Rota `/api/usuarios`

### Adicionar um usuário
**Método:** `POST`  
**Corpo da requisição (JSON):**
```json
{
  "nome": "",
  "email": "",
  "senha": "",
  "estado": "",
  "cidade": "",
  "genero": "",
  "cpf": "",
  "tell": ""
}
```

**Respostas possíveis:**
- **200 OK** → Usuário adicionado com sucesso
- **500 Internal Server Error** → Erro no servidor (por enquanto ainda serve como um geralzão)
