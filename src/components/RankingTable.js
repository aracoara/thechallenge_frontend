import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

const RankingTable = ({ rodada }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }); 

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5000/pontuacoes/rodada/${rodada}`;
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("Falha ao buscar dados da API:", error);
      });
  }, [rodada]);


  // Função para renderizar o indicador de direção da ordenação
  const getSortDirectionIndicator = (key) => {
    return sortConfig.key === key ? (sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼') : '';
  };

  // Função para alterar a ordenação
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Ordenação dos dados
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [data, currentPage, sortConfig, rowsPerPage])

  const pageCount = Math.ceil(data.length / rowsPerPage);

  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }


  return (
    <div>
      <h2 className="text-center">Ranking dos Participantes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => requestSort('ranking_pp')}>Ranking PP{getSortDirectionIndicator('ranking_pp')}</th>
            <th onClick={() => requestSort('ranking_pg')}>Ranking PG{getSortDirectionIndicator('ranking_pg')}</th>
            <th onClick={() => requestSort('username')}>Participante{getSortDirectionIndicator('username')}</th>
            <th onClick={() => requestSort('pontos_possiveis')}>Pontos Possíveis{getSortDirectionIndicator('pontos_possiveis')}</th>
            <th onClick={() => requestSort('pontos_ganhos')}>Pontos Ganhos{getSortDirectionIndicator('pontos_ganhos')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.ranking_pp}</td>
              <td>{item.ranking_pg}</td>
              <td>{item.username}</td>
              <td>{item.pontos_possiveis}</td>
              <td>{item.pontos_ganhos}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default RankingTable;

// const RankingTable = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const rowsPerPage = 20;

//   useEffect(() => {
//     // Substitua 'suaApiUrl' pelo endereço base da sua API e '1' pela rodada que deseja consultar
//     const apiUrl = `http://127.0.0.1:5000/pontuacoes/rodada/QF`;
//     fetch(apiUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setData(data);
//       })
//       .catch(error => {
//         console.error("Falha ao buscar dados da API:", error);
//       });
//   }, []); // Array de dependências vazio significa que este efeito roda uma vez após o primeiro render