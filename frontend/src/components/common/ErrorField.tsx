export default function ErrorField({ error }: { error: string | null }) {
  return <span className="text-red-500 text-xs h-0">{error}</span>;
}
