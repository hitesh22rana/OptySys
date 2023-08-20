export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-[99999] flex h-screen w-screen items-center justify-center bg-[url('/images/noise.png')] backdrop-blur">
      <span className="loader" />
    </div>
  );
}
