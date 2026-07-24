import { useState } from 'react'

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function WaveformIcon() {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '16px' }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            background: 'var(--accent-text)',
            borderRadius: '2px',
            height: '100%',
            animation: `wave-bar 0.8s ease-in-out ${delay}s infinite alternate`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  )
}

export default function AudioToggle() {
  const [isOn, setIsOn] = useState(() => localStorage.getItem('ah_audio_on') === 'true')

  const toggle = () => {
    const next = !isOn
    setIsOn(next)
    localStorage.setItem('ah_audio_on', String(next))
  }

  return (
    <button
      onClick={toggle}
      aria-label={isOn ? 'Mute audio' : 'Unmute audio'}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: 0,
      }}
    >
      {isOn ? <WaveformIcon /> : <MuteIcon />}
      {!isOn && (
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          animation: 'pulse-ring 2.2s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}
    </button>
  )
}
