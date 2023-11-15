/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from '@/components/buttons/BackButton';
import clsxm from '@/lib/clsxm';
import { useGetSubjectList } from '@/server/institution';
import { useGetFolderAndFiles } from '@/server/library';
import { UserFolder } from '@/types/material';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import Close from '~/svg/close.svg';
import FileContent from '~/svg/file.svg';
import Folder from '~/svg/folder.svg';

interface propType {
  onClickHandler?: () => void;
  handleSubmit: () => void;
  periodsList: any;
  periodsUpdate: any;
  setperiodsUpdate: (v: any) => void;
}

function EditWeek({
  onClickHandler,
  handleSubmit,
  periodsList,
  periodsUpdate,
  setperiodsUpdate,
}: propType) {
  const params = useSearchParams();
  const { data } = useGetSubjectList({ limit: 100 });
  const subjectId = params?.get('id') as string;
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
  const [files, setFiles] = useState<Record<number, string>>({});
  const [folderTrail, setFolderTrail] = useState<UserFolder[]>([]);
  const subjectIdOrUndefined = folderTrail.length === 0 ? subjectId : undefined;
  const {
    data: folderContent,
    refetch: refetchFolderFiles,
    isLoading: isLoadingFolderFiles,
  } = useGetFolderAndFiles(
    folderTrail[folderTrail.length - 1]?.id,
    subjectIdOrUndefined
  );
  const [openDocumentViewer, setOpenDocumentViewer] = useState(false);

  const updateObjectInArray = (index: number, newValue: any) => {
    setperiodsUpdate((prevArray: any) => {
      const newArray = [...prevArray]; // Create a copy of the array
      newArray[index] = newValue; // Modify the object at the specified index
      return newArray; // Return the updated array
    });
  };
  const dayOrder = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  if (periodsList) {
    periodsList.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
  }

  const handleToggleDocumentViewer = (idx?: number) => {
    idx ? setCurrentPeriodIndex(idx) : setCurrentPeriodIndex(0);
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

    updateObjectInArray(currentPeriodIndex, {
      ...periodsUpdate[currentPeriodIndex],
      fileId,
    });

    setFiles({
      ...files,
      [currentPeriodIndex]: fileName,
    });

    handleToggleDocumentViewer();
  };

  // console.log(files);

  return (
    <div className='fixed inset-0 z-[99] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[800px] w-[500px] max-h-[700px] rounded overflow-y-auto flex-col space-y-4 bg-white p-4'>
        <div className='flex item-center justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        {openDocumentViewer ? (
          <div className='flex flex-col w-full h-full bg-white'>
            <div className='max-w-[100px]'>
              <BackButton onClick={handleToggleDocumentViewer} />
            </div>

            <div className='flex items-center bg-[#F5F6F7] w-full h-[55px] h3 px-6 mt-4'>
              Add Files to Period {currentPeriodIndex + 1}
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
            <div className='mt-4 space-y-4 px-4 pb-10'>
              <h1 className='text-center text-4xl font-bold'>Edit Week</h1>
              <p className='text-center'>
                Kindly select the appropriate options below:
              </p>

              <div>
                {data?.data && (
                  <div className='w-full grid md:grid-cols-2 gap-4 p-3 bg-[#F5F6F7] rounded-lg'>
                    {periodsList.map((v: any, idx: number) => (
                      <div key={v.id} className='bg-white border rounded p-4'>
                        <div className='border-b py-1 mb-2 flex items-center justify-between'>
                          <h1 className='text-lg text-[#A5A5A5]'>
                            Period {idx + 1}
                          </h1>
                          <h1 className='font-normal text-sm text-secondary'>
                            {v.day} - {v.startTime} - {v.endTime}
                          </h1>
                        </div>
                        <div className='flex flex-col space-y-4'>
                          <div>
                            <label htmlFor='' className='text-xs font-bold'>
                              Topic/Sub-Theme
                            </label>
                            <div
                              className={clsxm(
                                'mt-1 w-full border p-2 rounded'
                              )}
                            >
                              <input
                                type='text'
                                placeholder='Enter value'
                                value={periodsUpdate[idx]?.theme ?? ''}
                                className='w-full border-none outline-none'
                                onChange={(e) => {
                                  updateObjectInArray(idx, {
                                    ...periodsUpdate[idx],
                                    theme: e.target.value,
                                    periodId: v.id,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor='' className='text-xs font-bold'>
                              Title
                            </label>
                            <div
                              className={clsxm(
                                'mt-1 w-full border p-2 rounded'
                              )}
                            >
                              <input
                                type='text'
                                placeholder='Enter value'
                                className='w-full border-none outline-none'
                                value={periodsUpdate[idx]?.periodTitle ?? ''}
                                onChange={(e) => {
                                  updateObjectInArray(idx, {
                                    ...periodsUpdate[idx],
                                    periodTitle: e.target.value,
                                    periodId: v.id,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor='' className='text-xs font-bold'>
                              Attach File to Period*
                            </label>
                            <div
                              className={clsxm(
                                'mt-1 w-full border p-2 rounded'
                              )}
                            >
                              <input
                                type='text'
                                value={files[idx] ?? 'Select scripted lesson'}
                                placeholder='Select scripted lesson'
                                onClick={() => handleToggleDocumentViewer(idx)}
                                className='w-full border-none outline-none cursor-pointer'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='flex item-center justify-center'>
              <button
                onClick={handleSubmit}
                className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                Finish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditWeek;
