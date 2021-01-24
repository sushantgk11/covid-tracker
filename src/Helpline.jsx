import React, { useState } from 'react';
import './Helpline.css';
import axios from 'axios';

function  Helpline(){
const [helplineNo, setHelplineNo] = useState([]);

useEffect(()=>{
    async function getHelpline(){
        const helpline = await axios.get(`https://covid-19india-api.herokuapp.com/v2.0/helpline_numbers`);
    }
})




return(<><div class="main">
<h2>Helpline Numbers for COVID-19(INDIA)</h2>
<p>Email : {{helpline_email}}</p>
<p>Central Helpline Number : {{helpline_number}}</p>
<p>Toll Free : {{toll_free}} </p>
<table>
  <tr>
    <th>State/UT</th>
    <th>Helpline-Number</th>
  </tr>
  <tr>
    <td>{{state_or_UT}}</td>
    <td>{{helpline_number}}</td>
  </tr>
</table>
</div></>)
}

export default Helpline;