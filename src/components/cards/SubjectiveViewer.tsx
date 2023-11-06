import { renderHTML } from '@/lib/helper'
import React from 'react'

interface SubjectiveViewerProps {
  content: string
}

const SubjectiveViewer = ({ content }: SubjectiveViewerProps) => {
  return (
    <div className='flex flex-col rounded-md overflow-hidden w-full h-full px-6 py-10'>
      {renderHTML(content)}
    </div>
  )
}

export default SubjectiveViewer