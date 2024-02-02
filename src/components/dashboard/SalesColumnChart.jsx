import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import ReactApexChart from 'react-apexcharts'

const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 11,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yaxis: {
    title: {
      text: '$'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `${val}`
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
}

const months = [
  {'name': 'Jan', 'start_date': '2024-01-01', 'end_date': '2024-01-31'},
  {'name': 'Feb', 'start_date': '2024-02-01', 'end_date': '2024-02-28'},
  {'name': 'Mar', 'start_date': '2024-03-01', 'end_date': '2024-03-31'},
  {'name': 'Apr', 'start_date': '2024-04-01', 'end_date': '2024-04-30'},
  {'name': 'May', 'start_date': '2024-05-01', 'end_date': '2024-05-31'},
  {'name': 'Jun', 'start_date': '2024-06-01', 'end_date': '2024-06-30'},
  {'name': 'Jul', 'start_date': '2024-07-01', 'end_date': '2024-07-31'},
  {'name': 'Aug', 'start_date': '2024-08-01', 'end_date': '2024-08-31'},
  {'name': 'Sep', 'start_date': '2024-09-01', 'end_date': '2024-09-30'},
  {'name': 'Oct', 'start_date': '2024-10-01', 'end_date': '2024-10-31'},
  {'name': 'Nov', 'start_date': '2024-11-01', 'end_date': '2024-11-30'},
  {'name': 'Dec', 'start_date': '2024-12-01', 'end_date': '2024-12-31'},
]

export default function SalesColumnChart({data, isContainerLoading}) {
  const theme = useTheme()
  const { primary, secondary } = theme.palette.text
  const [options, setOptions] = useState(columnChartOptions)
  const line = theme.palette.divider
  const revenueData = []
  const expenseData = []
  const profitData = []

  const profit =  '#3fc0b7'
  const revenue = '#6b38aa'
  const expense = '#c03fb2'

  const [series, setSeries] = useState([
    {
      name: 'Net Profit',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Revenue',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    
    },
    {
      name: 'Exspense',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    
    }
  ])

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [profit, revenue, expense],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
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
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, profit, revenue])

  useEffect(() => {
    if (!isContainerLoading) {
      data.forEach((item) => {
        expenseData.push(item.expense);
      })
      data.forEach((item) => {
        revenueData.push(item.revenue);
      })
      data.forEach((item) => {
        profitData.push(item.sum);
      })

      setSeries([
        {
          ...series[0],
          data: profitData
        },
        {
          ...series[1],
          data: revenueData
        },
        {
          ...series[2],
          data: expenseData
        }
      ])
    }
  }, [isContainerLoading])

  return (
    <div id="chart" style={{ height: '20vh', width: '120vh' }}>
      <ReactApexChart options={options} series={series} type="bar"/>
    </div>
  )
}
