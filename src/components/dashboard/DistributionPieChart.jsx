import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { useDrawingArea } from '@mui/x-charts/hooks'
import { styled } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import API from '../../api/apiClient'


const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}))

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  )
}

const size = {
  height: 225,
  width: 400,
}

export default function DistributionPieChart({label, type, budget}) {
  const company_id = localStorage.getItem("company-id")
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  
  const fetchData = () => {
    API.getTypeTransactions({ company_id : company_id, transaction_type: type}).then(response => {
      const categories = response.data
      const categoryPromises  = categories.map(category =>
        API.getCategoryTransactions({ category_id: category.id, start_date: budget.start_date, end_date: budget.end_date })
      )
  
      Promise.all(categoryPromises).then(categoryResponses => {
        const categoryData = categories.map((category, index) => { 
          const label = category.name
          return {
          label: label,
          value: categoryResponses[index].data,
          }
        })

        setData(categoryData)
        setIsLoading(false)

      })
      .catch(error => {
        console.error("Error fetching category transactions:", error);
      })
    })
  }
  
  useEffect(() => {
    if (isLoading) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [budget])
  
  if (type === 1) {
    return (
      <PieChart series={[{ data, innerRadius: 70, outerRadius: 110, paddingAngle: 2, cornerRadius: 4, }]} {...size}
      slotProps={{ legend: { hidden: true } }}>
        <PieCenterLabel>{label}</PieCenterLabel>
      </PieChart>
    )
  }
  return (
    <PieChart series={[{ data, innerRadius: 70, outerRadius: 110, paddingAngle: 2, cornerRadius: 4, }]} {...size}
    slotProps={{ legend: { hidden: true } }}>
      <PieCenterLabel>{label}</PieCenterLabel>
    </PieChart>
  )
}
