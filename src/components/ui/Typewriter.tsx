"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const TypewriterEffect = ({
    words,
}: {
    words: {
        text: string;
        className?: string;
    }[];
}) => {
    // Simple implementation for now
    return (
        <div className="flex space-x-1 my-6">
            {words.map((word, idx) => (
                <div key={`word-${idx}`} className="inline-block">
                    {word.text.split("").map((char, index) => (
                        <span
                            key={`char-${index}`}
                            className={word.className}
                        >
                            {char}
                        </span>
                    ))}
                    &nbsp;
                </div>
            ))}
        </div>
    );
};
