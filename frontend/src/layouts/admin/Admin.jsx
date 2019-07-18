import React, {useEffect} from 'react';
//Components
import Sidebar from './../../components/sidebar/Sidebar.jsx';
import Loader from '../../components/loader/Loader.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';
// CSS
import './admin.css';

const AdminLayout = (props) => {
    // componentDidMount
    useEffect(()=>{

    },[]);

    return (
        <div>
            <Loader visible={false} />   
            <Navbar/>
            <div className="container-fluid dashboard-view">
                <Sidebar />
                {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;