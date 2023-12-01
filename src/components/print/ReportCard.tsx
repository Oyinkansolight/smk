'use client';

import React from 'react'
import Image from 'next/image'
import clsxm from '@/lib/clsxm'
import { ImImage } from 'react-icons/im'
import Button from '@/components/buttons/Button'
import BackButton from '@/components/accordions/BackButton';

const PrintedReportCard = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='flex flex-col py-10 max-w-[750px] mx-auto gap-8'>
      <div className='print:hidden flex items-center justify-between'>
        <BackButton />
        <Button onClick={handlePrint}>Print Report</Button>
      </div>

      {/* PRINTED SECTION */}
      <div className='bg-white flex flex-col w-full max-w-[750px] mx-auto h-full overflow-hidden px-[6px]'>
        <Header
          term="First"
          session="2022/2023"
          name="ST. MARIA GORETTI GIRLS GRAMMAR SCHOOL"
        />

        <span className='mt-[3px] mb-1'>
          <BioData />
        </span>

        <div className='grid grid-cols-2 grid-flow-col gap-[6px]'>
          <div className='flex flex-col col-span-9 w-full min-w-[434px]'>
            <Cognitive />
            <CommentObservation />
            <CognitiveKeys />
          </div>

          <div className='flex flex-col col-span-3 w-full gap-[6px]'>
            <AffectiveDomain />
            <PsychomotorDomain />
            <Overview />
          </div>
        </div>

      </div>
    </div>
  )
}

interface HeaderProps {
  term: string
  logo?: string
  name?: string
  session: string
  passport?: string
}

interface RowItemProps {
  title: string
  value: string
  capitalizeValue?: boolean
}

const Header = (props: HeaderProps) => {

  const PlaceholderImage = ({ title }) => {
    return (
      <div className='w-[85px] h-[85px] rounded-lg bg-gray-200 flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center mt-4'>
          <ImImage className='w-8 h-8 fill-gray-100' />
          <span className='font-medium text-[7px] -mt-1'>{title}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-[10px]'>
        {props.logo ?
          <Image
            alt='Logo'
            width={85}
            height={85}
            src={props.logo}
            className='rounded-lg'
          /> :
          <PlaceholderImage title='Logo' />
        }
      </div>

      <div className='grid grid-rows-4 items-center text-center justify-center max-h-[85px]'>
        <span className='font-extrabold text-4 leading-4'>
          {props.name}
        </span>

        <span className='font-bold text-[10px]'>
          Benin City, Edo State
        </span>

        <span className='font-bold text-[10px] mt-[6px]'>
          INFO@EDOSECONDARY-EDU.ORG
        </span>

        <span className='font-bold text-[10px]'>
          EDOSECONDARY-EDU.ORG
        </span>

        <span className='font-medium text-[13px] mt-[6px]'>
          {props.term} Term Report Sheet for {props.session} Session
        </span>
      </div>

      <div className='flex items-center gap-[10px]'>
        {props.passport ?
          <Image
            alt='Logo'
            width={85}
            height={85}
            src={props.passport}
            className='rounded-lg'
          /> :
          <PlaceholderImage title='Student Passport' />
        }
      </div>
    </div>
  )
}

const RowItem = ({ title, value, capitalizeValue }: RowItemProps) => (
  <div className='flex flex-row justify-between items-center'>
    <div className='uppercase font-semibold text-[7px] leading-3'>{title}</div>
    <div className={clsxm(
      'text-[10px] leading-3',
      capitalizeValue && 'uppercase'
    )}>
      {value}
    </div>
  </div>
);

const BioData = (props) => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <tr>
        <th>
          <div className='flex flex-col gap-[2px] w-full p-[6px]'>
            <RowItem title='Name' value='Ojomoh Aisosa' />
            <RowItem title='Sex' value='Female' />
            <RowItem title='Class' value='SS 1 FERRET' capitalizeValue />
            <RowItem title='Reg No' value='20221D65MG' capitalizeValue />
          </div>
        </th>

        <th className='border-x-2 border-black'>
          <div className='flex flex-col gap-[2px] w-full p-[6px]'>
            <RowItem title='CLASS POPULATION' value='59' />
            <RowItem title='MARKS OBTAINABLE' value='900' />
            <RowItem title='MARKS OBTAINED' value='504' />
            <RowItem title='STUDENT AVERAGE' value='63.000%' />
          </div>
        </th>

        <th>
          <div className='flex flex-col gap-[2px] w-full p-[6px]'>
            <RowItem title='NO OF TIMES SCHOOL OPENED' value='53' />
            <RowItem title='NO OF TIMES PRESENT' value='50' />
            <RowItem title='NO OF TIMES ABSENT' value='3' />
            <RowItem title='ATTENDANCE AVERAGE' value='94.12%' />
          </div>
        </th>
      </tr>
    </div>
  )
}

