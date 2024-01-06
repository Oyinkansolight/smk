'use client';

const colors = ['bg-[#e9fde2]', 'bg-[#fff7e9]', 'bg-[#f8f8ff]', 'bg-[#fffce3]'];

const Stat = ({ menu }) => {
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
      {menu.map((item: any, idx: number) => {
        return (
          <div
            key={idx}
            className={`${colors[idx]} rounded-lg space-y-2 px-2 py-3`}
          >
            <h2 className='text-xl'>{item.value}</h2>
            <p className='text-xs text-gray-400'>{item.label} </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stat;
