"use client";
import { s3 } from "@/lib/aws";
import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    setLoading(true);

    try {
      const uniqueFileName = `${uuidv4()}-${file.name}`;
      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "",
        Key: `resumes/${uniqueFileName}`,
        Body: file,
        ContentType: file.type,
      };
      const { Location } = await s3.upload(params).promise();
      setDownloadUrl(Location);
      setLoading(false);
      router.push("/rate")
    } catch (error) {
      setLoading(false);
      setError("Error uploading file: " + (error instanceof Error ? error.message : "Unknown error"));
      console.error("Error uploading file:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="text-5xl font-bold mb-8">Upload your resume here!</div>

      <div className="flex items-center justify-center w-3/4 mb-6">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-gray-500"
        >
          <input
            disabled={file != null}
            id="dropzone-file"
            accept="application/pdf"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-gray-500">Drag & Drop your PDF resume here</span>
        </label>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {file && (
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-900 mb-4">Selected file: {file.name}</p>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={loading}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:bg-red-300"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {downloadUrl && (
        <div className="mt-6 text-green-500">
          <p>File uploaded successfully!</p>
        </div>
      )}
    </main>
  );
}
