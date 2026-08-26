export default function Toast({ message }) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--charcoal)', color: '#fff', padding: '14px 32px',
      borderRadius: 'var(--radius-lg)', fontSize: 14, fontWeight: 500,
      boxShadow: '0 20px 50px rgba(0,0,0,0.18)', zIndex: 200,
      animation: 'fadeInUp 0.35s ease',
      fontFamily: 'var(--font-sans)',
    }}>
      {message}
    </div>
  )
}
