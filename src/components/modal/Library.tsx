import BackButton from '@/components/buttons/BackButton';
import { useGetFolderAndFiles } from '@/server/library';
import { UserFolder } from '@/types/material';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { TbArrowBackUp } from 'react-icons/tb';
import FileContent from '~/svg/file.svg';
import Folder from '~/svg/folder.svg';

interface propType {
  onClickHandler?: () => void;
  setFiles?: (v: any) => void;
  files?: {
    name: string;
    id: string;
  }[];
}

//Change to trigger build

function AddFile({ onClickHandler, setFiles, files }: propType) {
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
  // const [files, setFiles] = useState<Record<number, string>>({});
  const [folderTrail, setFolderTrail] = useState<UserFolder[]>([]);
  const [openDocumentViewer, setOpenDocumentViewer] = useState(false);

  const subjectIdOrUndefined = folderTrail.length === 0 ? '1' : undefined;
  const {
    data: folderContent,
    refetch: refetchFolderFiles,
    isLoading: isLoadingFolderFiles,
  } = useGetFolderAndFiles(folderTrail[folderTrail.length - 1]?.id);
  const onFolderClick = (folder) => {
    const c = [...folderTrail];
    c.push(folder);
    setFolderTrail(c);
    refetchFolderFiles();
  };

  const handleToggleDocumentViewer = (idx?: number) => {
    // idx ? setCurrentPeriodIndex(idx) : setCurrentPeriodIndex(0);
    setOpenDocumentViewer(!openDocumentViewer);
  };
  const handleAssignFileToPeriod = (fileId, fileName) => {
    setFolderTrail([]);

    // updateObjectInArray(currentPeriodIndex, {
    //   ...periodsUpdate[currentPeriodIndex],
    //   fileId,
    // });

    onClickHandler && onClickHandler();

    // setFiles({
    //   ...files,
    //   [currentPeriodIndex]: fileName,
    // });
    setFiles &&
      setFiles((prevFile) => {
        console.log(prevFile);
        if (!prevFile) {
          return [
            {
              name: fileName,
              id: fileId,
            },
          ];
        } else
          return [
            ...prevFile,
            {
              name: fileName,
              id: fileId,
            },
          ];
      });

    handleToggleDocumentViewer();
  };
  return (
    <div className='fixed inset-0 z-[99999] py-8 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex flex-col  rounded-md p-4 bg-white !h-[400px] overflow-y-auto md:w-[500px] w-full'>
        <div className='flex justify-between items-center'>
          <div className='max-w-[100px]'>
            <BackButton onClick={handleToggleDocumentViewer} />
          </div>
          <button
            onClick={() => {
              onClickHandler && onClickHandler();
            }}
          >
            <IoClose className='w-6 h-6 ' />
          </button>
        </div>

        <div className='flex items-center bg-[#F5F6F7] w-full h-[55px] h3 px-6 mt-4'>
          Add files to message
        </div>

        <div className='flex flex-col'>
          <div className='flex items-center bg-[#F6F9FC] w-full h-[55px] h4 px-6'>
            Name
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
                  (item) => item.id !== folderTrail[folderTrail.length - 1]?.id
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
    </div>
  );
}

export default AddFile;
