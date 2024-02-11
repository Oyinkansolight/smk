// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import EmptyView from '@/components/misc/EmptyView';
import { ResponsiveBar } from '@nivo/bar';

const LessonTaskCreated = ({ data }) => {
  const colorScheme = ['#5754F7', '#35CFFF', '#E5A500'];
  const dataKeys = Object.keys(data ?? {});
  const parsedData = dataKeys.map((item, idx) => ({
    [`${item.toLowerCase()}Color`]: colorScheme[idx],
    [`${item.toLowerCase()}`]: data[item], // classwork or quiz or assignment
    lesson_task: item[0].toUpperCase(),
  }));
  // #E5A500

  const totalSum = dataKeys.reduce((acc, curr) => {
    return acc + data[curr];
  }, 0);

  const isEmpty =
    !data || !dataKeys?.length || !parsedData?.length || totalSum === 0;

  if (isEmpty) {
    return <EmptyView label='No Data' />;
  }

  return (
    <div className='h-80'>
      <ResponsiveBar
        padding={0.2}
        indexBy='lesson_task'
        innerPadding={5}
        data={parsedData}
        groupMode='grouped'
        keys={['assignment', 'quiz', 'class_work']}
        margin={{ top: 0, right: 30, bottom: 60, left: 60 }}
        valueScale={{ type: 'linear' }}
        colors={(p) => {
          console.log(p.id);
          console.log(p.data);
          return p.data[`${p.id}Color` as string];
        }}
        layout='vertical'
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        enableGridY={true}
        borderRadius={6}
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

export default LessonTaskCreated;
