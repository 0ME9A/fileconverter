import clsx from "clsx";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center",
        className,
      )}
    >
      <div className="animate-spin rounded-full size-12 border-y-2 border-primary" />
    </div>
  );
}
