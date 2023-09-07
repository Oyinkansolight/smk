/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from '@/components/buttons/BackButton';
import clsxm from '@/lib/clsxm';
import { useGetFolderAndFiles } from '@/server/library';
import { UserFolder } from '@/types/material';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import FileContent from '~/svg/file.svg';
import Folder from '~/svg/folder.svg';

interface propType {
  subjectName?: string;
  assessmentName: string;
}

function AddTestExam({
  subjectName,
  assessmentName
}: propType) {
  const params = useSearchParams();
  const subjectId = params?.get('id') as string;
  const [file, setFile] = useState<Record<string, string>>({});
  const [folderTrail, setFolderTrail] = useState<UserFolder[]>([]);
  const subjectIdOrUndefined = folderTrail.length === 0 ? subjectId : undefined;
  const {
    data: folderContent,
    refetch: refetchFolderFiles,
    isLoading: isLoadingFolderFiles,
  } = useGetFolderAndFiles(folderTrail[folderTrail.length - 1]?.id, subjectIdOrUndefined);
  const [openDocumentViewer, setOpenDocumentViewer] = useState(false);

  const handleToggleDocumentViewer = () => {
    setOpenDocumentViewer(!openDocumentViewer);
  };

  const onFolderClick = (folder) => {
    const c = [...folderTrail];
    c.push(folder);
    setFolderTrail(c);
    refetchFolderFiles();
  };

  const handleAssignFileToPeriod = (fileId, fileName) => {
    setFolderTrail([]);

    setFile({
      fileName,
      fileId,
    });

    handleToggleDocumentViewer();
  };

  // console.log(files);

  const handleSubmit = () => {
    // console.log(periodsUpdate);
  }

  return (
    <div className='flex justify-center flex-col space-y-4'>
      {openDocumentViewer ? (
        <div className='flex flex-col w-full h-full bg-white'>
          <div className='max-w-[150px]'>
            <BackButton onClick={handleToggleDocumentViewer} />
          </div>

          <div className='flex items-center bg-[#F5F6F7] w-full h-[55px] h3 px-6 mt-4'>
            Add File
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center bg-[#F6F9FC] w-full h-[55px] h4 px-6'>
              {assessmentName}
            </div>

            {folderTrail.length > 0 && (
              <div
                onClick={() => {
                  const c = [...folderTrail];
                  c.pop();
                  setFolderTrail(c);
                }}
                className='flex gap-4 font-bold items-center cursor-pointer rounded bg-gray-200 hover:bg-gray-100 py-1 px-3 max-w-[100px] my-4'
              >
                <TbArrowBackUp className='h-5 w-5' /> <div>Prev.</div>
              </div>
            )}

            <div className='flex flex-col divide-x'>
              {folderContent && folderContent.length > 0 ? (
                folderContent
                  ?.filter(
                    (item) =>
                      item.id !== folderTrail[folderTrail.length - 1]?.id
                  )
                  ?.map((item) => {
                    if ('fileUrl' in item) {
                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            handleAssignFileToPeriod(item?.id, item?.filename)
                          }
                          className='flex gap-x-5 items-center w-full h-[48px] text-2xl px-6 cursor-pointer'
                        >
                          <FileContent className='h-6 w-6' />
                          <div className='p'>{item?.filename}</div>
                        </div>
                      );
                    } else if ('folderName' in item) {
                      return (
                        <div
                          key={item.id}
                          onClick={() => item.id && onFolderClick(item)}
                          className='flex gap-x-5 items-center w-full h-[48px] h3 px-6 cursor-pointer'
                        >
                          <Folder className='h-6 w-6' />
                          <div className='p'>{item?.folderName}</div>
                        </div>
                      );
                    }
                  })
              ) : (
                <div className='flex items-center justify-center w-full h-[200px]'>
                  {isLoadingFolderFiles ? (
                    'Loading...'
                  ) : (
                    <div className='text-center bg-white'>
                      <p className='text-sm font-medium text-gray-400'>
                        No files found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='mt-4 space-y-4 px-4 pb-10 mx-auto'>
            <h1 className='text-center text-4xl font-bold'>Add {assessmentName} - {subjectName}</h1>
            <p className='text-center'>
              Kindly select the appropriate options below:
            </p>

            <div>

              <div className='p-3 bg-[#F5F6F7] rounded-lg max-w-[334px] mx-auto'>
                <div className='bg-white border rounded p-4'>
                  <div className='border-b py-1 mb-2 flex items-center justify-between'>
                    <h1 className='text-lg text-[#A5A5A5]'>
                      {assessmentName}
                    </h1>
                  </div>
                  <div className='flex flex-col space-y-4'>
                    <div>
                      <label htmlFor='' className='text-xs font-bold text-left'>
                        Attach File<span className='text-[#E5A500]'>*</span>
                      </label>
                      <div
                        className={clsxm(
                          'mt-1 w-full border p-2 rounded'
                        )}
                      >
                        <input
                          type='text'
                          value={file.fileName ?? 'Select scripted lesson'}
                          placeholder='Select File'
                          onClick={handleToggleDocumentViewer}
                          className='w-full border-none outline-none cursor-pointer'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex item-center justify-center'>
            <button
              onClick={handleSubmit}
              className='max-w-[245px] w-full rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff]'
            >
              Finish
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AddTestExam;
