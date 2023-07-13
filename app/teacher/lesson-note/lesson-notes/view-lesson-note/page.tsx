'use client';

import PageCounter from '@/components/counter/PageCounter';
import { useState } from 'react';
import { Page as DocPage, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Page() {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className='w-full layout'>
      <div className='font-bold text-3xl py-8 h3'>Lesson Note</div>
      <div className='flex items-center gap-2 font-bold'>
        <div className='h-10 w-10 rounded-full bg-gray-200' />
        <div>Ighosa Ahmed</div>
      </div>
      <div>
        <PageCounter
          page={currentPage}
          maxPage={numberOfPages}
          onChange={setCurrentPage}
        />
        <Document
          className='mx-auto'
          file='/pdfs/CHEMISTRY SS2 3RD TERM WEEK 3.pdf'
          onLoadSuccess={(v) => {
            setNumberOfPages(v.numPages);
          }}
        >
          <DocPage pageNumber={currentPage} renderTextLayer={false} />
        </Document>
      </div>
    </div>
  );
}
