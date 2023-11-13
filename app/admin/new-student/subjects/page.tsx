'use client';

import BackButton2 from "@/components/buttons/BackButton2";
import SearchInput from "@/components/input/SearchInput";
import BreadCrumbs2 from "@/components/navigation/BreadCrumbs2";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


const Page = () => {
  return <div>
    <div className="px-4 my-4 flex">
      <BackButton2 onClick={() => { }} />
      <BreadCrumbs2 items={[{ label: "Students Page", link: '/admin/new-student' }, { label: "Subjects" }]} />
    </div>
    <div className=" rounded-lg p-8 bg-[#FFF4DF] border border-[#E4E7EC]">
      <div className="flex  gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full">
        </div>
        <div className="flex-1 flex flex-col items-start w-full">
          <div className="font-bold text-3xl">Allyon Styles</div>
          <div className="h-3" />
          <div className="flex flex-1 justify-between w-full">
            <div className="p-2 bg-[#AC4407] font-bold text-white rounded-full">Basic</div>
            <div className="hidden md:flex justify-start gap-10">
              <div>
                <span className="text-[#475467]">Academic Session:</span> <span className="font-bold text-base">2020/2021</span>
              </div>
              <div>
                <span className="text-[#475467]">Term:</span> <span className="font-bold text-base">1st Term</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden my-8 justify-start gap-10 w-full">
        <div>
          <span className="text-[#475467]">Academic Session:</span> <span className="font-bold text-base">2020/2021</span>
        </div>
        <div>
          <span className="text-[#475467]">Term:</span> <span className="font-bold text-base">1st Term</span>
        </div>
      </div>
    </div>
    <div className="h-12" />
    <div className="bg-white rounded-xl">
      <div className="p-6">
        <div className="text-lg font-semibold">Subjects</div>
        <div className="text-[#7B7B7B]">The list of subjects the student is offering in the term.</div>
      </div>
      <div className="h-px bg-[#E4E7EC]" />
      <div className="p-6">
        <div className="border flex justify-between rounded-lg border-gray-200 p-6">
          <div>
            <span className="text-[#999999]">Class: </span><span className="text-xl font-semibold">Primary 1</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[#999999]">Class Teacher:</div>
            <div className="flex">
              <Image src="/images/class-teacher.png" alt='class teacher' height={20} width={20} />
              <div className="font-extrabold text-[#8898AA] text-base">James Grace</div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-[#E4E7EC]" />
      <div className="p-6">
        <SearchInput className="border rounded-full" placeholder="Search here" />
      </div>
      <div className="flex flex-col gap-3 p-6">
        {
          Array(10).fill(0).map((item, i) => <SubjectListItem key={i} name="Mathematics" classes={6} />)
        }
      </div>
      <div className="h-px bg-[#E4E7EC]" />
      <div className="flex p-6 items-center justify-between">
        <div>Page 1 of 30</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border">
            <BsArrowLeft className="h-8 w-8" />
            <div className="text-base fond-bold">Previous</div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border">
            <div className="text-base fond-bold">Next</div>
            <BsArrowRight className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  </div>
}

function SubjectListItem({ name, classes }: { name: string, classes: number }) {
  return <div className="flex py-4 px-4 rounded-lg border-l-2 border-[#FFCAAB] bg-[#FFF8F4]">
    <div className="flex-1">
      <div className="font-bold text-2xl">{name}</div>
      <div className="font-bold"><span className="font-normal text-[#98988E]">Classes: </span>{classes}</div>
    </div>
    <Image src="/images/book.png" alt='book' width={50} height={50} />
  </div>
}

export default Page
