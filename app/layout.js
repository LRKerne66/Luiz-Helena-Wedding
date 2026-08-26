/**
 * Layout principal do site.
 * Define metadados SEO, fontes Google e estrutura base HTML.
 */

export const metadata = {
  title: 'Luiz & Helena — 12 de Dezembro de 2026',
  description: 'Nosso casamento. Sua presença é nosso maior presente!',
  keywords: 'casamento, Luiz, Helena, São Bento do Sul, lista de presentes, PIX',
  authors: [{ name: 'Luiz & Helena' }],
  openGraph: {
    title: 'Luiz & Helena — Casamento',
    description: 'Sua presença é nosso maior presente!',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
