import { ResponsiveBar } from '@nivo/bar';

const d = [
  {
    subject: 'Mathematics',
    excellent: 127,
    excellentColor: 'hsl(344, 70%, 50%)',
    'very good': 153,
    'very GoodColor': 'hsl(0, 70%, 50%)',
    good: 105,
    goodColor: 'hsl(212, 70%, 50%)',
    fair: 82,
    fairColor: 'hsl(130, 70%, 50%)',
    poor: 131,
    poorColor: 'hsl(163, 70%, 50%)',
    'very poor': 37,
    'very poorColor': 'hsl(153, 70%, 50%)',
  },
  {
    subject: 'English',
    excellent: 54,
    excellentColor: 'hsl(322, 70%, 50%)',
    'very good': 131,
    'very GoodColor': 'hsl(359, 70%, 50%)',
    good: 69,
    goodColor: 'hsl(82, 70%, 50%)',
    fair: 23,
    fairColor: 'hsl(286, 70%, 50%)',
    poor: 15,
    poorColor: 'hsl(304, 70%, 50%)',
    'very poor': 119,
    'very poorColor': 'hsl(1, 70%, 50%)',
  },
  {
    subject: 'Civic',
    excellent: 75,
    excellentColor: 'hsl(276, 70%, 50%)',
    'very good': 191,
    'very GoodColor': 'hsl(289, 70%, 50%)',
    good: 47,
    goodColor: 'hsl(247, 70%, 50%)',
    fair: 191,
    fairColor: 'hsl(154, 70%, 50%)',
    poor: 186,
    poorColor: 'hsl(30, 70%, 50%)',
    'very poor': 144,
    'very poorColor': 'hsl(73, 70%, 50%)',
  },
  {
    subject: 'Science',
    excellent: 184,
    excellentColor: 'hsl(227, 70%, 50%)',
    'very good': 52,
    'very GoodColor': 'hsl(170, 70%, 50%)',
    good: 3,
    goodColor: 'hsl(203, 70%, 50%)',
    fair: 49,
    fairColor: 'hsl(56, 70%, 50%)',
    poor: 92,
    poorColor: 'hsl(257, 70%, 50%)',
    'very poor': 6,
    'very poorColor': 'hsl(299, 70%, 50%)',
  },
];

export default function ClassPerformanceRate({ data }: { data?: typeof d }) {
  return (
    <div className='h-[35rem]'>
      <ResponsiveBar
        data={data ?? d}
        keys={[
          'excellent',
          'veryGood',
          'good',
          'fair',
          'poor',
          'very poor',
        ].reverse()}
        indexBy='subject'
        margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
        padding={0.6}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'red_yellow_green' }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'subject',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'performance',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 80,
            itemsSpacing: 0,
            itemWidth: 75,
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
        role='application'
        ariaLabel='Nivo bar chart demo'
        barAriaLabel={(e) =>
          e.id + ': ' + e.formattedValue + ' in subject: ' + e.indexValue
        }
      />
    </div>
  );
}
