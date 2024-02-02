import * as React from 'react'
import { useEffect, useState } from 'react'
import API from '../api/apiClient'
import '../containers/styles.css'
import BudgetTables from '../components/budget/BudgetTables'
import BudgetChoice from '../components/budget/BudgetChoice'
import NewBudget from '../components/budget/NewBudget'
import NewCategory from '../components/budget/NewCategory'
import NavBar from '../components/NavBar'

const company_id = localStorage.getItem("company-id")

export default function BudgetContainer() {
  const [budgets, setBudgets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [budgetsLoading, setBudgetsLoading] = useState(false)
  const [selectedBudgetId, setselectedBudgetId] = useState(null)
  const [selectedBudget, setselectedBudget] = useState(null)
  const [expenseCategories, setExpenseCategories] = useState([])
  const [incomeCategories, setIncomeCategories] = useState([])

  const fetchBudgets = async () => {
      try {
        const budgets = await API.getCompanyBudgets({company_id: company_id,})
        setBudgets(budgets.data)
        setIsLoading(false)
        setBudgetsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  const fetchCategories = async () => {
    try {
      const expenseCategories = await API.getTypeTransactions({company_id: company_id, transaction_type: 2})
      const incomeCategories = await API.getTypeTransactions({company_id: company_id, transaction_type: 1})

      setExpenseCategories(expenseCategories.data)
      setIncomeCategories(incomeCategories.data)
      
      setIsLoading(false)
      setCategoriesLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (categoriesLoading) {
      fetchCategories()
    }
  }, [categoriesLoading])

  useEffect(() => {
    if (budgetsLoading) {
      fetchBudgets()
    }
  }, [budgetsLoading])

  useEffect(() => {
    if (isLoading && budgets.length === 0) {
      fetchBudgets()
      fetchCategories()
    }
  }, [])

  return (
    <div style={{ height: '100vh' }}>
      <NavBar/>
      <div className="budget">
        <div className='budget-menu'>
          <BudgetChoice
            setselectedBudgetId={setselectedBudgetId}
            setselectedBudget={setselectedBudget} 
            selectedBudget = {selectedBudget}
            budgets = {budgets}
          />
          <NewBudget
            setBudgetsLoading = {setBudgetsLoading}
            company_id = {company_id}
            budgets = {budgets}
          />
          <NewCategory
            setCategoriesLoading = {setCategoriesLoading}
            company_id = {company_id}
          />
        </div>

        <div className="budget-menu">
          <BudgetTables
            selectedBudget={selectedBudget} 
            selectedBudgetId={selectedBudgetId} 
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
          />
        </div>
      </div>
    </div>
  )
}
