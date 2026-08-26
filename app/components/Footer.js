export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-text)', color: '#a8a29e', padding: '60px 24px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--color-gold)', marginBottom: 8, fontWeight: 400 }}>Luiz & Helena</p>
      <p style={{ fontSize: 14, color: '#8c8279', letterSpacing: '0.1em' }}>12 . 12 . 2026</p>
      <div style={{ width: 40, height: 1, background: 'var(--color-gold)', margin: '20px auto', opacity: 0.5 }} />
      <p style={{ fontSize: 13, color: '#6b6560' }}>São Bento do Sul, Santa Catarina</p>
      <p style={{ fontSize: 12, color: '#5c554d', marginTop: 24 }}>Com carinho, esperamos você!</p>
    </footer>
  )
}
