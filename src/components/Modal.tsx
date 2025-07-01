export function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-2xl w-full shadow-lg relative" onClick={e => e.stopPropagation()}>
        {onClose && (
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
} 