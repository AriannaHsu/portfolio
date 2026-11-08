import { useEffect, useId, useRef, useState } from 'react'

// Put together at runtime so the full address never appears as one string in the built files.
// Stops the cheap scrapers that grep pages and bundles for "name@domain"; a real browser still
// sees the normal address.
const USER = ['ach', '282']
const DOMAIN = ['cornell', 'edu']
const getAddress = () => `${USER.join('')}@${DOMAIN.join('.')}`

/**
 * "Email" in the footer. A plain mailto: link does nothing for anyone without a desktop mail app
 * (most people who use Gmail/Outlook in the browser), so this opens a small menu instead:
 * Gmail, Outlook, the default mail app, or copy the address.
 *
 * Opens on hover with a mouse, on tap with touch, and with Enter/Space from the keyboard.
 * Disclosure pattern: a button with aria-expanded controlling a list of ordinary links/buttons.
 * Escape or clicking outside closes it and returns focus to the button.
 */
export default function EmailMenu({ className }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const address = getAddress()
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close when focus leaves the whole widget (e.g. Tab past the last item).
  const onBlur = (e) => {
    if (!rootRef.current?.contains(e.relatedTarget)) setOpen(false)
  }

  // Mouse/trackpad: open on hover, close shortly after the pointer leaves (the delay forgives a
  // wobbly path from "Email" up into the menu). Touch: tap toggles. Keyboard: Enter/Space toggles.
  const closeTimer = useRef(0)
  const lastPointer = useRef('')
  useEffect(() => () => clearTimeout(closeTimer.current), [])
  const onPointerEnter = (e) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const onPointerLeave = (e) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      // stay open if the menu has keyboard focus inside it
      if (!rootRef.current?.contains(document.activeElement) || document.activeElement === buttonRef.current) {
        setOpen(false)
      }
    }, 250)
  }
  const onButtonClick = () => {
    // A mouse click after hovering would otherwise snap it shut; keep it open instead.
    if (lastPointer.current === 'mouse') setOpen(true)
    else setOpen((o) => !o)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address)
    } catch {
      // Older/locked-down browsers: fall back to a hidden textarea.
      const t = document.createElement('textarea')
      t.value = address
      t.setAttribute('readonly', '')
      t.style.position = 'fixed'
      t.style.opacity = '0'
      document.body.append(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const to = encodeURIComponent(address)
  const options = [
    { label: 'Gmail', icon: <GmailIcon />, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`, external: true },
    { label: 'Outlook', icon: <OutlookIcon />, href: `https://outlook.office.com/mail/deeplink/compose?to=${to}`, external: true },
    // The visitor's default desktop/phone mail app (Apple Mail, Outlook desktop, etc.)
    { label: 'Mail app', icon: <MailAppIcon />, href: `mailto:${address}` },
  ]

  return (
    <div
      className="email-menu"
      ref={rootRef}
      onBlur={onBlur}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        className={className}
        aria-expanded={open}
        aria-controls={menuId}
        onPointerDown={(e) => { lastPointer.current = e.pointerType }}
        onKeyDown={() => { lastPointer.current = 'keyboard' }}
        onClick={onButtonClick}
      >
        Email
      </button>

      <div id={menuId} className="email-menu__panel" hidden={!open}>
        {/* The address itself copies on click; the copy icon slides in on hover/focus. */}
        <button
          type="button"
          className={`email-menu__address${copied ? ' is-copied' : ''}`}
          onClick={copy}
          aria-label={copied ? `Copied ${address}` : `Copy ${address}`}
        >
          <span className="email-menu__address-text">{address}</span>
          <span className="email-menu__copy" aria-hidden="true">
            {copied ? <CheckIcon /> : <CopyIcon />}
          </span>
        </button>
        <ul className="email-menu__list">
          {options.map(({ label, icon, href, external }) => (
            <li key={label}>
              <a
                href={href}
                className="email-menu__item"
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="email-menu__icon" aria-hidden="true">{icon}</span>
                {label}
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
        <p className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</p>
      </div>
    </div>
  )
}

/* Icons: 20px, decorative (the text label names each option). */
function GmailIcon() {
  return (
    <svg viewBox="52 42 88 66" width="20" height="15" focusable="false">
      <path fill="#4285F4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
      <path fill="#34A853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
      <path fill="#FBBC04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
      <path fill="#EA4335" d="M72 74V48l24 18 24-18v26L96 92" />
      <path fill="#C5221F" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
    </svg>
  )
}

function OutlookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
      {/* envelope behind */}
      <rect x="8" y="5" width="15" height="14" rx="1.5" fill="#28A8EA" />
      <path d="M8 9l7.5 4.5L23 9" fill="none" stroke="#0364B8" strokeWidth="1.2" />
      {/* blue tile with the white O */}
      <rect x="1" y="5.5" width="12" height="13" rx="1.5" fill="#0078D4" />
      <ellipse cx="7" cy="12" rx="3" ry="3.6" fill="none" stroke="#fff" strokeWidth="1.8" />
    </svg>
  )
}

function MailAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
      <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
