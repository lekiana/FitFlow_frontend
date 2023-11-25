import * as React from 'react';
import './Dashboard.css';
import TransactionsTable from '../components/TransactionsTable';
import Goal from '../components/AvailableMeans';
import ExpensesTable from '../components/ExpensesTable';
import IncomeTable from '../components/IncomeTable';
import NavBar from '../components/NavBar';

export default function MeansContainer() {

  return ( // class="flex-container"
    <div>

    <NavBar/>

    <div className="budget-columns">
        <div className="left-budget">
          <ExpensesTable/>
        </div>

        <div className="right-budget">
          <IncomeTable/>
        </div>
    </div>
    </div>

  );
}

