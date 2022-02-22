import { useEffect, useRef, useState } from 'react';
import { DependencyList, RefObject, CSSProperties } from 'react';
import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';

const useD3 = (renderChartFn: (svg: RefObject<SVGSVGElement>) => void, dependencies: DependencyList) => {
  const ref = useRef<SVGSVGElement>(null);

  // useEffect(() => {
  //   renderChartFn(d3.select(ref));
  //   return () => { };
  // }, [ref, renderChartFn]);
  return ref;
};

const plotBarChart = (svg: RefObject<SVGSVGElement>, data: object) => {
};

export default function CovidChart(style?: any) {
  const [covidCaseNumbers, setCovidCaseNumbers] = useState<Record<string, number>>({});
  const [covidStats, setCovidStats] = useState<Array<{ date: string, count: number }>>([]);
  useEffect(() => {
    fetch('https://covid-sg.deno.dev/all/total')
      .then(res => res.json())
      .then(data => setCovidCaseNumbers(data));
  }, []);
  useEffect(() => {
    const stats = [];
    for (const date in covidCaseNumbers) {
      stats.push({
        date,
        count: covidCaseNumbers[date],
      });
    }
    console.table(stats);
    setCovidStats(stats);
  }, [covidCaseNumbers]);

  const ref = useD3(svg => {}, []);

  return (
    <Box width={100} height={100} backgroundColor="green.300" style={style.style}>
      <svg ref={ref} />
    </Box>
  );
}
