import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import myGif from '../elements/data_not_found.gif';

const NotFound = () =>{
    return(
        <div className='mr-5'>
            <img style={{width:250, height:250}} src={myGif} alt="Not Found"/>
        </div>
    )
};
export default NotFound;