const Cognitive = () => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <thead>
        <tr>
          <td className='border-r-2 border-b-2 border-black p-1'>
            <div className='flex items-center gap-1'>
              <Image
                alt='Logo'
                width={10}
                height={10}
                src='/images/cube.png'
              />
              <span className='font-extrabold text-[10px] whitespace-nowrap'>COGNITIVE DOMAIN</span>
            </div>
          </td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-b-2 border-black p-1'></td>
        </tr>
      </thead>

      <tbody>
        <tr className='h-32'>
          <td rowSpan={6} className='relative text-[10px] font-extrabold border-r-2 border-b-2 border-black p-1'>
            <div className='absolute bottom-[7px] flex justify-start w-full whitespace-nowrap'>
              SUBJECTS
            </div>
          </td>
          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              CA 1 (15%)
            </div>
          </td>

          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              CA 2 (15%)
            </div>
          </td>

          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              EXAM (70%)
            </div>
          </td>

          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              TOTAL (100%)
            </div>
          </td>

          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              HIGHEST CLASS SCORE
            </div>
          </td>

          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              LOWEST CLASS SCORE
            </div>
          </td>

          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              SUBJECT POSITION
            </div>
          </td>

          <td rowSpan={1} className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'>
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              GRADE
            </div>
          </td>

          <td rowSpan={2} className='relative text-[10px] font-extrabold border-b-2 border-black p-1 w-[55px]'>
            <div className='absolute bottom-[7px] flex justify-start w-full whitespace-nowrap'>
              REMARK
            </div>
          </td>
        </tr>
      </tbody>

      <tbody className='text-[10px] font-black leading-3 text-[#3222EF]'>
        {Array(9).fill(0).map((_, i) => (
          <tr key={i}>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1 font-semibold text-black'
              )}>
              Subject Name
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              10
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              15
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              65
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              90
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              90
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              30
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              1st
            </td>
            <td
              className={clsxm(
                i !== 8 && 'border-b-2',
                'border-r-2 border-black p-1'
              )}
            >
              A
            </td>
            <td className={clsxm(
              i !== 8 && 'border-b-2',
              'border-black p-1 font-bold leading-[10px] text-black'
            )}>
              Excellent
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  )
}

const CommentObservation = () => {
  const SingleComment = ({ title, value }) => (
    <div className='text-[8px] inline leading-[10px]'>
      <span className='font-bold uppercase'>{title}:{" "}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className='table rounded-[2px] border-2 border-black w-full mt-[5px]'>
      <thead>
        <tr>
          <th className='border-b-2 border-black p-1'>
            <div className='flex items-center gap-1'>
              <Image
                alt='Logo'
                width={10}
                height={10}
                src='/images/cube.png'
              />
              <span className='font-extrabold text-[10px] whitespace-nowrap'>COMMENT / OBSERVATION</span>
            </div>
          </th>
        </tr>
      </thead>

      <div className='flex flex-col gap-1 p-1'>
        <div className='uppercase text-[9px] font-bold leading-[10px]'>ojomoh aisosa</div>

        <SingleComment
          title='ATTENTIVE'
          value='OJOMOH AISOSA exhibits a positive outlook and attentiveness in the class room and committed to doing her best.'
        />

        <SingleComment title='HONESTY' value='She is open, honest and can always be trusted with tasks assigned to her.' />

        <SingleComment title='NEATNESS' value='She always has upto 70% neat book work which  shows respect and high regard for her own work.' />

        <SingleComment title='Politeness' value='She is always very well  behaved during class time.' />

        <SingleComment title='punctuality' value='She sometimes arrives on time for school and prepared for class each day.' />

        <SingleComment title='confidence' value='Work o building more confidence and enthusiasm.' />

        <SingleComment title='attitude' value='She comes to class everyday ready and willing to learn.' />

        <SingleComment title='listening skills' value='OJOMOH AISOSA listens attentively and is always ready to respond with relevant and engaging questions.' />

        <SingleComment title='hand writing' value='She shows excellent understanding of note taking, spelling, grammar and punctuation.' />

        <SingleComment title='spoken english' value='She has a great deal of confidence when speaking in English Language.' />

        <SingleComment title='reading skills' value='She has ability to read with little or no assistance.' />

        <SingleComment title='homework' value='She puts in reasonable effort to complete her homework at times.' />

      </div>
    </div>
  )
}

