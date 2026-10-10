import React from 'react'
import Link from 'next/link'

export const AutomationNavLink: React.FC = () => {
  return (
    <div style={{ padding: '0.75rem 1rem', marginTop: '0.5rem', borderTop: '1px solid var(--theme-elevation-150)' }}>
      <Link
        href="/admin/automation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: 'var(--theme-elevation-800)',
          textDecoration: 'none',
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          background: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-elevation-200)',
          transition: 'background 0.15s ease',
        }}
      >
        <span style={{ fontSize: '1rem' }}>⚡</span>
        <span>News Automation Engine</span>
      </Link>
    </div>
  )
}

export default AutomationNavLink
