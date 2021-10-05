
import Chart from 'kaktana-react-lightweight-charts'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Select } from "react-select-virtualized";
import {base_url} from '../config/backend.json'
function Charts(token) {
    const [options, setOptions] = useState({
        alignLabels: true,
        timeScale: {
          rightOffset: 12,
          barSpacing: 3,
          fixLeftEdge: true,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          borderVisible: false,
          borderColor: "#fff000",
          visible: true,
          timeVisible: true,
          secondsVisible: false
        }
      });

    const [candlestickSeries, setcandlestickSeries] = useState([]);
    const [stockName, setStockName] = useState([]);
    const [symbolName, setSymbolName] = useState('ACSI');

    useEffect( () => {
        async function gd(){
              let data =  await getEtsData(symbolName,token);
             setcandlestickSeries([{data}]);
        }
        gd();
      }, [symbolName,token]);


    useEffect( () => {
        async function gd2(){
            let data = await getSymbolName(token);
             setStockName(data);
        }
        gd2();
      }, [token]);



    return (
        <div>
        <Chart options={options} candlestickSeries={candlestickSeries} autoWidth height={320} />
        <Select options={stockName} onChange={(selectValue) => {setSymbolName(selectValue.value.split('-')[0])}} />
        </div>
      )
}


async function getEtsData(symbolName,token){
try{  
  const BearerToken = token.token;
    var config = {
        method: 'get',
        url: `${base_url}/etfs/${symbolName}`,
        headers: { 
            'Authorization': `Bearer ${BearerToken.replace(/['"]+/g, '')}`}
      };
     const res = await axios(config)
     let data = res.data[0].data.map(d => {return {time: d.Date, open:d.Open, high: d.High, low: d.Low, close: d.Close }} )
     return data;
    }
      catch(e){
          console.log(e)
          return [];
      }
}

async function getSymbolName(token){
try{  
  const BearerToken = token.token;
    var config = {
        method: 'get',
        url: `${base_url}/symbol/`,
        headers: { 
            'Authorization':`Bearer ${BearerToken.replace(/['"]+/g, '')}`}
      };
     const res = await axios(config)
     let data = res.data.map(d => {return {value: `${d.Symbol}-${d.Security_Name}`, label:`${d.Symbol}-${d.Security_Name}`}} )
    //  console.log(data)
    return data;
    }
      catch(e){
          console.log(e)
          return [];
      }
}

export default Charts;
