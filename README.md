# 💍 Luiz & Helena — Site de Casamento v3

Site de casamento com design premium, QR codes PIX funcionais e controle de vagas via Google Sheets.

## ✅ O que está incluído

- **Design premium** com animações, partículas e glassmorphism
- **QR Code PIX** 100% funcional e validado (correção do CRC16 e limites EMV)
- **Limites de vagas** por valor com atualização em tempo real
- **Contador regressivo** animado
- **Google Sheets** como banco de dados
- **Código documentado** e modularizado para fácil manutenção

## 🚀 Deploy

### 1. Google Sheets

Siga as instruções do README original para configurar a planilha e o Apps Script.

### 2. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
```

### 3. Build e Deploy

```bash
npm install
npm run build
```

## 🎨 Cores do Design

| Elemento | Cor |
|----------|-----|
| Fundo principal | `#faf8f5` (creme) |
| Texto | `#2d2a26` (marrom escuro) |
| Destaque/Dourado | `#c9a96e` |
| Verde | `#6b8e6b` |

## 🛠️ Estrutura de Pastas

```
app/
  components/     # Componentes React reutilizáveis
  data/           # Configurações de dados (presentes)
  hooks/          # Custom React hooks
  globals.css     # Estilos globais e animações
  layout.js       # Layout principal
  page.js         # Página inicial
lib/
  pix.js          # Lógica PIX (documentada)
  api.js          # Integração com Google Sheets
  utils.js        # Funções utilitárias
```

## 📝 Para modificar

- **Chave PIX**: edite `lib/pix.js` → constante `PIX_KEY`
- **Data do casamento**: edite `app/hooks/useCountdown.js` → `WEDDING_DATE`
- **Presentes**: edite `app/data/gifts.js` → `GIFTS_CONFIG`
- **Cores**: edite `app/globals.css` → variáveis CSS `:root`
- **Textos**: edite os componentes em `app/components/`
