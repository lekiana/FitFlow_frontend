import * as React from 'react'
import { useState, useEffect } from 'react'
import './styles.css'
import TransactionsTable from '../components/means/TransactionsTable'
import AvailableMeans from '../components/means/AvailableMeans'
import StandingOrdersTable from '../components/means/StandingOrdersTable'
import NavBar from '../components/NavBar'
import API from '../api/apiClient'
import NewAccount from '../components/means/NewAccount'

const company_id = localStorage.getItem("company-id")

export default function MeansContainer() {
  const [categories, setCategories] = useState([])
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [meansUpdate, setMeansUpdate] = useState(true)

  const fetchData = async () => {
    try {
      const categories = await API.getTransactionsCategories({company_id: company_id,})
      const accounts = await API.getCompanyMeans({company_id: company_id,})

      setCategories(categories.data)
      setAccounts(accounts.data)

      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <NavBar/>
      <div className="means-columns">
          <div className="left-means">
            <TransactionsTable 
              accounts={accounts} 
              categories={categories}
              isContainerLoading={isLoading}
              setMeansUpdate={setMeansUpdate}
            />
          </div>
          <div className="right-means">
            <AvailableMeans
              companyId={company_id}
              meansUpdate={meansUpdate}
              setMeansUpdate={setMeansUpdate}
            />
            <NewAccount 
              setAccounts={setAccounts} 
              companyId={company_id} 
              setIsLoading={setIsLoading}
            />
            <StandingOrdersTable 
              categories={categories} 
              accounts={accounts} 
              isContainerLoading={isLoading}
              setMeansUpdate={setMeansUpdate}
            />
          </div>
      </div>
    </div>
  )
}

