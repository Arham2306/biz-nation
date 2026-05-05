import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function WaveText({
    text = "Hover me",
    className = "",
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Classes that must be applied per-character (like gradients with bg-clip-text)
    const needsPerChar = className.includes("text-gradient");

    // On mobile, render plain text without character-level animation
    if (isMobile) {
        return (
            <span className={cn("inline-block", className)}>
                {text}
            </span>
        );
    }

    return (
        <motion.span
            className={cn(
                "inline-block cursor-pointer transition-all",
                !needsPerChar && className
            )}
            whileHover="hover"
            initial="initial"
        >
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            className={cn(
                                "inline-block",
                                needsPerChar && className
                            )}
                            variants={{
                                initial: {
                                    y: 0,
                                    scale: 1,
                                },
                                hover: {
                                    y: -8,
                                    scale: 1.1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 15,
                                        delay: (wordIndex * 5 + charIndex) * 0.02,
                                    },
                                },
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {/* Add space after word if it's not the last word */}
                    {wordIndex < text.split(" ").length - 1 && (
                        <span className="inline-block">&nbsp;</span>
                    )}
                </span>
            ))}
        </motion.span>
    );
}

export { WaveText };
