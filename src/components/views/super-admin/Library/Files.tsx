'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import AssignSubject from '@/components/modal/assignSubject';
import CreateFolder from '@/components/modal/createFolder';
import UpdateFolder from '@/components/modal/updateFolder';
import Table from '@/components/tables/TableComponent';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import {
  useAssignSubjectsToFile,
  useAssignSubjectsToFolder,
  useDeleteFile,
  useDeleteFolder,
  useGetFileById,
  useGetFolderAndFiles,
} from '@/server/library';
import { UserFile, UserFolder } from '@/types/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdArrowBackIos } from 'react-icons/md';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import FileContent from '~/svg/file.svg';
import VideoContent from '~/svg/media.svg';
import Folder from '~/svg/folder.svg';
import CustomPDFReader from '@/components/pdfReader/Reader';
import UploadMaterial from '@/components/modal/UploadMaterial';

type TableItemData = (UserFolder | UserFile) & {
  idx: number;
  fileType: string;
  isAssign: boolean;
  action: number | null;
  isUpdateFolder: boolean;
  setFileId: (value: string) => void;
  setFolderId: (value: string) => void;
  openModal: (fileUrl: string) => void;
  setisAssign: (value: boolean) => void;
  setFolderName: (value: string) => void;
  setAction: (value: number | null) => void;
  setIsUpdateFolder: (value: boolean) => void;
  onFolderClick: (folderId: UserFolder) => void;
  // setDeleteFolderId: (folderId: string) => void;
  // setDeleteFileId: (fileId: string) => void;
  setConentType: (fileId: string) => void;
  toggleDeleteModal: () => void;
};

