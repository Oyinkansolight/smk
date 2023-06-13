'use client';

import NextImage from '@/components/NextImage';
import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import PageCounter from '@/components/counter/PageCounter';
import TabBar from '@/components/layout/TabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiDashboardFill } from 'react-icons/ri';
import { Page as DocPage, Document, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className='layout flex flex-col gap-5'>
      <div className='flex flex-row gap-8 justify-between'>
        <div className='flex flex-col gap-5 w-full'>
          <div
            onClick={() => router.back()}
            className='flex items-center space-x-4'
          >
            <Image
              src='/svg/back_yellow.svg'
              width={10}
              height={10}
              alt='back'
              className='h-3 w-3'
            />
            <h3 className='text-[14px] font-bold'>Back</h3>
          </div>

          <div className='flex gap-x-4 font-semibold items-center text-lg leading-5 border border-[#eee] px-[10px] py-[3.5px] rounded w-fit text-[#C4C4C4]'>
            <div>Subjects</div>

            <Image
              src='/svg/back_yellow.svg'
              width={10}
              height={10}
              alt='back'
              className='h-3 w-3 rotate-180'
            />

            <div>Mathematics</div>

            <Image
              src='/svg/back_yellow.svg'
              width={10}
              height={10}
              alt='back'
              className='h-3 w-3 rotate-180'
            />

            <div>Week 1</div>

            <Image
              src='/svg/back_yellow.svg'
              width={10}
              height={10}
              alt='back'
              className='h-3 w-3 rotate-180'
            />

            <div className='text-[#3361FF]'>Period 1</div>
          </div>

          <div className='flex flex-col my-5 gap-[14px] bg-[#F9F9F9] rounded-[5px] px-5 pb-5 pt-[14px] max-w-[817px] w-full h-[97px]'>
            <div className='text-[#818181] font-semibold text-[14px] leading-5'>
              Topic
            </div>
            <div className='text-[#746D69] font-bold text-2xl'>
              Introduction to Prime Numbers
            </div>
          </div>

          <hr className='-mb-8' />
          <TabBar
            variant='secondary'
            selected={page}
            onSelect={(i) => setPage(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Lesson Note',
              },
              {
                icon: <GiHamburgerMenu className='h-5 w-5' />,
                label: 'Assignments',
              },
              {
                icon: <GiHamburgerMenu className='h-5 w-5' />,
                label: 'Class Work',
              },
              {
                icon: <GiHamburgerMenu className='h-5 w-5' />,
                label: 'Pop Quiz',
              },
            ]}
          />

          {page === 0 && (
            <div className='flex-1 mb-8 rounded-lg bg-white'>
              <div className='flex justify-center p-8'>
                <PageCounter
                  page={currentPage}
                  maxPage={numberOfPages}
                  onChange={setCurrentPage}
                />
              </div>
              <Document
                file='/pdfs/EDO LANGUAGE SS2 3RD TERM WEEK 3.pdf'
                onLoadSuccess={(v) => {
                  setNumberOfPages(v.numPages);
                }}
              >
                <DocPage pageNumber={currentPage} />
              </Document>
            </div>
          )}

          {page === 1 && (
            <div className='flex flex-col gap-[14px] bg-[#FAFAFA] py-[14px] px-5 rounded-[5px]'>
              <div className='h3'>Class Work</div>
              <div className='flex flex-col gap-[14px]'>
                <AssignmentCard
                  title='Introduction to Prime Numbers'
                  status='completed'
                />
                <AssignmentCard title='Introduction to Atoms' />
              </div>
            </div>
          )}

          {page === 2 && (
            <div className='flex flex-col gap-[14px] bg-[#FAFAFA] py-[14px] px-5 rounded-[5px]'>
              <div className='h3'>Class Work</div>
              <div className='flex flex-col gap-[14px]'>
                <AssignmentQuestionView
                  question='1. What is 2 + 2?'
                  options={['4', '6', '5', '7']}
                />
                <AssignmentQuestionView
                  question='2. What is 2 + 2?'
                  options={['4', '6', '5', '7']}
                />
              </div>
            </div>
          )}

          {page === 3 && (
            <div className='flex flex-col gap-[14px] bg-[#FAFAFA] py-[14px] px-5 rounded-[5px]'>
              <div className='h3'>Pop Quiz</div>
              <div className='flex flex-col gap-[14px]'>
                <AssignmentQuestionView
                  question='1. What is 2 + 2?'
                  options={['4', '6', '5', '7']}
                />
                <AssignmentQuestionView
                  question='2. What is 2 + 2?'
                  options={['4', '6', '5', '7']}
                />
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-10'>
          <div className='flex flex-col items-center justify-between w-[296px] h-[256px] rounded border border-[#3361FF] py-5'>
            <div className='text-[#3361FF] text-[14px] font-semibold leading-5'>
              Teacher
            </div>
            <BigAvatar src='/images/teacher_1.png' />
            <div className='h4 font-semibold'>Santos Igbhosa</div>
          </div>

          <div className='flex flex-col items-center justify-between w-[296px] h-[111px] rounded border border-[#3361FF] py-5'>
            <div className='text-[#3361FF] text-[14px] font-semibold leading-5'>
              Attendance Status
            </div>
            <div className='h4 font-semibold text-[#9FE2C3]'>Present</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AssignmentCardProps {
  title: string;
  status?: 'completed' | 'pending' | 'overdue';
}

function AssignmentCard({ title, status = 'pending' }: AssignmentCardProps) {
  return (
    <div className='w-full bg-white rounded-[10px] h-[93px] max-w-[775px] px-[22px] py-5 cursor-pointer'>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-row gap-6'>
          <NextImage
            width={57}
            height={54}
            alt='Assignment Icon'
            src='/images/sidebar-icons/Assignment.png'
          />

          <div className='flex flex-col gap-1'>
            <div className='text-[#615E83] font-bold text-2xl leading-7'>
              {title}
            </div>
            <div
              className={clsxm(
                status === 'completed' && 'bg-[#08643A]',
                status === 'pending' && 'bg-[#E0A03B]',
                'flex items-center justify-center w-[109px] h-[24px] rounded text-white text-[10px] font-semibold capitalize'
              )}
            >
              {status}
            </div>
          </div>
        </div>

        <div>
          <BiChevronRight className='w-[50px] h-[50px]' />
        </div>
      </div>
    </div>
  );
}

export default Page;
