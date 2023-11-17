// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import EmptyView from '@/components/misc/EmptyView';
import { ResponsiveBar } from '@nivo/bar';

const SuperGenderDistribution = ({ data }) => {
  
  const dataKeys = Object.keys(data ?? {});
  const parsedData = dataKeys.map((item) => ({
    staffColor: '#5754F7',
    studentColor: '#35CFFF',
    staff: data[item].staff,
    student: data[item].student,
    gender: item[0].toUpperCase(),
  }));

  const totalSum = dataKeys.reduce((acc, curr) => {
    return acc + data[curr].student + data[curr].staff;
  }, 0);

  console.log(totalSum);

  const isEmpty =
    !data || !dataKeys?.length || !parsedData?.length || totalSum === 0;

  if (isEmpty) {
    return <EmptyView label='No Data' />;
  }

  return (
    <div className='h-80'>
      <ResponsiveBar
        padding={0.3}
        indexBy='gender'
        innerPadding={5}
        data={parsedData}
        groupMode='grouped'
        keys={['student', 'staff']}
        margin={{ top: 0, right: 30, bottom: 60, left: 60 }}
        valueScale={{ type: 'linear' }}
        colors={(p) =>
          p.data[`${p.id}Color` as keyof (typeof data)[number]] as string
        }
        layout='vertical'
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        enableGridY={true}
        borderRadius={16}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: +1,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default SuperGenderDistribution;
