"use client";

import dynamic from "next/dynamic";

// Dynamic import with a solid black loading state
const BeastScene = dynamic(() => import("@/components/canvas/BeastScene"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent"></div>
});

export default function FlowingBackground() {
    return (
        <div
            className="sticky top-0 left-0 w-full h-screen z-0 pointer-events-none"
            style={{
                zIndex: 0, 
            }}
        >
            <BeastScene />
        </div>
    );
}
