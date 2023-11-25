import * as React from 'react';
import './Dashboard.css';
import TransactionsTable from '../components/TransactionsTable';
import Goal from '../components/AvailableMeans';
import StandingOrdersTable from '../components/StandingOrdersTable';
import OutsourceTable from '../components/OutsourceTable';
import NavBar from '../components/NavBar';

export default function MeansContainer() {

  return ( // class="flex-container"
    <div>

    <NavBar/>

    <div className="means-columns">
        <div className="left-means">
          <TransactionsTable/>
        </div>

        <div className="right-means">
          <Goal currentProfit={1325} plannedProfit={2445}/>
          <StandingOrdersTable/>
        </div>
    </div>

    <div className="bottom-means">
    <OutsourceTable/>
    </div>

    </div>

  );
}

