import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './Country.css';
import confirm_img from './assets/microscope.png';
import active_img from './assets/patient (1).png';
import recover_img from './assets/recovered.png';
import death_img from './assets/death.png';


const Country = () => {


      const [confirm, setConfirm] = useState();
      const [active, setActive] = useState();
      const [recover, setRecover] = useState();
      const [death, setDeath] = useState();
      const [created, setCreated] = useState(); 

      const [allCountries, setCountries] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
       const handleEvent = (event) =>{
        setSearchTerm(event.target.value);
       }

  useEffect(()=>{
    async function getGlobal() {
      const resp = await axios.get(`http://api.coronatracker.com/v3/stats/worldometer/global`);
      console.log(resp);
      setConfirm(resp.data.totalConfirmed);
      setActive(resp.data.totalActiveCases);
      setRecover(resp.data.totalRecovered);
      setDeath(resp.data.totalDeaths);
      setCreated(resp.data.created);
      

    }
    getGlobal();

    async function getCountries(){
      const countries = await axios.get(`https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=`);
      console.log(countries);
      setCountries([countries]);
    }
    getCountries();

  });





    return (
  <>  
<div className="main">
  <div className="container">
    <div className="row" id="heading">
      <h2>Total World-Wide Cases of COVID-19</h2>
      {/* <p>[Updated on {allCountries.data[1].country} ]</p> */}
    </div>
   
  <div className="row">
    
    <div id="Total" className="col-lg-3 my-3 col-sm-5">
      <section className="sec1">
        <img src={confirm_img } alt="not displaying" width="64px" height="64px"/>
        <h3 className="">Confirmed</h3>
        <span>{confirm}</span>
      </section>
    </div>
    <div id="Active" className="col-lg-3 my-3 col-sm-5">
      <section className="sec2">
        <img src={active_img} alt="" width="64px" height="64px" />
        <h3 className="">Active</h3>
        <span>{active}</span>
      </section>
    </div>
    <div id="Recovered" className="col-lg-3 my-3  col-sm-5">
      <section className="sec3">
          <img src={recover_img} alt="" width="64px" height="64px"/>
        <h3 className="">Recovered</h3>
        <span>{recover}</span>
      </section>    
    </div>
    <div id="Deaths" className="col-lg-3 my-3  col-sm-5">
      <section className="sec4">
        
        <img src={death_img} alt="" width="64px" height="64px"/>
        <h3 className="">Death</h3>
        <span>{death}</span>
      </section>
    </div>
  </div>
</div>
  <table>
    <tr id="theader">
       <th colSpan="8"><span><input type="text" placeholder="Search Country...." value={searchTerm} onChange={handleEvent}/></span> </th> 
    </tr> 
    <tr>
    <th>
      Country
    </th>
    <th>
      Confirmed-Cases
    </th>
    <th>
      New-Confirmed
    </th>
    <th>
      Active-Cases
    </th>
    <th>
      Recovered-Cases
    </th>
    <th>
      Total-Deaths
    </th> 
    
    <th>
      New-Deaths
    </th>
    
    
  </tr>
    
  
      
     {allCountries.map(function (val,indx){
       return ( val.data.map((val2,indx2)=>{
         if(val2.country.toLowerCase().includes(searchTerm.toLowerCase()))
         {
         return(
        <tr>
        <td> <a><img src={`https://www.countryflags.io/${val2.countryCode}/flat/32.png`}/> {val2.country}</a></td>
        <td> <a>{val2.totalConfirmed}</a></td>
        <td id="newcase"> <a>{val2.dailyConfirmed}</a></td>
        <td> <a>{val2.activeCases}</a></td>
        <td> <a>{val2.totalRecovered}</a></td>
    
        <td> <a >{val2.totalDeaths}</a></td>
  
        <td id="newdeath"> <a>{val2.dailyDeaths}</a></td>
        
      </tr>)

       }})
        
    )
      })} 
    
  </table>
   <div className="paginate container">
      <pagination-controls className="my-pagination" ></pagination-controls>
   </div>

</div></>);
}

export default Country; 