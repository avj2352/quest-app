import React, {useEffect} from 'react';
//Components
import Sidebar from './../../components/sidebar/Sidebar.jsx';
import Loader from '../../components/loader/Loader.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';

const AdminLayout = (props) => {
    // componentDidMount
    useEffect(()=>{

    },[]);

    return (
        <div>
            <Loader visible={false} />   
            <Navbar/>
            <Sidebar />
        </div>
    );
};

export default AdminLayout;