const columns: TableColumn<TableItemData>[] = [
  {
    name: 'Name',
    grow: 2,
    cell: (item) => {
      if ('fileUrl' in item) {
        return (
          <div className='col-span-4 w-max text-center text-[#525F7F] pl-2 flex space-x-2 items-center'>
            <div>
              {item.fileType === 'video' ? (
                <VideoContent className='h-6 w-6' />
              ) : (
                <FileContent className='h-6 w-6' />
              )}
            </div>
            <h2
              onClick={() => {
                item?.fileUrl && item.openModal(item.fileUrl);
              }}
              className='text-sm font-medium cursor-pointer'
            >
              {item?.filename}
            </h2>
          </div>
        );
      } else if ('folderName' in item) {
        return (
          <div
            onClick={() => item.id && item.onFolderClick(item)}
            className='col-span-4 cursor-pointer w-max text-center text-[#525F7F] pl-2 flex space-x-2 items-center'
          >
            <div>
              <Folder className='h-6 w-6' />
            </div>
            <h2 className='text-sm font-medium'>{item?.folderName}</h2>
          </div>
        );
      }
    },
  },
  {
    name: 'Subject',
    cell: (item) => {
      if ('fileUrl' in item) {
        return (
          <div className='col-span-2'>
            {(item?.subject?.length ?? 0) > 0
              ? (item?.subject ?? []).map((v) => v.name).join(', ')
              : '-'}{' '}
          </div>
        );
      } else if ('folderName' in item) {
        return (
          <div className='col-span-2'>
            {(item?.subject?.length ?? 0) > 0
              ? (item?.subject ?? []).map((v) => v.name).join(', ')
              : '-'}{' '}
          </div>
        );
      }
    },
  },
  {
    name: 'Created By',
    cell: (item) => {
      if ('fileUrl' in item) {
        return (
          <div className='col-span-2'>
            {item?.createdBy?.firstName} {item?.createdBy?.lastName}
          </div>
        );
      } else if ('folderName' in item) {
        return (
          <div className='col-span-2'>
            {item?.createdBy?.firstName} {item?.createdBy?.lastName}
          </div>
        );
      }
    },
  },
  {
    name: 'Date Added',
    cell: (item) => {
      if ('fileUrl' in item) {
        return (
          <h2 className='text-sm font-normal'>
            {moment(item?.createdAt).format('ll')}
          </h2>
        );
      } else if ('folderName' in item) {
        return (
          <h2 className='text-sm font-normal'>
            {moment(item?.createdAt).format('ll')}
          </h2>
        );
      }
    },
  },
  {
    name: 'Size',
    cell: (item) => {
      if ('fileUrl' in item) {
        return <div>{item?.size ?? '-'}</div>;
      } else if ('folderName' in item) {
        return <div>{item?.size ?? '-'}</div>;
      }
    },
  },
  {
    name: '',
    grow: 0,
    width: '20px',
    cell: (item) => {
      if ('fileUrl' in item) {
        return (
          <div>
            <div
              onClick={() => {
                item.setAction(item.idx + 1);
              }}
              className='relative'
            >
              <BsThreeDotsVertical className='text-lg' />

              {item.action == item.idx + 1 && (
                <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[180px] z-10'>
                  <button
                    onClick={() => {
                      item.setisAssign(!item.isAssign);
                      item.setFileId(item?.id ?? '');
                      item.setConentType('file');
                    }}
                    className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                  >
                    Assign to a Subject
                  </button>
                  <button className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'>
                    Rename
                  </button>
                  <button
                    onClick={() => {
                      // item.setDeleteFileId(item?.id ?? '');
                      item.setFileId(item?.id ?? '');
                      item.setConentType('file');
                      item.toggleDeleteModal();
                    }}
                    className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            {item.action && (
              <div
                className='fixed inset-0 z-[1]'
                onClick={() => {
                  item.setAction(null);
                }}
              ></div>
            )}
          </div>
        );
      } else if ('folderName' in item) {
        return (
          <div>
            <div
              onClick={() => {
                item.setAction(item.idx + 1);
              }}
              className='relative'
            >
              <BsThreeDotsVertical className='text-lg' />

              {item.action == item.idx + 1 && (
                <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[180px] z-10'>
                  <button
                    onClick={() => {
                      item.setisAssign(!item.isAssign);
                      item.setFolderId(item?.id ?? '');
                      item.setConentType('folder');
                    }}
                    className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                  >
                    Assign to a Subject
                  </button>
                  <button
                    onClick={() => {
                      item.setIsUpdateFolder(!item.isUpdateFolder);
                      item.setFolderName(item?.folderName ?? '');
                      item.setFolderId(item?.id ?? '');
                    }}
                    className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => {
                      item.setFolderId(item?.id ?? '');
                      item.setConentType('folder');
                      item.toggleDeleteModal();
                    }}
                    className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            {item.action && (
              <div
                className='fixed inset-0 z-[1]'
                onClick={() => {
                  item.setAction(null);
                }}
              ></div>
            )}
          </div>
        );
      }
    },
  },
];

const UploadDocument = ({
  variant,
  canUpload = true,
}: {
  variant?: string;
  canUpload?: boolean;
}) => {
  const {
    getValues,
    formState: { errors },
    control,
    setValue,
    reset,

    // handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [isUpdateFolder, setIsUpdateFolder] = useState(false);
  const [isAssign, setisAssign] = useState(false);
  const [action, setAction] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderId, setFolderId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [url, setUrl] = useState('');
  const [contentType, setConentType] = useState('');
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const toggleDeleteModal = () => {
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

  const [folderTrail, setFolderTrail] = useState<UserFolder[]>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openModal = (fileUrl: string) => {
    logger(fileUrl);
    setCurrentFile(fileUrl);
    toggleModal();
  };

  const toggleUploadModal = () => {
    setOpenUploadModal(!openUploadModal);
  }

  const {
    data: folderContent,
    refetch: refetchFolderFiles,
    isLoading: isLoadingFolderFiles,
  } = useGetFolderAndFiles(folderTrail[folderTrail.length - 1]?.id);

  const { data: fileObject, refetch: refetchFile } = useGetFileById(fileId);

  useEffect(() => {
    reset({
      class: [],
      subject: [],
      schoolType: [],
    });
    if (fileId) {
      refetchFile();
    }
  }, [fileId, refetchFile, reset]);

  useEffect(() => {
    if (fileObject) {
      setValue(
        'subject',
        fileObject.subject?.map((v) => ({ label: v.name, value: v.id })),
        { shouldValidate: true }
      );
    }
  }, [fileObject, setValue]);

  useEffect(() => {
    logger(currentFile);
    if (isModalOpen) {
      const getFileURL = async () => {
        await getURL(currentFile).then((v) => setUrl(v));
        logger(url);
      };
      getFileURL();
    } else {
      setCurrentFile('');
    }
  }, [currentFile, isModalOpen, url]);

  const handleUseAssignSubjectsToFile = useAssignSubjectsToFile();
  const handleUseAssignSubjectsToFolder = useAssignSubjectsToFolder();
  const handleFolderDelete = useDeleteFolder();
  const handleFileDelete = useDeleteFile();

  function handleIsCreateFolderModal() {
    setIsCreateFolder(!isCreateFolder);
  }

  function handleIsAssignModal() {
    setisAssign(!isAssign);
  }

  function handleIsUpdateFolderModal() {
    setIsUpdateFolder(!isUpdateFolder);
  }

  // const [content, setContent] = useState<UserFile[] | undefined>([]);

  const handleAssignSubject = async () => {
    setLoading(true);
    let response;
    try {
      if (contentType === 'file') {
        response = await handleUseAssignSubjectsToFile.mutateAsync({
          fileId,
          subjectId:
            (
              getValues('subject') as
              | { label: string; value: number }[]
              | undefined
            )?.map((s) => s.value ?? '0') ?? [],
        });
      } else {
        response = await handleUseAssignSubjectsToFolder.mutateAsync({
          folderId,
          subjectId:
            (
              getValues('subject') as
              | { label: string; value: number }[]
              | undefined
            )?.map((s) => s.value ?? '0') ?? [],
        });
      }

      if (response) {
        toast.success('Content assigned successful');
        setLoading(false);
        setisAssign(!isAssign);
      }
    } catch (error) {
      toast.error('An error occured');
      setLoading(false);
    }
  };

  const handleFolderDeletion = async () => {
    setLoading(true);
    try {
      const response = await handleFolderDelete.mutateAsync(folderId);

      if (response) {
        toast.success('Folder deleted successfully');
        toggleDeleteModal();
        setLoading(false);
        refetchFolderFiles();
      }
    } catch (error) {
      toast.error('An error occurred');
      setLoading(false);
    }
  };

  const handleFileDeletion = async () => {
    setLoading(true);
    try {
      const response = await handleFileDelete.mutateAsync(fileId);

      if (response) {
        toast.success('File deleted successfully');
        toggleDeleteModal();
        setLoading(false);
        refetchFolderFiles();
      }
    } catch (error) {
      toast.error('An error occurred');
      setLoading(false);
    }
  };

  if (!isLoadingFolderFiles) {
    return (
      <>
        <ControlledModal
          isOpen={isModalDeleteOpen}
          toggleModal={toggleDeleteModal}
          content={
            <DeleteModalContent
              title={`Delete ${contentType === 'file' ? 'File' : 'Folder'}`}
              body={`Are you sure you want to delete this  ${contentType === 'file' ? 'file' : 'folder'
                }?`}
              toggleModal={toggleDeleteModal}
              handleDelete={
                contentType === 'file'
                  ? handleFileDeletion
                  : handleFolderDeletion
              }
            />
          }
          className='max-w-[777px] w-full h-[267px]'
        />
        <ControlledModal
          className='mt-40 lg:mt-20'
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          content={
            <div className='flex items-stretch gap-10'>
              <div className='flex-1 rounded-lg bg-white min-h-[50rem] overflow-hidden'>
                <div className='flex justify-center'>
                  {url.length > 0 && (
                    <CustomPDFReader url={url} />
                  )}
                </div>
              </div>
            </div>
          }
        />

        <ControlledModal
          className='mt-10'
          isOpen={openUploadModal}
          toggleModal={toggleUploadModal}
          content={
            <UploadMaterial
              toggleUploadModal={toggleUploadModal}
              folderId={folderTrail[folderTrail?.length - 1]?.id}
              folderName={folderTrail[folderTrail?.length - 1]?.folderName}
            />
          }
        />

        <section className='transition-all ease-in-out delay-1000 w-full max-w-[40rem] lg:max-w-full'>
          {isCreateFolder && (
            <CreateFolder
              onClickHandler={handleIsCreateFolderModal}
              addNewFolder={() => 'true'}
              parentFolder={folderTrail[folderTrail.length - 1]}
            />
          )}
          {isAssign && (
            <AssignSubject
              control={control}
              errors={errors}
              loading={loading}
              onClickHandler={handleIsAssignModal}
              handleSubmit={handleAssignSubject}
            />
          )}
          {isUpdateFolder && (
            <UpdateFolder
              folderId={folderId}
              folderName={folderName}
              onClickHandler={handleIsUpdateFolderModal}
            />
          )}

          <div className='mb-6 flex  items-end relative'>
            {folderTrail.length > 0 && (
              <div
                onClick={() => {
                  const c = [...folderTrail];
                  c.pop();
                  setFolderTrail(c);
                }}
                className='flex gap-4 font-bold items-center cursor-pointer rounded bg-gray-200 py-1 px-3'
              >
                <MdArrowBackIos className='h-5 w-5' /> <div>Back</div>
              </div>
            )}

            <div className='flex-1' />
            {canUpload && (
              <div>
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className={clsxm(
                    variant === 'secondary' && '!border-blue-500 text-blue-500',
                    variant === 'primary' && 'border-[#016938] text-[#016938]',
                    'w-max flex items-center rounded border px-6 py-3 text-center text-xs font-semibold bg-white'
                  )}
                >
                  Add Document
                  <span className='ml-4'>
                    <svg
                      width='10'
                      height='7'
                      viewBox='0 0 10 7'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M0.635629 1.10707C0.799992 0.93941 1.05719 0.924168 1.23843 1.06134L1.29036 1.10707L5.00003 4.8913L8.7097 1.10707C8.87407 0.93941 9.13127 0.924168 9.31251 1.06134L9.36443 1.10707C9.52879 1.27473 9.54374 1.53708 9.40926 1.72196L9.36443 1.77493L5.32739 5.89293C5.16303 6.06059 4.90583 6.07583 4.72459 5.93866L4.67267 5.89293L0.635629 1.77493C0.454831 1.5905 0.454831 1.29149 0.635629 1.10707Z'
                        fill='#016938'
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div
                    className='fixed inset-0 z-[9]'
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  />
                )}
                {isOpen && (
                  <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-white w-[160px] h-max absolute top-12 right-0 z-10'>
                    <button
                      onClick={() => {
                        setIsCreateFolder(!isCreateFolder);
                      }}
                      className='p-3 hover:bg-slate-100  text-left font-medium w-full'
                    >
                      Create Folder
                    </button>
                    {/* <input
                type='file'
                onChange={(e) => {
                  addNewFile(e);
                }}
                name='upload_file'
                id='upload_file'
                hidden
              /> */}
                    {/* <Link
                      href={`/super-admin/add-material${folderTrail.length > 0
                        ? `?folderId=${folderTrail[folderTrail.length - 1].id
                        }&folderName=${folderTrail[folderTrail.length - 1].folderName
                        }`
                        : ''
                        }`}
                    > */}
                    <label
                      onClick={toggleUploadModal}
                      htmlFor='upload_file'
                      className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
                    >
                      Upload File{' '}
                      {folderTrail.length > 0 &&
                        `To ${folderTrail[folderTrail.length - 1].folderName
                        }`}
                    </label>
                    {/* </Link> */}

                    {/* <input
                      type='file'
                      name='upload_folder'
                      id='upload_folder'
                      hidden
                    />

                    <label
                      htmlFor='upload_folder'
                      className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
                    >
                      Upload Folder
                    </label> */}
                  </div>
                )}
              </div>
            )}
          </div>

          <Table
            columns={columns}
            data={
              [...(folderContent ?? [])]
                ?.filter(
                  (item) => item.id !== folderTrail[folderTrail.length - 1]?.id
                )
                ?.map(
                  (item, idx) =>
                  ({
                    ...item,
                    action,
                    isAssign,
                    openModal,
                    setAction,
                    setisAssign,
                    idx: item.id ? item.id : idx,
                    setFileId,
                    onFolderClick: (folder) => {
                      const c = [...folderTrail];
                      c.push(folder);
                      setFolderTrail(c);
                      refetchFolderFiles();
                    },
                    // setDeleteFolderId: async (folderId) => {
                    //   handleFolderDeletion();
                    // },
                    // setDeleteFileId: async (fileId) => {
                    //   handleFileDeletion();
                    // },
                    setFolderId,
                    setFolderName,
                    isUpdateFolder,
                    setIsUpdateFolder,
                    setConentType,
                    toggleDeleteModal,
                  } as TableItemData)
                ) ?? []
            }
          />
        </section>
      </>
    );
  }

  return (
    <div className='flex justify-center items-center h-[40vh]'>
      <RotatingLines
        width='100'
        visible={true}
        strokeWidth='5'
        strokeColor='#4fa94d'
        animationDuration='0.75'
      />
    </div>
  );
};

export default UploadDocument;
