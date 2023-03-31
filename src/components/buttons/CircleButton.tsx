export default function CircleButton({
  icon,
  onClick,
}: {
  icon: JSX.Element;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white text-[#C3CAD9] shadow-sm transition-colors duration-200 hover:bg-gray-200'
    >
      {icon}
    </button>
  );
}
