'use client';

import { getURL } from '@/firebase/init';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Page() {
  // const [numberOfPages, setNumberOfPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const params = useSearchParams();
  const [fileDownloadURL, setFileDownloadURL] = useState<string>();

  useEffect(() => {
    const run = async () => {
      setFileDownloadURL(await getURL(params?.get('uploadUrl') ?? ''));
    };
    run();
  }, [params]);

  return (
    <div className='w-full layout'>
      <div className='font-bold text-3xl py-8 h3'>Lesson Note</div>
      <div className='flex items-center gap-2 font-bold'>
        <div className='h-10 w-10 rounded-full bg-gray-200' />
        <div>Ighosa Ahmed</div>
      </div>
      <div className='flex-1 mb-8 rounded-lg bg-white min-h-[50rem] overflow-hidden overflow-x-scroll mt-10'>
        <div className='flex justify-center'>
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
            <div style={{ height: '100vh', width: '100vw' }}>
              <Viewer
                fileUrl={
                  fileDownloadURL
                    ? fileDownloadURL
                    : '/pdfs/Assignment samples.pdf'
                }
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        </div>
      </div>
    </div>
  );
}