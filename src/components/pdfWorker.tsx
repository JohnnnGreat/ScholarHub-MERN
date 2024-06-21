"use client";
import React from "react";
import { pdfjs } from "react-pdf";

const PDFWorker = ({ children }: { children: React.ReactNode }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  return <div>{children}</div>;
};

export default PDFWorker;
