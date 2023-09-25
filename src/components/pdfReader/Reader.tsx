import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

interface CustomPDFReaderProps {
  url: string
};

const CustomPDFReader = ({ url }: CustomPDFReaderProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    /*  Server Component */
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.js'>
      <div style={{ height: '100vh', width: '90vw' }}>

        <Viewer
          fileUrl={url}
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  )
}

export default CustomPDFReader