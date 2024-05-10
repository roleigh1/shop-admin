import * as React from 'react';
import { LineChart} from '@mui/x-charts/LineChart';
import {  MyContext, useMyContext } from '../../../../ContextApi';
import "../../../home.css";
import { useMediaQuery } from '@mui/material';
export default function SalesLineChart() {
  const {
  sales
  } = useMyContext(MyContext);
  console.log(sales); 
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const width = isSmallScreen ? 300 : 600;
  return (
    <div    className="chartDiv" style={{}}>
     < h5 className='hline' style={{position:"relative",left:"3rem",top:"2rem"}}>Monatlicher Recap Report </h5>
    
    <LineChart
      xAxis={[{ data: [1,2,3,4,5,6,7,8,9,10,11,12] }]}
      className='chart'
      series={[
        {
          data: [sales.jan , sales.feb, sales.mar, sales.apr, sales.may, sales.jun,sales.jul,sales.aug,sales.sep,sales.oct,sales.nov,sales.dec],
        },
      ]}
      width={width}
      height={300}
    />
    </div>
  

  );
}