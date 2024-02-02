import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material'
import API from '../../api/apiClient'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import '../../containers/styles.css'


export default function NetProfit( {budget} ) {
  const currency = localStorage.getItem('currency')
  const company_id = localStorage.getItem("company-id")
  const [currentProfit, setCurrentProfit] = useState(0)
  const [plannedProfit, setPlannedProfit] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const plannProfit = await API.getPlannedProfit({budget_id: budget['id'],})
      const currProfit = await API.getCurrentProfit({company_id: company_id, start_date: budget.start_date, end_date: budget.end_date})

      setCurrentProfit(currProfit.data.sum)
      setPlannedProfit(plannProfit.data)

      setIsLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  } 
  
  useEffect(() => {
    if (isLoading) {
      fetchData()
    } 
  }, [])
  
  useEffect(() => {
    setIsLoading(true)
    if (budget) {
      fetchData()
    }
  }, [budget])
  
  useEffect(() => {
    if (!isLoading && budget) {
      setPercentage(Number(currentProfit / plannedProfit * 100).toFixed(2))
    }
  }, [isLoading, budget])

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#01579b' : '#308fe8',
    },
  }))

  const ProgressBar = () => {
    return (
      <Card sx={{ flex: 1}}>
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={2.2}>
              <Typography
                id="goal"
                color="text.secondary"
                gutterBottom
                variant="button"
              >
                Goal for {budget.name}
              </Typography>
              <BorderLinearProgress variant="determinate" value={percentage} />
              <Typography variant="h4">
                {percentage}%
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="progress-info">
    <Card sx={{ flex: 1}}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>

            <Typography
              color="text.secondary"
              gutterBottom
              variant="button"
            >
              Net Profit [{currency}]
            </Typography>
            
            <Stack direction="row" spacing={5}>
              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  Planned
                </Typography>
                <Typography variant="h4">
                  {plannedProfit}
                </Typography>
              </Stack>

              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  Current
                </Typography>
                <Typography variant="h4">
                    {currentProfit}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
    
    <ProgressBar/>
    </div>
  )
}
