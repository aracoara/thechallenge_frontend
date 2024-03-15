import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useTournament } from './TournamentContext'; 


const RankingGraphs = ({ rodada }) => { // Agora aceitamos 'rodada' como prop
  const [dados, setDados] = useState({});
  const { tournament } = useTournament();

  useEffect(() => {
    const fetchTournamentScores = async () => {
      if (tournament.short_name && tournament.year) {
        try {
          const apiUrl = `https://thechallenge-solino.pythonanywhere.com/pontuacoes/${tournament.short_name}/${tournament.year}/${rodada}`;
          // const apiUrl = `http://127.0.0.1:5000/pontuacoes/${tournament.short_name}/${tournament.year}/${rodada}`;

          const response = await axios.get(apiUrl);
          // Utilizando setDados conforme especificado, mantendo a estrutura dos dados para o gráfico
          setDados({
            labels: response.data.map(item => item.username),
            pontosGanhos: response.data.map(item => item.pontos_ganhos),
            pontosPossiveis: response.data.map(item => item.pontos_possiveis),
          });
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      } else {
        console.log("Informações do torneio não disponíveis para buscar pontuações.");
      }
    };

    fetchTournamentScores();
  }, [tournament, rodada]);  
  // useEffect(() => {
  //   const apiUrl = `http://127.0.0.1:5000/pontuacoes/rodada/${rodada}`; 
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(apiUrl);
  //       if (!response.ok) throw new Error('Network response was not ok');

  //       const data = await response.json();
  //       setDados({
  //         labels: data.map(item => item.username),
  //         pontosGanhos: data.map(item => item.pontos_ganhos),
  //         pontosPossiveis: data.map(item => item.pontos_possiveis),
  //       });
  //     } catch (error) {
  //       console.error("Erro ao buscar dados da API:", error);
  //     }
  //   };

  //   fetchData();
  // }, [rodada]); // Dependência do useEffect agora inclui 'rodada'

  const chartData = {
    labels: dados.labels,
    datasets: [
      {
        label: 'Pontos Ganhos',
        data: dados.pontosGanhos,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barThickness: 10, // ou ajuste conforme necessário
      },
      {
        label: 'Pontos Possíveis',
        data: dados.pontosPossiveis,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 10, // ou ajuste conforme necessário
      }
    ]
  };

  const options = {
    indexAxis: 'y', // Define o eixo do gráfico para horizontal
    scales: {
      x: {
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: `Gráficos de Ranking - Rodada ${rodada}`,
      },
    },
    maintainAspectRatio: false // Isso permite definir a altura do gráfico de forma independente
  };

  return (
    <div>
      <h3 className="text-center">Ranking Charts</h3>
      <div style={{ height: 'auto', minHeight: '700px' }}> {/* Ajuste a altura mínima conforme necessário */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};


export default RankingGraphs;


// const RankingGraphs = () => {
//     const [dados, setDados] = useState({});
//     // Defina a rodada manualmente aqui
//     const rodada = 'QF'; // Por exemplo, para a rodada "Quartas de Final"
//     const apiUrl = `http://127.0.0.1:5000/pontuacoes/rodada/${rodada}`;


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) throw new Error('Network response was not ok');

//         const data = await response.json();
//         setDados({
//           labels: data.map(item => item.username),
//           pontosGanhos: data.map(item => item.pontos_ganhos),
//           pontosPossiveis: data.map(item => item.pontos_possiveis),
//         });
//       } catch (error) {
//         console.error("Erro ao buscar dados da API:", error);
//       }
//     };

//     fetchData();
//   }, [rodada]);

  // Aqui configuramos os dados do gráfico com base nos dados recebidos


