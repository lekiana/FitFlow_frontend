import * as React from 'react';
import MyPieChart from '../components/DistributionPieChart';
import IncomeAreaChart from '../components/IncomeAreaChart';
import ProgressBar from '../components/ProgressBar';
import Goal from '../components/NetProfit';
import SalesColumnChart from '../components/SalesColumnChart';
import './Dashboard.css';
import NavBar from '../components/NavBar';

export default function DashboardContainer() {

  return (
    <div>
    <NavBar/>
    <div class="flex-container">
        <div className="left-dashboard">
            <div className="progress-info">
            <Goal currentProfit={132546} plannedProfit={2445}/>
            <ProgressBar value={75.5}/>
            </div>
            <SalesColumnChart/>
        </div>

        <div className="right-dashboard">
            <MyPieChart label="EXPENSES"/>
            <MyPieChart label="REVENUES"/>
            <IncomeAreaChart slot="month"/>
        </div>
    </div>
    </div>
  );
}
