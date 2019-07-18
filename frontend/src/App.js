import React from 'react';
import Dashboard from './views/dashboard/Dashboard.jsx';
import AdminLayout from './layouts/admin/Admin.jsx';


function App() {
  return (
    <div className="App">
      <AdminLayout>
          <Dashboard/>
      </AdminLayout>      
    </div>
  );
}

export default App;
