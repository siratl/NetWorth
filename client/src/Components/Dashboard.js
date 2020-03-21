import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className='mainContainer'>
      <div className='header'>Header</div>
      <div className='board'>Total Debt</div>
      <div className='bills'>List of Upcoming Bills</div>
      <div className='footer'>Navigation</div>
    </div>
  );
}

export default Dashboard;