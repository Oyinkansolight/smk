import clsxm from '@/lib/clsxm';

export default function CircularCheckboxPrimary({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsxm(
        'relative h-5 w-5 rounded-full border border-primary',
        checked ? '' : 'bg-white'
      )}
    >
      <div
        className={clsxm(
          'absolute inset-[2px] bg-primary rounded-full',
          !checked && 'hidden'
        )}
      ></div>
    </div>
  );
}
