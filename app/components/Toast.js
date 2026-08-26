export default function Toast({ message }) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--color-text)', color: '#fff', padding: '14px 28px',
      borderRadius: 'var(--radius-lg)', fontSize: 14, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 200,
      animation: 'fadeInUp 0.3s ease',
    }}>
      {message}
    </div>
  )
}
