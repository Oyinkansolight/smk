export default function SmallDropdown(props: {
    label: string;
    options: { label: string; value: string }[];
}) {
    return (
        <div className='hidden flex-row gap-x-1 md:flex'>
            <div className='my-auto text-xs text-[#999999]'>{props.label}</div>

            <div className='my-auto'>
                <select
                    placeholder='select option'
                    className='rounded-[0.125rem] border-[#B8B8B8] text-xs'
                >
                    {props.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
