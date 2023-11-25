import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
  { value: 5, label: 'Transport', color: '#81d4fa' },
  { value: 10, label: 'Materials', color: '#00b0ff' },
  { value: 15, label: 'Salaries', color: '#039be5' },
  { value: 20, label: 'Maintenance', color: '#01579b' },
  {value: 0, label: 'Other', color: 'grey'},
];

const size = {
  height: 200,
  width: 400,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function MyPieChart({label}) {
  return (
    <PieChart series={[{ data, innerRadius: 60, outerRadius: 90, paddingAngle: 2, cornerRadius: 4, }]} {...size}>
      <PieCenterLabel>{label}</PieCenterLabel>
    </PieChart>
  );
}
