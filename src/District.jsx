import React, { useEffect, useState } from 'react';
import './District.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import confirm_img from './assets/microscope.png';
import active_img from './assets/patient (1).png';
import recover_img from './assets/recovered.png';
import death_img from './assets/death.png';


function findIndexByKeyValue(_array, key, value) {

  for (var i = 0; i < _array.length; i++) { 
      return(_array[i].map((val, indx)=>{
        if(val[key]==value){
          return indx ;
        }
      }))
        
      
  }
  return -1;
}

function District(){
    const [allDistrict, setDistrict] = useState([]);
    const [mystateName, setMystate]= useState([]);
    const { state } = useParams();
    
    const[searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event =>{
      setSearchTerm(event.target.value);
      console.log(searchTerm);
    };

    
    // console.log("I am Sushant Kulkarni = "+state);
    

    useEffect(()=>{
        
        async function getDistrict(){
        const  indStates = await axios.get(`https://api.covid19india.org/state_district_wise.json`);
        // console.log("district names = "+indStates.data);
          setDistrict([indStates.data[state].districtData]);
          
          
          // console.log("district names = "+allDistrict.Belagavi.confirmed);
        }
        getDistrict();

        
        
         async function getState(){
          let  myState = await axios.get(`https://api.covid19india.org/data.json`);
          const mystate2 = myState.data['statewise'];
          const stateIndx = findIndexByKeyValue([mystate2], 'state', state)
          const stateIndx2 = stateIndx.toString().replace(/\,/g,'');
          const myState3 = mystate2[stateIndx2];
          setMystate(myState3);
          // console.log('myState is = '+myState3.state);
        }
        getState();

       setSearchResults(searchTerm);
        
      })
return (<>
<div class="main">
    <div class="container">
      <div class="row" id="heading">
        <h2><span id="stName">{mystateName.state}</span> Cases of COVID-19</h2>
        <p>[Updated on {mystateName.lastupdatedtime}]</p>
      </div>
     
    <div class="row">
      
      <div id="Total" class="col-lg-3 my-3 col-sm-5">
        <section class="sec1">
          <img src={confirm_img} alt="" width="64px" height="64px" />
          <h3 class="">Confirmed</h3>
          <span>{mystateName.confirmed}</span>
        </section>
      </div>
      <div id="Active" class="col-lg-3 my-3 col-sm-5">
        <section class="sec2">
          <img src={active_img} alt="" width="64px" height="64px" />
          <h3 class="">Active</h3>
          <span>{mystateName.active}</span>
        </section>
      </div>
      <div id="Recovered" class="col-lg-3 my-3  col-sm-5">
        <section class="sec3">
          <img src={recover_img} alt="" width="64px" height="64px" />
          <h3 class="">Recovered</h3>
          <span>{mystateName.recovered}</span>
        </section>
      </div>
      <div id="Deaths" class="col-lg-3 my-3  col-sm-5">
        <section class="sec4">
          
          <img src={death_img} alt="" width="64px" height="64px" />
          <h3 class="">Death</h3>
          <span>{mystateName.deaths}</span>
        </section>
      </div>
    </div>
  </div>
  <div style={{overflowX:'scroll', width:'100%'}}>
    <table>
      <tr id="theader">
         <th colspan="8"><span><input type="text" placeholder="Search District...." value={searchTerm} onChange={handleChange} /></span></th> 
      </tr> 
      <tr>
      <th>
        District
      </th>
      <th>
        Confirmed-Cases
      </th>
      <th>
        New Confirmed
      </th>
      
      
      <th>
        Active-Cases
      </th>
      <th>
        Total Recovered
      </th>
      <th>
        New Recovered
      </th>
     
      <th>
        Total Deaths
      </th>
      <th>
        New Deaths
      </th>
      
      
      
    </tr>
       {allDistrict.map((val)=>{
         let dname = Object.keys(val);
          
         return(dname.map((val2)=>{
         if(val2.toLowerCase().includes(searchTerm.toLowerCase())){
          
      
           
          return( <><tr>
            <td> <a>{val2}</a></td>
            <td> <a href=""> {val[val2].confirmed}</a></td>
             <td id="newcase"> <a href=""> +{val[val2].delta.confirmed}</a></td>
            <td> <a href=""> {val[val2].active}</a></td>
            <td> <a href=""> {val[val2].recovered}</a></td>
             <td id="newrecovered"> <a href=""> +{val[val2].delta.recovered}</a></td> 
            <td> <a href=""> {val[val2].deceased}</a></td>
             <td id="newdeath"> <a href=""> +{val[val2].delta.deceased}</a></td> 
            
          </tr></>)}}))})}
            
         
      
     
           
           
    
        
      
    </table></div>
    <div class="paginate container">
      <pagination-controls class="my-pagination" ></pagination-controls>
       </div>
      
  
  </div>

</>)
}

export default District