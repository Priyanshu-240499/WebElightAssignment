import { useEffect,useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Row.css";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { setuserData } from "../../Redux_Toolkit/userData";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Convert,AuthorCommit,AuthorActivity} from "../../Functions/contributorData";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { setchartdata } from "../../Redux_Toolkit/Chart1/chart1";
import {setchart1commit} from "../../Redux_Toolkit/Chart1/commit"
import {setchart1add} from "../../Redux_Toolkit/Chart1/addition"
import {setchart1del} from "../../Redux_Toolkit/Chart1/deletion"
import { setchart2data } from "../../Redux_Toolkit/Chart2/chart2";
import {setchart2commit} from "../../Redux_Toolkit/Chart2/commit2"
import {setchart2add} from "../../Redux_Toolkit/Chart2/addition2"
import {setchart2del} from "../../Redux_Toolkit/Chart2/deletetion2"

export default function Row() {
  const selectRef=useRef()
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const data = useSelector((state) => state.userData);
    const graph1Data=useSelector((state)=>state.Chart1)
    const chart1Commit=useSelector((state)=>state.chart1commit)
    const chart1add=useSelector((state)=>state.chart1add)
    const chart1del=useSelector((state)=>state.chart1del)
    const graph2Data=useSelector((state)=>state.chart2)
    const chart2Commit=useSelector((state)=>state.chart2commit)
    const chart2add=useSelector((state)=>state.chart2add)
    const chart2del=useSelector((state)=>state.chart2del)
    const dispatch = useDispatch();
    
    // Setting user Data
    useEffect(() => {
      fetch(
        "https://api.github.com/search/repositories?q=created:>2023-02-10&sort=stars&order=desc&page=1"
      )
        .then((res) => res.json())
        .then((resData) => {
          dispatch(setuserData(resData.items));
        }).catch(e=>console.log(e))
    }, []);
    // Function for Infinite scrolling using react-InfiniteScrolling package
    const fetchMoreData = (function () {
      let page = 2;
      return () => {
        fetch(
          `https://api.github.com/search/repositories?q=created:>2023-02-01&sort=stars&order=desc&page=${
            page + 1
          }`
        )
          .then((res) => res.json())
          .then((resData) => {
            dispatch(setuserData(resData.items));
          }).catch(e=>console.log(e))
      };
    })();
    // Function to fetch graph Data
   async function getGraphData(fullName,author) {
      if (expanded === false) {
      let [res1, res2,res3] = await Promise.all([
        fetch(`https://api.github.com/repos/${fullName}/stats/contributors`).then(response => response.json()),
        fetch(`https://api.github.com/repos/${fullName}/stats/commit_activity`).then(response => response.json()),
        fetch(`https://api.github.com/repos/${fullName}/stats/code_frequency`).then(response => response.json()),
    ]);
    console.log(res1,res2);
   if(typeof res1 === 'object' &&
   !Array.isArray(res1) &&
   res1 !== null){
    dispatch(setchartdata("No Data"))
   }
   else{
    contributorsData(res1)
   }
   if(typeof res2 === 'object' &&
   !Array.isArray(res2) &&
   res2 !== null){
    dispatch(setchart2data("No Data"))
   }
   else{
    authorCommitData(res2,author)
   }
    
    
    weeklyActivity(res3,author)
      }
      else{
        dispatch(setchartdata([]))
        dispatch(setchart2data([]))
      }
    }

    function contributorsData(resData) {
           const optioncommit=Convert(resData,"c")
            const optionadd=Convert(resData,"a")
            const optiondel=Convert(resData,"d")
            dispatch(setchartdata(optioncommit))
            dispatch(setchart1commit(optioncommit))          
            dispatch (setchart1add(optionadd))            
            dispatch(setchart1del(optiondel))
    }

    function authorCommitData(res2,author) {
      const authorCommit=AuthorCommit(res2,author)
      dispatch(setchart2data(authorCommit)) 
      dispatch(setchart2commit(authorCommit))  
    }
    function weeklyActivity(res3,author) {
      const weeklyadd=AuthorActivity(res3,author,'a')
      const weeklydel=AuthorActivity(res3,author,'d')
      dispatch(setchart2add(weeklyadd))
      dispatch(setchart2del(weeklydel))
    }
   function setGrap1ghData(selected) {
    switch (selected) {
      case "a":
        dispatch(setchartdata(chart1add))
        dispatch(setchart2data(chart2add))
        break;
        case "d":
          dispatch(setchartdata(chart1del))
          dispatch(setchart2data(chart2del))
        break;
        case "c":
          dispatch(setchartdata(chart1Commit))
          dispatch(setchart2data(chart2Commit))
        break;
    
      default:
        break;
    }
   }

    return (
        <div className="userRows">
          {data.length === 0 ? (
            <Spinner />
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<Spinner />}
            >
    
              {data.map((item, index) => {
                return (
                  <div key={item.full_name} onClick={() => getGraphData(item.full_name,item.owner.login)}>
                    <Accordion
                      expanded={expanded === `panel${index + 1}`}
                      onChange={handleChange(`panel${index + 1}`)}
                      className="row"
                      key={item.full_name}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        key={item.full_name}
                      >
                        <div className="avatar">
                          <img
                            src={item.owner.avatar_url}
                            alt={item.name}
                            loading="lazy"
                            height="50%"
                            width="50%"
                          />
                        </div>
                        <div className="description">
                          <h2>{item.name}</h2>
                          <h5>{item.description}</h5>
                          <div className="rating">
                            <span role="img" aria-label="stargazers_count">
                              No. of stars: {item.stargazers_count}⭐
                            </span>
                            <span>No. of issue: {item.open_issues}</span>
                            <span>
                              Last pushed {item.updated_at} by {item.owner.login}
                            </span>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <select onChange={(e)=>setGrap1ghData(e.target.value)} ref={selectRef}>
                          <option value="c">Commit</option>
                          <option value="a">Addition</option>
                          <option value="d">Deletion</option>
                        </select>
                        
                        {graph1Data==="No Data"?<p>Error 202, request has been submitted, plz try after some time for contributors graph</p>:(graph1Data.length===0?<h1>Loading...</h1>:<HighchartsReact highcharts={Highcharts} options={graph1Data} />)}
                        {graph2Data==="No Data"?<p>Error 202, request has been submitted, plz try after some time for authors daily acivity</p>:(graph2Data.length===0?<h1>Loading...</h1>:<HighchartsReact highcharts={Highcharts} options={graph2Data} />)}
                       
                       
                      </AccordionDetails>
                    </Accordion>
                  </div>
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      );
    }