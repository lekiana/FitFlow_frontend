import { useState, useEffect } from 'react'
import API from '../../api/apiClient'
import { useTheme } from '@mui/material/styles'
import ReactApexChart from 'react-apexcharts'

const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
}

export default function IncomeAreaChart({thisYear, isContainerLoading, lastYearMonths}) {
  const company_id = localStorage.getItem("company-id")
  const theme = useTheme()
  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider
  const [options, setOptions] = useState(areaChartOptions)
  const [lastYear, setLastYear] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, '#00b0ff'],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 11
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme])

  const [series, setSeries] = useState([
    {
      name: 'Last Year',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]     
    },
    {
      name: 'This Year',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   
    }
  ])

  const fetchData = () => {
    const lastYearPromises  = lastYearMonths.map(month =>
      API.getCurrentProfit({company_id: company_id, start_date: month.start_date, end_date: month.end_date})
    )

    Promise.all(lastYearPromises).then(lastYearResponses => {
      const lastYear = lastYearMonths.map((month, index) => ({
        label: month.name,
        sum: lastYearResponses[index].data.sum,
      }))
      setLastYear(lastYear)
      setIsLoading(false)
    })
    .catch(error => {
      console.error("Error fetching category transactions:", error);
    })
  }

  useEffect(() => {
    if (isLoading) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    const lastYearArray = []
    const thisYearArray = []

    if (!isLoading && !isContainerLoading) {

      lastYear.forEach((item) => {
        lastYearArray.push(item.sum)
      })

      thisYear.forEach((item) => {
        thisYearArray.push(item.sum)
      }) 

      setSeries([
        {
          name: 'Last Year',
          data: lastYearArray
        },
        {
          name: 'This Year',
          data: thisYearArray
        }
      ])
    }

  }, [isLoading, isContainerLoading])

  return (
    <div style={{ height: '120vh', width: '60vh'}}>
      <ReactApexChart options={options} series={series} type="area"/>
    </div>
  )
}
