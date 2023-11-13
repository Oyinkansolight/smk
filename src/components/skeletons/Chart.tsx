const ChartSkeleton = () => {
  return (
    <div role="status" className="min-h-[269px] w-full !rounded-[10px] border-2 border-[#DADEE6] !px-6 !pt-10 shadow animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
      <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
      <div className="flex items-baseline mt-4">
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6"></div>
        <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6"></div>
      </div>
    </div>
  )
}

export default ChartSkeleton