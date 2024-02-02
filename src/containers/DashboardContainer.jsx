import * as React from 'react'
import DistributionPieChart from '../components/dashboard/DistributionPieChart'
import IncomeAreaChart from '../components/dashboard/IncomeAreaChart'
import Goal from '../components/dashboard/NetProfit'
import SalesColumnChart from '../components/dashboard/SalesColumnChart'
import './styles.css'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react'
import '../containers/styles.css'
import API from '../api/apiClient'
import BudgetChoice from '../components/dashboard/BudgetChoice'


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

const lastYearMonths = [
  {'name': 'Jan', 'start_date': '2023-01-01', 'end_date': '2023-01-31'},
  {'name': 'Feb', 'start_date': '2023-02-01', 'end_date': '2023-02-28'},
  {'name': 'Mar', 'start_date': '2023-03-01', 'end_date': '2023-03-31'},
  {'name': 'Apr', 'start_date': '2023-04-01', 'end_date': '2023-04-30'},
  {'name': 'May', 'start_date': '2023-05-01', 'end_date': '2023-05-31'},
  {'name': 'Jun', 'start_date': '2023-06-01', 'end_date': '2023-06-30'},
  {'name': 'Jul', 'start_date': '2023-07-01', 'end_date': '2023-07-31'},
  {'name': 'Aug', 'start_date': '2023-08-01', 'end_date': '2023-08-31'},
  {'name': 'Sep', 'start_date': '2023-09-01', 'end_date': '2023-09-30'},
  {'name': 'Oct', 'start_date': '2023-10-01', 'end_date': '2023-10-31'},
  {'name': 'Nov', 'start_date': '2023-11-01', 'end_date': '2023-11-30'},
  {'name': 'Dec', 'start_date': '2023-12-01', 'end_date': '2023-12-31'},
]

export default function DashboardContainer() {
  const company_id = localStorage.getItem("company-id")
  const [selectedBudget, setselectedBudget] = useState('')
  const [budgets, setBudgets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [columnProfitData, setColumnProfitData] = useState([])
  const [areaProfitData, setAreaProfitData] = useState([])
  const [isContainerLoading, setIsContainerLoading] = useState(true)

  const fetchBudgets = async () => {
    try {
      const budgets = await API.getCompanyBudgets({company_id: company_id,})
      setBudgets(budgets.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchCurrentProfit = async () => {
    const monthsPromises  = months.map(month =>
      API.getCurrentProfit({company_id: company_id, start_date: month.start_date, end_date: month.end_date})
    )
    Promise.all(monthsPromises).then(monthsResponses => {
      const columnProfitData = months.map((month, index) => ({
        label: month.name,
        sum: monthsResponses[index].data.sum,
        revenue: monthsResponses[index].data.revenue,
        expense: monthsResponses[index].data.expense
      }))
      setColumnProfitData(columnProfitData)

      const areaProfitData = months.map((month, index) => ({
        label: month.name,
        sum: monthsResponses[index].data.sum,
      }))
      setAreaProfitData(areaProfitData)
      setIsContainerLoading(false)
    })
    .catch(error => {
      console.error("Error fetching category transactions:", error)
    })
  }

  useEffect(() => {
    if (isLoading) {
      fetchBudgets()
      fetchCurrentProfit()
    }
  }, [])

  return (
    <div>
      <NavBar/>
      <div className="flex-container">
          <div className="left-dashboard">
              <div className="progress-info">
                <BudgetChoice
                  budgets={budgets}
                  setselectedBudget={setselectedBudget}
                />
                <Goal
                  budget={selectedBudget}
                />
              </div>
              <SalesColumnChart
                data={columnProfitData}
                isContainerLoading={isContainerLoading}
              />
          </div>

          <div className="right-dashboard">
              <DistributionPieChart
                label="EXPENSES" 
                type={2} 
                budget={selectedBudget}
                />
              <DistributionPieChart
                label="REVENUES"
                type={1}
                budget={selectedBudget}
              />
              <IncomeAreaChart
                thisYear={areaProfitData}
                isContainerLoading={isContainerLoading}
                lastYearMonths={lastYearMonths}
              />
          </div>
      </div>
    </div>
  )
}
