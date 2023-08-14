export default function ErrorField({ error }: { error: string | null }) {
  return <span className="h-0 text-xs text-red-500">{error}</span>;
}
