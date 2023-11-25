import * as React from 'react';
import './Dashboard.css';
import UsersTable from '../components/UsersTable';
import NavBar from '../components/NavBar';

export default function UsersContainer() {

  return (
    <div>
    <NavBar/>
    <div className="bottom-means">
    <UsersTable/>
    </div>
    </div>

  );
}

