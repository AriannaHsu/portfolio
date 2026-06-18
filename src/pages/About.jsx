export default function About() {
  return (
    <main className="px-8 py-12 max-w-2xl">
      <h1 className="text-4xl font-medium mb-8">About</h1>
      <p className="text-gray-700 leading-relaxed mb-6">
        Hi, I'm [Your Name]. Write a short bio here.
      </p>
      <p className="text-gray-700 leading-relaxed mb-6">
        Currently [role/status]. Previously [background].
      </p>
      <div className="flex gap-4 mt-8 text-sm">
        <a href="mailto:you@email.com" className="underline underline-offset-4">
          Email
        </a>
        <a href="https://linkedin.com/in/yourhandle" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </main>
  )
}
