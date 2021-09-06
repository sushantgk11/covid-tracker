import React, { useEffect, useState } from "react";
import "./District.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import confirm_img from "./assets/microscope.png";
import active_img from "./assets/patient (1).png";
import recover_img from "./assets/recovered.png";
import death_img from "./assets/death.png";
import states from "india-state-codes";

function findIndexByKeyValue(_array, key, value) {
  for (var i = 0; i < _array.length; i++) {
    return _array[i].map((val, indx) => {
      if (val[key] == value) {
        return indx;
      }
    });
  }
  return -1;
}

function District() {
  const [allDistrict, setDistrict] = useState([]);
  const [mystateName, setMystate] = useState([]);
  const { state } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  useEffect(() => {
    async function getDistrict() {
      const indStates = await axios.get(
        `https://data.covid19india.org/v4/min/data.min.json`
      );
      setDistrict([indStates]);
    }
    getDistrict();

    setSearchResults(searchTerm);
  });
  return (
    <>
      <div class="main">
        {allDistrict.map((val) => {
          return (
            <>
              <div class="container">
                <div class="row" id="heading">
                  <h2>
                    <span id="stName">
                      {states.getStateNameByStateCode(`...${state}.=`)}
                    </span>{" "}
                    Cases of COVID-19
                  </h2>
                  {/* <p>[Updated on {mystateName.lastupdatedtime}]</p> */}
                </div>

                <div class="row">
                  <div id="Total" class="col-lg-3 my-3 col-sm-5">
                    <section class="sec1">
                      <img
                        src={confirm_img}
                        alt=""
                        width="64px"
                        height="64px"
                      />
                      <h3 class="">Confirmed</h3>
                      <span>{val.data[`${state}`].total.confirmed}</span>
                    </section>
                  </div>

                  <div id="Active" class="col-lg-3 my-3 col-sm-5">
                    <section class="sec2">
                      <img src={active_img} alt="" width="64px" height="64px" />
                      <h3 class="">Active</h3>
                      <span>{val.data[`${state}`].total.tested}</span>
                    </section>
                  </div>
                  <div id="Recovered" class="col-lg-3 my-3  col-sm-5">
                    <section class="sec3">
                      <img
                        src={recover_img}
                        alt=""
                        width="64px"
                        height="64px"
                      />
                      <h3 class="">Recovered</h3>
                      <span>{val.data[`${state}`].total.recovered}</span>
                    </section>
                  </div>
                  <div id="Deaths" class="col-lg-3 my-3  col-sm-5">
                    <section class="sec4">
                      <img src={death_img} alt="" width="64px" height="64px" />
                      <h3 class="">Death</h3>
                      <span>{val.data[`${state}`].total.deceased}</span>
                    </section>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        <div style={{ overflowX: "scroll", width: "100%" }}>
          <table>
            <tr id="theader">
              <th colspan="8">
                <span>
                  <input
                    type="text"
                    placeholder="Search District...."
                    value={searchTerm}
                    onChange={handleChange}
                  />
                </span>
              </th>
            </tr>
            <tr>
              <th>District</th>
              <th>Confirmed-Cases</th>
              <th>Recovered</th>
              <th>Death</th>
              <th>Tested</th>
              <th>
                Vaccinated 1<sup>st</sup> Dose
              </th>
              <th>
                Vaccinated 2<sup>nd</sup> Dose
              </th>
            </tr>
            {allDistrict.map((val) => {
              return Object.keys(val.data[`${state}`].districts).map((val3) => {
                if (val3.toLowerCase().includes(searchTerm.toLowerCase()))
                  return (
                    <>
                      <tr>
                        <td>
                          {" "}
                          <a>{val3}</a>
                        </td>
                        <td>
                          {" "}
                          <a href="">
                            {" "}
                            {
                              val.data[`${state}`].districts[val3].total
                                .confirmed
                            }
                          </a>
                        </td>
                        <td className="recovered">
                          {" "}
                          <a href="">
                            {" "}
                            {
                              val.data[`${state}`].districts[val3].total
                                .recovered
                            }
                          </a>
                        </td>
                        <td className="death">
                          {" "}
                          <a href="">
                            {" "}
                            {
                              val.data[`${state}`].districts[val3].total
                                .deceased
                            }
                          </a>
                        </td>
                        <td className="test">
                          {" "}
                          <a href="">
                            {" "}
                            {val.data[`${state}`].districts[val3].total.tested}
                          </a>
                        </td>
                        <td className="dose">
                          {" "}
                          <a href="">
                            {" "}
                            {
                              val.data[`${state}`].districts[val3].total
                                .vaccinated1
                            }
                          </a>
                        </td>
                        <td className="dose">
                          {" "}
                          <a href="">
                            {" "}
                            {
                              val.data[`${state}`].districts[val3].total
                                .vaccinated2
                            }
                          </a>
                        </td>
                      </tr>
                    </>
                  );
              });
            })}
          </table>
        </div>
        <div class="paginate container">
          <pagination-controls class="my-pagination"></pagination-controls>
        </div>
      </div>
    </>
  );
}

export default District;
