import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './States.css';
import { Link } from 'react-router-dom';
import confirm_img from './assets/microscope.png';
import active_img from './assets/patient (1).png';
import recover_img from './assets/recovered.png';
import death_img from './assets/death.png';
// import { TablePagination } from 'react-pagination-table';

const States = () => {
      const [allStates, setStates] = useState([]);
      // const [totolConfirmed, setTotalConfirmed] = useState();
      const [searchTerm, setSearchTerm] = useState('');

      const handleEvent = (event) =>{
        setSearchTerm(event.target.value);
      }

  useEffect(()=>{
    async function getStates(){
      const States = await axios.get(`https://api.covid19india.org/data.json`);
      console.log("Hi this is covid cases : - "+States);
      setStates([States]);
    }
    getStates();
  });
 

    return (
  <>  
  <div className="main">
      
  <div className="container">
    <div className="row" id="heading">
      <h2>Total India Cases of COVID-19</h2>
      <p>[Updated on {allStates.map(function (val,indx){
        return (val.data.statewise.map(function (mystate,indx2){
            if(indx2=='0'){
                return( mystate.lastupdatedtime)
            }
        }))})} ]</p>
    </div>
   
  <div className="row">
    
    <div id="Total" className="col-lg-3 my-3 col-sm-5">
      <section className="sec1">
        <img src={confirm_img} alt="" width="64px" height="64px" />
        <h3 className="">Confirmed</h3>
        <span>{allStates.map(function (val,indx){
        return (val.data.statewise.map(function (mystate,indx2){
            if(indx2=='0'){
                return( mystate.confirmed)
            }
        }))})}</span>
      </section>
    </div>
    <div id="Active" className="col-lg-3 my-3 col-sm-5">
      <section className="sec2">
        <img src={active_img} alt="" width="64px" height="64px" />
        <h3 className="">Active</h3>
        <span>{allStates.map(function (val,indx){
        return (val.data.statewise.map(function (mystate,indx2){
            if(indx2=='0'){
                return( mystate.active)
            }
        }))})}</span>
      </section>
    </div>
    <div id="Recovered" className="col-lg-3 my-3  col-sm-5">
      <section className="sec3">
        <img src={recover_img} alt="" width="64px" height="64px" />
        <h3 className="">Recovered</h3>
        <span>{allStates.map(function (val,indx){
        return (val.data.statewise.map(function (mystate,indx2){
            if(indx2=='0'){
                return( mystate.recovered)
            }
        }))})}</span>
      </section>
    </div>
    <div id="Deaths" className="col-lg-3 my-3  col-sm-5">
      <section className="sec4">
        
        <img src={death_img} alt="" width="64px" height="64px" />
        <h3 className="">Death</h3>
        <span>{allStates.map(function (val,indx){
        return (val.data.statewise.map(function (mystate,indx2){
            if(indx2=='0'){
                return( mystate.deaths)
            }
        }))})}</span>
      </section>
    </div>
  </div>
</div>
<div style={{overflowX:'scroll', width:'100%'}}>
  <table>
    <tr id="theader">
       <th colSpan="4"><span><input type="text" placeholder="Search State...." value={searchTerm} onChange={handleEvent} /></span></th> 
       <th colSpan="4" id="Hint"> <span style={{color:'gray', fontSize:'16px'}}>Hint : Click on State name to get District-wise Data</span></th> 
       
    </tr> 
    <tr>
    <th>
      States/UT
    </th>
    <th>
      Confirmed-Cases
    </th>
    <th>
      New-Cases
    </th>
    <th>
      Active-Cases
    </th>
    <th>
      Recovered
    </th>
    <th>
      New-Recovered
    </th>
    <th>
      Deaths
    </th>
    <th>
      New-Deaths
    </th>
    
    
  </tr>
    
  
    {allStates.map(function (val,indx){
        return (val.data.statewise.map(function (mystate,indx2){
          if(mystate.state.toLowerCase().includes(searchTerm.toLowerCase()))
        return(<> 
    <tr>
      <td> <Link to={`/District/${mystate.state}`}> { mystate.state }</Link></td>
      <td> <a href=""> {mystate.confirmed}</a></td>
      <td id="newcase"> <a href=""> +{mystate.deltaconfirmed}</a></td>
      <td> <a href=""> {mystate.active}</a></td>
      <td> <a href=""> {mystate.recovered}</a></td>
      <td id="newrecovered"> <a href=""> +{mystate.deltarecovered}</a></td>
      <td> <a href=""> {mystate.deaths}</a></td>
      <td id="newdeath"> <a href=""> +{mystate.deltadeaths}</a></td>
      
    </tr></>)}))})}
    
  </table></div>
   {/* <div className="paginate container">
      <TablePagination className="my-pagination" headers={ header }
            data={ data } perPageItemCount={ 5 }
         />
   </div> */}
</div>
</>);
}

export default States; 