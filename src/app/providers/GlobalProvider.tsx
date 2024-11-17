'use client';

import { useState, useEffect } from "react";
import { GlobalContext } from "@/contexts/GlobalContext";
import Loading from "@/components/Loading";

interface GlobalProviderProps {
    children: React.ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [resumeUploaded, setResumeUploaded] = useState<number | null>(null);
    const [ratingUploaded, setRatingUploaded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedResumeUploaded = localStorage.getItem("resumeUploaded");
        const storedRatingUploaded = localStorage.getItem("ratingUploaded");

        if (storedResumeUploaded) {
            setResumeUploaded(JSON.parse(storedResumeUploaded));
        }
        if (storedRatingUploaded) {
            setRatingUploaded(JSON.parse(storedRatingUploaded));
        }

        setTimeout(() => {
            setLoading(false);
        }, 4000);
    }, []);

    useEffect(() => {
        if (resumeUploaded !== null) {
            localStorage.setItem("resumeUploaded", JSON.stringify(resumeUploaded));
        }
    }, [resumeUploaded]);

    useEffect(() => {
        localStorage.setItem("ratingUploaded", JSON.stringify(ratingUploaded));
    }, [ratingUploaded]);

    if (loading) {
        return (
            <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                <Loading />
            </main>
        );
    }

    return (
        <GlobalContext.Provider
            value={{
                resumeUploaded,
                ratingUploaded,
                setResumeUploaded,
                setRatingUploaded,
                setLoading,
                loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
