'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
        <html>
            <body className="bg-black text-white flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                <div className="p-4 bg-red-900/20 border border-red-500 rounded mb-4 max-w-lg overflow-auto">
                    <p className="font-mono text-sm">{error.message}</p>
                </div>
                <button
                    className="px-4 py-2 bg-accent-NEON_GREEN text-black font-bold rounded hover:bg-green-400"
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