const CognitiveKeys = () => {
  return (
    <div className='flex flex-row mt-[6px] gap-4'>
      <div className='table rounded-[2px] border-2 border-black w-full min-w-[215px]'>
        <div className='flex items-center gap-1 border-b-2 border-black p-1'>
          <Image
            alt='Logo'
            width={10}
            height={10}
            src='/images/cube.png'
          />
          <span className='font-extrabold text-[10px] whitespace-nowrap'>COGNITIVE DOMAIN</span>
        </div>

        <div className='flex flex-wrap uppercase font-bold text-[9px] leading-[10px] p-1 whitespace-break-spaces'>
          <div>excellent: 80-100: A+,{" "}</div>
          <div>very good: 70-79: A,{" "}</div>
          <div>good: 60-69: B,{" "}</div>
          <div>fair: 50-59: C,{" "}</div>
          <div>poor: 40-49: D,{" "}</div>
          <div>fail: 0-39: F{" "}</div>
        </div>

        <div className='flex items-center gap-1 border-y-2 border-black p-1'>
          <Image
            alt='Logo'
            width={10}
            height={10}
            src='/images/cube.png'
          />
          <span className='font-extrabold text-[10px] whitespace-nowrap uppercase'>affective/psychomotor keys</span>
        </div>

        <div className='flex flex-wrap uppercase font-bold text-[9px] leading-[10px] p-1 whitespace-break-spaces'>
          <div>excellent: 5,{" "}</div>
          <div>very good: 4,{" "}</div>
          <div>good: 3,{" "}</div>
          <div>normal: 1,{" "}</div>
          <div>fair: 2,{" "}</div>
          <div>no tick: <span className='lowercase'>not recorded</span>{" "}</div>
        </div>

      </div>

      <div className='flex flex-col gap-[13px] rounded-[2px] border-2 border-black w-full p-[9px] uppercase font-bold text-[8px] leading-[10px] h-[98px]'>
        <div className='flex flex-row justify-between items-center'>
          <div>principal:</div>
          <div>stella abu-osagie</div>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <div>signature:</div>
          <div>
            <Image
              alt='Logo'
              width={75}
              height={10}
              src='/images/principal_signature.png'
            />
          </div>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <div>this term ends:</div>
          <div>31/03/2023</div>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <div>next term begins:</div>
          <div>24/04/2023</div>
        </div>
      </div>
    </div>
  )
}

