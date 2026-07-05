import React from 'react'

export const AdminLoginBanner: React.FC = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #16365D 0%, #2B6CB0 100%)',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        padding: '1.75rem 2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 56,
          height: 56,
          borderRadius: 14,
          background: 'rgba(255,255,255,0.12)',
          marginBottom: '1rem',
        }}
      >
        <svg viewBox="0 0 48 48" fill="none" width={36} height={36} aria-hidden="true">
          <path d="M8 34 Q24 14 40 34" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="8" cy="34" r="4.5" fill="#5B9BD5" />
          <circle cx="40" cy="34" r="4.5" fill="#5B9BD5" />
          <circle cx="24" cy="17" r="3.5" fill="white" opacity="0.8" />
        </svg>
      </div>
      <div style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
        KÉK-HÍD Admin
      </div>
      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', marginTop: 4 }}>
        Kérlek lépj be a szerkesztőfelülethez
      </div>
    </div>
  )
}
