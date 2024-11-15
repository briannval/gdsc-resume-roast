-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "formatting" INTEGER NOT NULL,
    "relevance" INTEGER NOT NULL,
    "quantification" INTEGER NOT NULL,
    "clarity" INTEGER NOT NULL,
    "wording" INTEGER NOT NULL,
    "resumeId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
