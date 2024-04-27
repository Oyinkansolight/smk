/* eslint-disable @typescript-eslint/no-explicit-any */
// import PageCounter from '@/components/counter/PageCounter';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import React from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface CustomPDFReaderProps {
  url: string;
}

const CustomPDFReader = ({ url }: CustomPDFReaderProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    /*  Server Component */
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/legacy/build/pdf.worker.js'>
      <div style={{ height: '100vh', width: '90vw' }}>
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
      </div>
    </Worker>
  );
};

export default CustomPDFReader;
