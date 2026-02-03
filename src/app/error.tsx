'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h2 className="text-2xl font-bold mb-4 text-accent-ERROR_RED">Application Error</h2>
            <div className="p-4 bg-white/5 border border-white/10 rounded mb-6 max-w-lg w-full overflow-auto">
                <p className="font-mono text-sm text-gray-300">{error.message}</p>
                {error.digest && <p className="text-xs text-gray-500 mt-2">Digest: {error.digest}</p>}
            </div>
            <button
                className="px-6 py-2 bg-accent-NEON_GREEN text-black font-bold rounded hover:bg-green-400 transition-colors"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
}
