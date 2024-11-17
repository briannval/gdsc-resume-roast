'use client'

import { useState, useEffect } from "react";
import { GlobalContext } from "@/contexts/GlobalContext";

interface GlobalProviderProps {
    children: React.ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [resumeUploaded, setResumeUploaded] = useState<number | null>(() => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem("resumeUploaded");
            return storedValue ? JSON.parse(storedValue) : null;
        }
        return null;
    });

    const [ratingUploaded, setRatingUploaded] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem("ratingUploaded");
            return storedValue ? JSON.parse(storedValue) : false;
        }
        return false;
    });

    useEffect(() => {
        if (resumeUploaded !== null) {
            localStorage.setItem("resumeUploaded", JSON.stringify(resumeUploaded));
        }
    }, [resumeUploaded]);

    useEffect(() => {
        localStorage.setItem("ratingUploaded", JSON.stringify(ratingUploaded));
    }, [ratingUploaded]);

    return (
        <GlobalContext.Provider
            value={{
                resumeUploaded,
                ratingUploaded,
                setResumeUploaded,
                setRatingUploaded,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
