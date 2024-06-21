"use client";
import React from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
const PDFWorker = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default PDFWorker;
