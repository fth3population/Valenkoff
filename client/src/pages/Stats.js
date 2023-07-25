import React, {useEffect, useState, useMemo} from "react";
import StatsService from "../services/StatsService";
import UsesTopTable from "../components/UsesTopTable";
import LikesTopTable from "../components/LikesTopTable";

const Stats = () => {
  const [oneDayUsers, setOneDayUsers] = useState(0);
  const [oneWeakUsers, setOneWeakUsers] = useState(0);
  const [oneYearUsers, setOneYearUsers] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [likesData, setLikesData] = useState([])
  const [usesData, setUsesData] = useState([]);


  const getOneDayUsers = async  () => {
    return await StatsService.fetchDayUsers();

  }
  getOneDayUsers().then((resp)=> setOneDayUsers(resp))

  const getOneWeekUsers = async  () => {
    return await StatsService.fetchWeakUsers();

  }
  getOneWeekUsers().then((resp)=> setOneWeakUsers(resp))
  const getOneYearUsers = async  () => {
    return await StatsService.fetchYearUsers();

  }
  getOneYearUsers().then((resp)=> setOneYearUsers(resp))
  const getAllUsers = async  () => {
    return await StatsService.fetchAllUsers();

  }
  getAllUsers().then((resp)=> setAllUsers(resp))


  const getUsesTop = async  () => {
    return await StatsService.fetchPatternsByUses();

  }
  getUsesTop().then((resp)=> setUsesData(resp))

  useEffect(() => {
    getUsesTop()
  },[])
  const getLikesTop = async  () => {
    return await StatsService.fetchPatternsByLikes();

  }
  getLikesTop().then((resp)=> setLikesData(resp))
  useEffect(() => {
    getLikesTop()
  },[])



  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <h1>Количество зарегистрированный юзеров за день {oneDayUsers}</h1>
            <h1>Количество зарегистрированный юзеров за неделю {oneWeakUsers}</h1>
            <h1>Количество зарегистрированный юзеров за год {oneYearUsers}</h1>
            <h1>Количество зарегистрированный юзеров за все время {allUsers}</h1>

            {/*<h1>{likesTop.data}</h1>*/}
              <LikesTopTable data = {likesData}/>
              <UsesTopTable data = {usesData}/>

           </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
