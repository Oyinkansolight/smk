'use client';



const colors = ['bg-[#e9fde2]', 'bg-[#ffffff]', 'bg-[#f8f8ff]', 'bg-[#fffce3]'];

const Stat = ({ menu }) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
      {menu.map((item, idx) => {
        return (
          <div key={item.value} className={`${colors[idx]} rounded-lg space-y-2 px-2 py-3`}>
            <h2 className='text-base'>{item.value}</h2>
            <p className='text-[8px] text-gray-400'>{item.label} </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stat;
