import { createContext, useContext, useState } from "react";

interface GlobalContextType {
    resumeUploaded: number | null;
    ratingUploaded: boolean;
    setResumeUploaded: (uploaded: number) => void;
    setRatingUploaded: (uploaded: boolean) => void;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);