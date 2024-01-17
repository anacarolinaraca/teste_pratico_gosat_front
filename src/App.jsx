import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import { Line, getElementsAtEvent } from 'react-chartjs-2'
import './App.css'
import { useState } from 'react'
import { fetchApiGosat } from './service/api'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

function App() {

  const [chartData, setChartData] = useState();

  const createChartData = (instituicoes) => {
    return {
      labels: instituicoes.map((instituicao) => instituicao.instituicaoFinanceira),
      datasets: [{
        label: 'Instituições Financeiras',
        data: instituicoes.map((instituicao) => instituicao.total),
        borderColor: 'aqua',
        backgroundColor: 'aqua',
        tension: 0.4,
      }]
    };
  };

  useEffect(() => {
    const getApi = async () => {
      const fetchApi = await fetchApiGosat().then((instituicoes) => {
        setChartData(createChartData(instituicoes));
      });
      return fetchApi;
    }
    getApi();
  }, []);

  const options = { };

  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementsAtEvent(chartRef.current, event)[0].index);
  }

  return (
    <>
      <h1>Instituições Financeiras que mais aparece</h1>
      {
        chartData
        ? <Line
          data = { chartData }
          options = { options }
          onClick = { onClick }
          ref = { chartRef }
        ></Line>
        : 0
      }
    </>
  )
}

export default App
