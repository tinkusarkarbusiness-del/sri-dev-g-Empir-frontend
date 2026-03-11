export default function AIDollPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">AI Doll companion</h1>

      <div className="mt-6">
        <img
          src="/ai-doll.png"
          alt="AI Doll companion"
          className="rounded-2xl w-80"
        />

        <p className="mt-4 text-muted-foreground">
          Your digital companion will appear here.
        </p>
      </div>
    </div>
  )
}
