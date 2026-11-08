// ↗ arrow, shared by the hero tagline (goes to a case study) and footer links (open in a new tab).
// The viewBox is cropped to the drawn arrow (including its round stroke caps), so `size` is the
// arrow's visible size. Decorative: the link text (or an sr-only note) carries the meaning.
export default function ArrowUpRight({ size = 17, strokeWidth = 2.25, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="4.875 4.875 14.25 14.25"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 18L18 6M8.5 6H18v9.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
