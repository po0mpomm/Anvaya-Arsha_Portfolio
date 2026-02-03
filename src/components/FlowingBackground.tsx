"use client";

import dynamic from "next/dynamic";

// Dynamic import with a solid black loading state
const BeastScene = dynamic(() => import("@/components/canvas/BeastScene"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black"></div>
});

export default function FlowingBackground() {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black z-0"
            style={{
                zIndex: 0, /* Base Layer */
                backgroundColor: '#000000' /* Force black */
            }}
        >
            <BeastScene />
        </div>
    );
}