//*Sub-component of AffectiveDomain and PsychomotorDomain
const SingleDomain = ({ title, value, noBottomBorder = false }) => (
  <tr>
    <td
      className={clsxm(
        noBottomBorder ? '' : 'border-b-2',
        'border-r-2 border-black p-1 font-semibold text-black'
      )}>
      {title}
    </td>
    <td
      className={clsxm(
        noBottomBorder ? '' : 'border-b-2',
        'border-r-2 border-black p-1'
      )}
    >
      {Number(value) === 5 &&
        <Image
          alt='Logo'
          width={11}
          height={11}
          src='/images/check_mark.png'
        />}
    </td>
    <td
      className={clsxm(
        noBottomBorder ? '' : 'border-b-2',
        'border-r-2 border-black p-1'
      )}
    >
      {Number(value) === 4 &&
        <Image
          alt='Logo'
          width={11}
          height={11}
          src='/images/check_mark.png'
        />}
    </td>
    <td
      className={clsxm(
        noBottomBorder ? '' : 'border-b-2',
        'border-r-2 border-black p-1'
      )}
    >
      {Number(value) === 3 &&
        <Image
          alt='Logo'
          width={11}
          height={11}
          src='/images/check_mark.png'
        />}
    </td>
    <td
      className={clsxm(
        noBottomBorder ? '' : 'border-b-2',
        'border-r-2 border-black p-1'
      )}
    >
      {Number(value) === 2 &&
        <Image
          alt='Logo'
          width={11}
          height={11}
          src='/images/check_mark.png'
        />}
    </td>
    <td
      className={clsxm(
        noBottomBorder ? '' : 'border-b-2',
        'border-black p-1'
      )}
    >
      {Number(value) === 1 &&
        <Image
          alt='Logo'
          width={11}
          height={11}
          src='/images/check_mark.png'
        />}
    </td>
  </tr>
);

const AffectiveDomain = () => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <thead>
        <tr>
          <th className='p-1'>
            <div className='flex items-center gap-1'>
              <Image
                alt='Logo'
                width={10}
                height={10}
                src='/images/cube.png'
              />
              <span className='font-extrabold text-[10px] whitespace-nowrap leading-3'>
                AFFECTIVE DOMAIN
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className=''>
          <td className='relative text-[10px] font-extrabold border-r-2 border-t-2 border-b-2 border-black p-1'>BEHAVIORS</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>5</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>4</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>3</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>2</td>

          <td className='relative max-w-[18px] border-b-2 border-t-2 border-black p-1'>1</td>
        </tr>
      </tbody>

      <tbody className='text-[10px] font-black leading-3 text-[#3222EF]'>
        <SingleDomain title='attentiveness' value='5' />
        <SingleDomain title='honesty' value='5' />
        <SingleDomain title='neatness' value='4' />
        <SingleDomain title='politeness' value='5' />
        <SingleDomain title='punctuality' value='4' />
        <SingleDomain title='confidence' value='3' />
        <SingleDomain title='attitude' value='5' noBottomBorder />
      </tbody>
    </div>
  )
}

const PsychomotorDomain = () => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <thead>
        <tr>
          <th className='p-1'>
            <div className='flex items-center gap-1'>
              <Image
                alt='Logo'
                width={10}
                height={10}
                src='/images/cube.png'
              />
              <span className='font-extrabold text-[10px] whitespace-nowrap leading-3'>
                PSYCHOMOTOR DOMAIN
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className=''>
          <td className='relative text-[10px] font-extrabold border-r-2 border-t-2 border-b-2 border-black p-1'>SKILLS</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>5</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>4</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>3</td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>2</td>

          <td className='relative max-w-[18px] border-b-2 border-t-2 border-black p-1'>1</td>
        </tr>
      </tbody>

      <tbody className='text-[10px] font-black leading-3 text-[#3222EF]'>
        <SingleDomain title='listening skills' value='5' />
        <SingleDomain title='hand writing' value='5' />
        <SingleDomain title='spoken english' value='4' />
        <SingleDomain title='reading skills' value='5' />
        <SingleDomain title='homework' value='4' />
        <SingleDomain title='outdoor games' value='3' />
        <SingleDomain title='vocational skills' value='3' noBottomBorder />
      </tbody>
    </div>
  )
}

const Overview = () => {
  const SingleItem = ({ title, value }) => (
    <div className='flex flex-col p-[6px]'>
      <div className='text-[7px] uppercase font-bold leading-[9px]'>{title}</div>
      <div className='text-[12px] font-bold text-[#2E9CF5] leading-[14px]'>{value}</div>
    </div>
  )

  return (
    <div className='rounded-[2px] border-2 border-black w-full p-[5px] divide-black divide-y-2 gap-[6px]'>
      <SingleItem title='total score:' value='504/900' />
      <SingleItem title='position in class:' value='1/45' />
      <SingleItem title='passes/failed:' value='8/0' />
    </div>
  )
}

export default PrintedReportCard