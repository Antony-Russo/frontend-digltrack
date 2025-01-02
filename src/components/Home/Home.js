import React from 'react';
import "./Home.css";
import HomeCard from "../HomeCard/HomeCard";
import NavBar from '../NavBar/NavBar';
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuFileCheck } from "react-icons/lu";
import { BsFuelPump } from "react-icons/bs";
import { IoAirplaneOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";

const Home = () => {
  const homeBranchData = [
    {
      id:1,
      count: 0,
      status: "coupon Requested",
      bgColor: "#1ba1e2",
      icon: IoDocumentTextOutline,
    },
    {
      id:2,
      count: 0,
      status: "coupon Approved",
      bgColor: "#f09609",
      icon: LuFileCheck,
    },
    {
      id:3,
      count: 0,
      status: "coupon Generated",
      bgColor: "#89c4ff",
      icon: BsFuelPump,
    },
    {
      id:4,
      count: 0,
      status: "coupon Utillized",
      bgColor: "#004589",
      icon:IoAirplaneOutline,
    },
    {
      id:5,
      count: 0,
      status: "coupon inProgress",
      bgColor: "#00cfd4",
      icon:MdOutlineAccessTime,
    },
    {
      id:6,
      count: 0,
      status: "coupon canceled",
      bgColor: "#c3cb6e",
      icon:AiOutlineStop,
    },
    {
      id:7,
      count: 0,
      status: "vehicles",
      bgColor: "#7acec2",
      icon:FiTruck,
    },
  
  ];

  return (
    <>
      <NavBar />
      <main className='branch-main'>
        <div className='home-branch-inputs'>
          <div className='branch-input'>
            <label htmlFor='branch'>Branch</label>
              <select className='home-select' id='branch'>
                <option>All</option>
                <option>SPL-CORP</option>
                <option>CHENNAI</option>
              </select> 
          </div>
          <div className='home-branch-date-inputs'>
            <div className='branch-input'>
              <label htmlFor='fromDate'>From Date</label>
              <input type='date' className='home-select' id='fromDate'/>
            </div>
            <div className='branch-input'>
              <label htmlFor='toDate'>To Date</label>
              <input type='date' className='home-select' id='toDate'/>
            </div>
          </div>
        </div>

        <article>
          <ul className='list-home'>
            {homeBranchData.map(branch => (
              <HomeCard key={branch.id} branchData={branch}  />
            ))}
          </ul>
        </article>

        <article className='pfs-container'>
          <h3 className='pf-head'>PFS Wise Consumption</h3>
        </article>
      </main>
    </>
  );
};

export default Home;
