import * as React from 'react'
import { useState, useEffect } from 'react'
import API from '../../api/apiClient'
import '../../containers/styles.css'
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'

const currency = localStorage.getItem('currency')

export default function AvailableMeans({companyId, setMeansUpdate, meansUpdate}) {
  const [allMeans, setAllMeans] = useState(0)
  const [availableMeans, setAvailableMeans] = useState(0)

  const percentage = Number(availableMeans / allMeans * 100).toFixed(2)
  const percentageColor = percentage >= 30 ? '#61bc42' : '#f0270f'

  const fetchData = async () => {
    try {
      const standingOrders = await API.getStandingOrdersSum({company_id: companyId,})
      const means = await API.getAvailableMeans({company_id: companyId,})
    
      const all = means.data
      const available = all - standingOrders.data
    
      setAllMeans(all)
      setAvailableMeans(available)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (meansUpdate) {
      fetchData()
      setMeansUpdate(false)
    }
  }, [meansUpdate])

  return (
    <Card sx={{}}>
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
              Means [{currency}]
            </Typography>
            
            <Stack direction="row" spacing={5}>
              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  All
                </Typography>
                <Typography variant="h4">
                  {allMeans}
                </Typography>
              </Stack>

              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  Available
                </Typography>
                <Typography variant="h4">
                    {availableMeans}
                </Typography>
              </Stack>

              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                %
                </Typography>
                <Typography variant="h4" color={percentageColor}>
                    {percentage}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
