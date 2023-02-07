import { useEffect, useRef, useState } from 'react';
import { DependencyList, RefObject, CSSProperties } from 'react';
import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';

const width = 340;
const height = 280;
const padding = 5;
const bottom = 60;
const left = 40;

const useD3 = (renderChartFn: (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => void, dependencies: DependencyList) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => { };
  }, [ref, renderChartFn]);
  return ref;
};

type CovidDatum = {
  date: string
  count: number
}

const plotBarChart = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>, data: Array<CovidDatum>) => {
  // x axis
  const xRange = [0, width - left];
  const x = d3.scaleBand()
    .range(xRange)
    .domain(data.map(d => d.date))
    .padding(0.2);
  svg
    .append('g')
    .attr('transform', `translate(${left},${height - bottom})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,4)rotate(-75)')
    .style('text-anchor', 'end');

  // y axis
  const yRange = [height - bottom, 0];
  const y = d3.scaleLinear()
    .domain([0, Math.round(d3.max(data, d => d.count) as number * 1.08)])
    .range(yRange);
  svg.append('g')
    .attr('transform', `translate(${left},0)`)
    .call(d3.axisLeft(y));

  // bars
  svg.selectAll('mybar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => (x(d.date) ?? 0) + left)
    .attr('y', d => y(0))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(0) - bottom)
    .attr('fill', '#d35400');

  // bar texts
  svg.selectAll('text.bar')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'bar')
    .attr('font-size', '6px')
    .attr('text-anchor', 'center')
    .attr('opacity', 0)
    // .attr('transform-box', 'fill-box')
    // .attr('transform-origin', 'left center')
    // .attr('transform', 'rotate(0)')
    .attr('x', d => (x(d.date) ?? 0) + left)
    .attr('y', d => y(d.count))
    .text(d => d.count);
  svg.selectAll('text.bar')
    .transition()
    .duration(800)
    .attr('opacity', 1)
    .delay((d, i) => i * 100 + 800);;

  // animation
  svg.selectAll('rect')
    .transition()
    .duration(800)
    .attr('y', d => y((d as CovidDatum).count))
    .attr('height', d => height - y((d as CovidDatum).count) - bottom)
    .delay((d, i) => i * 100);
};

export default function CovidChart(style?: any) {
  const [covidCaseNumbers, setCovidCaseNumbers] = useState<Record<string, number>>({});
  const [covidStats, setCovidStats] = useState<Array<CovidDatum>>([]);
  useEffect(() => {
    fetch('https://covid-sg.deno.dev/all/total')
      .then(res => res.json())
      .then(data => setCovidCaseNumbers(data))
      .catch(err => console.log(err));
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

  const ref = useD3(svg => {
    svg.selectAll('*').remove();
    plotBarChart(svg, covidStats);
  }, []);

  return (
    <Box backgroundColor="gray.400" borderRadius={16} padding={padding} style={style.style}>
      <svg width={width} height={height} ref={ref} />
    </Box>
  );
}
