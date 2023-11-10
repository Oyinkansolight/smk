'use client';

import BackButton2 from "@/components/buttons/BackButton2";
import clsxm from "@/lib/clsxm";
import Image from "next/image";
import Link from "next/link";
import ReactSelect from "react-select";


const Page = ()=>{
  return <div>
    <div className="px-4 my-4">
     <BackButton2 onClick={()=>{}}/>
    </div>
    <div className="shadow-lg rounded-lg">
     <div className=" flex px-4 gap-4">
      <div className="h-12 w-12 bg-gray-200 rounded-full">

      </div>
      <div className="flex-1 flex flex-col items-start w-full">
        <div className="font-bold text-3xl">Allyon Styles</div>
        <div className="p-1 bg-[#AC4407] text-white rounded-full">Basic</div>
        <div className="text-end w-full">
          <span className="text-[#475467]">Date Added:</span> <span className="font-bold">15-05-2020</span>
        </div>
      </div>
     </div>
        <div className="flex flex-col gap-2 px-4">
          <LabelItem label="Email" text="Scalingheight@mail.com"/>
          <LabelItem label="Phone No" text="081010101010"/>
          <LabelItem label="Email" text="Beside A Building, Phase 1 Zone, Benin, Edo"/>
        </div>
        <div className="h-px w-full bg-gray-100"/>
        <div className="py-2 text-base text-center text-[#5754F7]">
          Edit Profile
        </div>
    </div>
    <div className="p-2 bg-[#5754F7] flex my-4 rounded-full gap-2">
      <ReactSelect className="flex-1 rounded-full border-none overflow-hidden" classNames={{control: ()=>'!border-none !outline-none'}} placeholder={<div className="font-bold text-ellipsis whitespace-nowrap">Select Academic Session</div>}/>
      <ReactSelect className=" rounded-full border-none overflow-hidden" classNames={{control: ()=>'!border-none !outline-none'}} placeholder={<div className="font-bold text-ellipsis whitespace-nowrap">Select Term</div>}/>
    </div>
    <div className="flex flex-col sm:flex-row">
      <ColorLabelItem label="Name of Institution" text="Scaling Heights Institution" className="bg-[#F0FFFF] flex-1"/>
      <ColorLabelItem label="Student Id" text="#123-BNA" className="bg-[#EAFDE3] flex-1"/>
    </div>
    <div className="flex flex-col sm:flex-row justify-stretch items-stretch">
      <ColorLabelItem label="Average Score" text="89%" className="bg-[#F4E7FF] flex-1"/>
      <ColorLabelItem label="Class Arm" text="Primary 1A" className="bg-white flex-1"/>
      <ColorLabelItem label="Total Subject" text="15" className="bg-[#F8F8FF] flex-1"/>
    </div>
    <div className="bg-white rounded-xl py-6 my-4">
      <div className="px-4 font-bold text-xl">Choose an action</div>
      <div className="h-px my-4 w-full bg-gray-100"/>
      <div className="grid grid-cols-2 gap-3 px-4">
        <ActionListItem icon={<Image height={50} width={50} alt='book' src={'/images/book.png'}/>} link='./new-student/subjects' label="Subjects"/>
        <ActionListItem icon={<Image height={50} width={50} alt='library' src={'/images/book_stack_2.png'}/>} label="Library"/>
        <ActionListItem icon={<Image height={50} width={50} alt='report card' src={'/images/report_card.png'}/>} label="Report Card"/>
        <ActionListItem icon={<Image height={50} width={50} alt='attendance' src={'/images/attendance.png'}/>} label="Attendance"/>
      </div>
    </div>
  </div>
}

function ActionListItem({icon, link, label}:{icon: JSX.Element, label: string, link?: string}) {
  return <div className="border-2 bg-[#F9F9FB] rounded-md flex flex-col p-4 items-center">
    {icon}
    <div className="text-[#8C8D99] text-lg">{label}</div>
    <Link href={link ?? '#'} className="text-[#5754F7]">Click to view details</Link>
  </div>
}

function ColorLabelItem({label, text, className}: {label: string, text: string, className: string}){
  return <div className={clsxm("py-4 px-2 rounded-lg overflow-hidden m-4", className)}>
    <div className="font-bold text-xl">{text}</div>
    <div className="text-[#626262]">{label}</div>
  </div>
}

function LabelItem({label, text}:{label: string, text: string}) {
  return <div className="flex flex-col">
    <div className="text-[#475467]">{label}</div>
    <div className="font-semibold text-base">{text}</div>
  </div>
}

export default Page
