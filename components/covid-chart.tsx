import {useEffect, useRef} from 'react';
import {DependencyList, RefObject} from 'react';
import * as d3 from 'd3';

const useD3 = (renderChartFn: (svg: RefObject<SVGSVGElement>) => void, dependencies: DependencyList) => {
  const ref = useRef<SVGSVGElement>(null);

  // useEffect(() => {
  //   renderChartFn(d3.select(ref));
  //   return () => { };
  // }, [ref, renderChartFn]);
  return ref;
};
