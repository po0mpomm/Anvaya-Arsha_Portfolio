import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 font-mono">
            <h2 className="text-6xl font-bold mb-4 text-accent-ERROR_RED glitch-effect">404</h2>
            <p className="text-xl mb-8 text-accent-CYBER_CYAN tracking-widest">SYSTEM // DIRECTORY_NOT_FOUND</p>
            <div className="p-6 bg-white/5 border border-white/10 rounded mb-8 max-w-lg text-center backdrop-blur-sm">
                <p className="text-gray-400 mb-4">
                    The requested data sector appears to be corrupted or does not exist.
                </p>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent-NEON_GREEN to-transparent opacity-50 my-4" />
                <p className="text-xs text-gray-600">ERROR_CODE: PAGE_MISSING</p>
            </div>
            <Link
                href="/"
                className="px-8 py-3 bg-white/5 border border-accent-NEON_GREEN text-accent-NEON_GREEN hover:bg-accent-NEON_GREEN hover:text-black transition-all duration-300 font-bold tracking-wider uppercase"
            >
                Return to Base
            </Link>
        </div>
    );
}
