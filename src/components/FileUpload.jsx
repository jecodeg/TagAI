import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Check, Loader2, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Progress } from "@/components/ui/progress";

const FileUpload = () => {
  const { theme } = useTheme();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDownload, setShowDownload] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState([]);

  const steps = [
    "Extracting Entities",
    "Mapping Context",
    "Inferring Model Insights",
    "Searching the Semantics",
    "Predicting XBRL Tags",
  ];

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const simulateUploadStep = async () => {
    const durations = [1000, 1500, 3000, 2500, 2000];
    const progress = [10, 20, 35, 69, 87];
    setVisibleSteps([]);
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setProgress(progress[i]);

      // Add new step with scroll animation
      setVisibleSteps((prev) => [...prev, i]);

      // Simulate processing time for each step
      await new Promise((resolve) => setTimeout(resolve, durations[i]));
    }

    setIsUploading(false);
    setShowDownload(true);
  };

  const handleSubmit = () => {
    setIsUploading(true);
    setShowDownload(false);
    simulateUploadStep();
  };

  const handleDownload = () => {
    // Create a sample document for download
    const fileUrl =
      "https://raw.githubusercontent.com/SKR04/TagAI/refs/heads/master/src/assets/Sample.pdf"; // Replace with your file's URL
    const link = document.createElement("a");
    link.href = fileUrl;
    // link.download = "processed-document.txt"; // Optional: Sets default download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className={`p-6 ${theme === "dark" ? "bg-[#1a1a1a]" : "bg-white"}`}>
        {!isUploading && !showDownload && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-primary" : "border-muted-foreground"}
              ${
                theme === "dark"
                  ? "bg-[#2a2a2a] hover:bg-[#2f2f2f]"
                  : "bg-gray-50 hover:bg-gray-100"
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className={`w-8 h-8 mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p
                className={`text-lg mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {isDragActive
                  ? "Drop the files here..."
                  : "Drag and drop files here, or click to select files"}
              </p>
              <p className="text-sm text-muted-foreground">
                Support for multiple files
              </p>
            </div>
          </div>
        )}

        {files.length > 0 && !isUploading && !showDownload && (
          <div className="mt-8">
            <h3
              className={`text-lg font-semibold font-sans mb-4 mt-4 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Preview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {file.file.type.startsWith("image/") ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div
                      className={`w-full h-20 flex items-center justify-center rounded-lg
                      ${theme === "dark" ? "bg-[#2a2a2a]" : "bg-gray-100"}`}
                    >
                      <p className="text-sm text-muted-foreground">
                        {file.file.name}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button className="mt-4" onClick={handleSubmit}>
              Upload Files
            </Button>
          </div>
        )}

        {isUploading && (
          <div className="mt-8 flex flex-col items-center">
            <Progress value={progress} className="mb-4" />
            <div className="space-y-3 max-h-40 overflow-y-hidden transition-all duration-500">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center space-x-3 transition-opacity duration-500 ${
                    visibleSteps.includes(index)
                      ? "opacity-100"
                      : "opacity-0 hidden"
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : index === currentStep ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                  )}
                  <span
                    className={`text-sm ${
                      index <= currentStep
                        ? theme === "dark"
                          ? "text-gray-200"
                          : "text-gray-700"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {showDownload && (
          <div className=" flex flex-col items-center">
            <h3
              className={`text-lg font-semibold mb-4 font-sans ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Processing Complete
            </h3>
            <Button
              onClick={handleDownload}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Processed Document</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FileUpload;
