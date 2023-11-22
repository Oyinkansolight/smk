/* eslint-disable @typescript-eslint/no-explicit-any */
// import PageCounter from '@/components/counter/PageCounter';
import React from 'react'
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// import { pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface CustomPDFReaderProps {
  url: string
};

const CustomPDFReader = ({ url }: CustomPDFReaderProps) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // const [touchStartX, setTouchStartX] = useState(0);
  // const [touchEndX, setTouchEndX] = useState(0);
  // const [numberOfPages, setNumberOfPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);

  // const handleTouchStart = (e: any) => {
  //   setTouchStartX(e.touches[0].clientX);
  // };

  // const handleTouchMove = (e: any) => {
  //   e.preventDefault(); // Prevent scrolling while swiping
  // };

  // const handleTouchEnd = (e: any) => {
  //   setTouchEndX(e.changedTouches[0].clientX);
  //   handleSwipe();
  // };

  // const handleSwipe = () => {
  //   const swipeThreshold = 50; // Minimum distance for swipe detection

  //   const swipeDistance = touchEndX - touchStartX;

  //   if (Math.abs(swipeDistance) >= swipeThreshold) {
  //     if (swipeDistance > 0) {
  //       // Swipe Right
  //       if (currentPage === 1) return;
  //       setCurrentPage((page) => page - 1);
  //     } else {
  //       // Swipe Left
  //       if (numberOfPages === currentPage) return;
  //       setCurrentPage((page) => page + 1);
  //     }
  //   }
  // };

  return (
    /*  Server Component */
    // <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/legacy/build/pdf.worker.js'>
    //   <div style={{ height: '100vh', width: '90vw' }}>

    //     <Viewer
    //       fileUrl={url}
    //       plugins={[defaultLayoutPluginInstance]}
    //     />
    //   </div>
    // </Worker>

    // <div className='flex-1 mb-8 rounded-lg bg-white min-h-[50rem] overflow-hidden overflow-x-scroll'>
    //   <div className='flex justify-center p-8'>
    //     <PageCounter
    //       page={currentPage}
    //       maxPage={numberOfPages}
    //       onChange={setCurrentPage}
    //     />
    //   </div>
    //   <div className='flex justify-center'>
    //     {' '}
    //     <Document
    //       file={url}
    //       className='mx-auto'
    //       onLoadSuccess={(v) => {
    //         setNumberOfPages(v.numPages);
    //       }}
    //     >
    //       <DocPage
    //         renderTextLayer={false}
    //         pageNumber={currentPage}
    //         onTouchStart={handleTouchStart}
    //         onTouchMove={handleTouchMove}
    //         onTouchEnd={handleTouchEnd}
    //       />
    //     </Document>
    //   </div>
    // </div>

    <iframe src={url} width="100%" height={800} />
    // <iframe
    //   src={url + "#toolbar=0"}
    //   height={800}
    //   width="100%"
    // />
  )
}

export default CustomPDFReader