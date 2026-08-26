# 💍 Luiz & Helena — Site de Casamento v3

Site de casamento elegante e contemporâneo, inspirado no design dos sites da Casar.com.

## 🎨 Design System

### Paleta de Cores
| Token | Hex | Uso |
|-------|-----|-----|
| `--sage` | `#8B9D83` | Verde musgo — acentos, botões, badges |
| `--champagne` | `#C9A96E` | Dourado champagne — destaques, títulos, divisores |
| `--cream` | `#F5F0E8` | Creme quente — fundos de seções |
| `--ivory` | `#FAF9F6` | Marfim — fundo principal |
| `--charcoal` | `#2D2D2D` | Carvão — texto principal |
| `--taupe` | `#8A8279` | Taupe — texto secundário |

### Tipografia
| Uso | Fonte | Peso |
|-----|-------|------|
| Títulos / Nomes | Cormorant Garamond | 400, 500, 600 |
| Corpo / UI | Inter | 300, 400, 500, 600 |

## 🚀 Deploy no Vercel

1. Configure a variável de ambiente `NEXT_PUBLIC_SCRIPT_URL` no painel do Vercel
2. O deploy é automático a cada push no GitHub

## 📝 Como personalizar

### Trocar fotos do casal
1. Suba as fotos em `/public/fotos/` (ou use um CDN como Cloudinary/Imgur)
2. Edite os componentes em `app/sections/` e troque os `src` das `<img>`
3. **Hero**: edite `app/sections/HeroSection.js` → propriedade `heroImage`
4. **Nossa História**: edite `app/sections/StorySection.js` → propriedades `couplePhoto1`, `couplePhoto2`

### Trocar textos
- **Nomes do casal**: `app/config/couple.js` → `COUPLE_NAMES`
- **Data do casamento**: `app/config/couple.js` → `WEDDING_DATE`
- **Local**: `app/config/couple.js` → `VENUE`
- **Texto da história**: `app/sections/StorySection.js`
- **Texto da cerimônia**: `app/sections/CeremonySection.js`

### Trocar cores
Edite `app/globals.css` → seção `:root` (CSS Custom Properties)

### Trocar chave PIX
Edite `lib/pix.js` → constante `PIX_KEY`

## 📁 Estrutura

```
app/
  sections/        # Seções da página (Hero, Story, Ceremony, Gifts, Footer)
  components/      # Componentes reutilizáveis (Navbar, Particles, Toast, Modal)
  hooks/           # Custom hooks (countdown, gifts, toast, scroll-reveal)
  config/          # Configurações centralizadas (casal, presentes)
  globals.css      # Estilos globais, animações, design tokens
  layout.js        # Layout raiz com fontes e metadados
  page.js          # Página principal (monta todas as seções)
lib/
  pix.js           # Gerador de payload PIX (corrigido e validado)
  api.js           # Comunicação com Google Sheets
  utils.js         # Funções utilitárias
public/
  fotos/           # 📸 COLOQUE AS FOTOS DO CASAL AQUI
```
