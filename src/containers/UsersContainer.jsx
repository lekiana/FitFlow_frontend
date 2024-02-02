import * as React from 'react';
import './styles.css';
import UsersTable from '../components/users/UsersTable';
import NavBar from '../components/NavBar';

export default function UsersContainer() {

  return (
    <div style={{ height: '100vh' }}>
      <NavBar/>
      <div className="bottom-means">
        <UsersTable/>
      </div>
    </div>
  )
}

