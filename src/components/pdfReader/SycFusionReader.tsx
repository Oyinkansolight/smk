import React from 'react';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject
} from '@syncfusion/ej2-react-pdfviewer';

export default function SyncFusionPDFReader({ url }: { url: string }) {
  return (
    <div>
      <div className='control-section w-[80vw] h-[100vh]'>
        <PdfViewerComponent
          id="container"
          documentPath={url}
          resourceUrl="https://cdn.syncfusion.com/ej2/23.1.40/dist/ej2-pdfviewer-lib"
          style={{ 'height': '640px' }}>
          <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView,
            ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner]} />
        </PdfViewerComponent>
      </div>
    </div>
  );
}
