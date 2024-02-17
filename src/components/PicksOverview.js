
import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const PicksOverview = () => {
    const [picks, setPicks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const rowsPerPage = 10;

    const [classifiedResults, setClassifiedResults] = useState({});



    useEffect(() => {
        // Função para buscar os palpites dos participantes
        const fetchPicks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/PicksOverview');
                const data = await response.json();
                setPicks(data);
            } catch (error) {
                console.error('Erro ao buscar picks:', error);
            }
        };

        fetchPicks();

            // Função para buscar os resultados classificados
        const fetchClassifiedResults = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/classified-players');
                const data = await response.json();
                setClassifiedResults(data);
            } catch (error) {
                console.error('Erro ao buscar classified-players:', error);
            }
        };

        fetchClassifiedResults();

    }, []);

    const sortedPicks = useMemo(() => {
        let sortablePicks = [...picks];
        if (sortConfig.key !== null) {
            sortablePicks.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortablePicks;
    }, [picks, sortConfig]);

    const sortedAndPaginatedPicks = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return sortedPicks.slice(startIndex, startIndex + rowsPerPage);
    }, [sortedPicks, currentPage, rowsPerPage]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortDirectionIndicator = (key) => {
        return sortConfig.key === key ? (sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼') : '';
    };

    const pageCount = Math.ceil(picks.length / rowsPerPage);
    const paginationItems = Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
        <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
            {page}
        </Pagination.Item>
    ));

    return (
        <Container >
            <Row>
                <Col>
                    <h1 className="text-center my-4">Picks Overview</h1>
                <div className="table-responsive"> {/* Envolver a Table com div.table-responsive */}
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('User')}>Participante{getSortDirectionIndicator('User')}</th>
                                <th onClick={() => requestSort('QF1')}>QF1{getSortDirectionIndicator('QF1')}</th>
                                <th onClick={() => requestSort('QF2')}>QF2{getSortDirectionIndicator('QF2')}</th>
                                <th onClick={() => requestSort('QF3')}>QF3{getSortDirectionIndicator('QF3')}</th>
                                <th onClick={() => requestSort('QF4')}>QF4{getSortDirectionIndicator('QF4')}</th>
                                <th onClick={() => requestSort('QF5')}>QF5{getSortDirectionIndicator('QF5')}</th>
                                <th onClick={() => requestSort('QF6')}>QF6{getSortDirectionIndicator('QF6')}</th>
                                <th onClick={() => requestSort('QF7')}>QF7{getSortDirectionIndicator('QF7')}</th>
                                <th onClick={() => requestSort('QF8')}>QF8{getSortDirectionIndicator('QF8')}</th>
                                <th onClick={() => requestSort('SF1')}>SF1{getSortDirectionIndicator('SF1')}</th>
                                <th onClick={() => requestSort('SF2')}>SF2{getSortDirectionIndicator('SF2')}</th>
                                <th onClick={() => requestSort('SF3')}>SF3{getSortDirectionIndicator('SF3')}</th>
                                <th onClick={() => requestSort('SF4')}>SF4{getSortDirectionIndicator('SF4')}</th>
                                <th onClick={() => requestSort('F1')}>F1{getSortDirectionIndicator('F1')}</th>
                                <th onClick={() => requestSort('F2')}>F2{getSortDirectionIndicator('F2')}</th>
                                <th onClick={() => requestSort('Champion')}>Champion{getSortDirectionIndicator('Champion')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndPaginatedPicks.map((pick) => (
                                <tr key={pick.User}>
                                    <td>{pick.User}</td>
                                    <td className={classifiedResults.QF1 === pick.QF1 ? 'text-success' : 'text-danger'}>{pick.QF1}</td>
                                    <td className={classifiedResults.QF2 === pick.QF2 ? 'text-success' : 'text-danger'}>{pick.QF2}</td>
                                    <td className={classifiedResults.QF3 === pick.QF3 ? 'text-success' : 'text-danger'}>{pick.QF3}</td>
                                    <td className={classifiedResults.QF4 === pick.QF4 ? 'text-success' : 'text-danger'}>{pick.QF4}</td>
                                    <td className={classifiedResults.QF5 === pick.QF5 ? 'text-success' : 'text-danger'}>{pick.QF5}</td>
                                    <td className={classifiedResults.QF6 === pick.QF6 ? 'text-success' : 'text-danger'}>{pick.QF6}</td>
                                    <td className={classifiedResults.QF7 === pick.QF7 ? 'text-success' : 'text-danger'}>{pick.QF7}</td>
                                    <td className={classifiedResults.QF8 === pick.QF8 ? 'text-success' : 'text-danger'}>{pick.QF8}</td>
                                    <td className={classifiedResults.SF1 === pick.SF1 ? 'text-success' : 'text-danger'}>{pick.SF1}</td>
                                    <td className={classifiedResults.SF2 === pick.SF2 ? 'text-success' : 'text-danger'}>{pick.SF2}</td>
                                    <td className={classifiedResults.SF3 === pick.SF3 ? 'text-success' : 'text-danger'}>{pick.SF3}</td>
                                    <td className={classifiedResults.SF4 === pick.SF4 ? 'text-success' : 'text-danger'}>{pick.SF4}</td>
                                    <td className={classifiedResults.F1 === pick.F1 ? 'text-success' : 'text-danger'}>{pick.F1}</td>
                                    <td className={classifiedResults.F2 === pick.F2 ? 'text-success' : 'text-danger'}>{pick.F2}</td>
                                    <td className={classifiedResults.Champion === pick.Champion ? 'text-success' : 'text-danger'}>{pick.Champion}</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </div>
                    <Pagination>{paginationItems}</Pagination>
                </Col>
            </Row>
        </Container>
    );


};

export default PicksOverview;



// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Table } from 'react-bootstrap';
// // import fetchPicks from 'http://127.0.0.1:5000/api/PicksOverview'; 
// // import fetchResults from 'http://127.0.0.1:5000/api/classified-players';

// const PicksOverview = () => {
//     const [picks, setPicks] = useState([]);
//     const [results, setResults] = useState({});

//     useEffect(() => {
//         // Função para buscar os palpites dos participantes
//         const fetchPicks = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:5000/api/PicksOverview');
//                 const data = await response.json();
//                 setPicks(data);
//             } catch (error) {
//                 console.error('Erro ao buscar picks:', error);
//             }
//         };

//         // Função para buscar os resultados classificados
//         const fetchResults = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:5000/api/classified-players');
//                 const data = await response.json();
//                 setResults(data);
//             } catch (error) {
//                 console.error('Erro ao buscar results:', error);
//             }
//         };

//         // Chamada das funções fetch
//         fetchPicks();
//         fetchResults();
//     }, []);

//     return (
//         <Container>
//             <Row>
//                 <Col>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>Participante</th>
//                                 <th>QF1</th>
//                                 <th>QF2</th>
//                                 <th>QF3</th>
//                                 <th>QF4</th>
//                                 <th>QF5</th>
//                                 <th>QF6</th>
//                                 <th>QF7</th>
//                                 <th>QF8</th>
//                                 <th>SF1</th>
//                                 <th>SF2</th>
//                                 <th>SF3</th>
//                                 <th>SF4</th>
//                                 <th>F1</th>
//                                 <th>F2</th>
//                                 <th>Champion</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {picks.map((pick) => (
//                                 <tr key={pick.User}>
//                                     <td>{pick.User}</td> {/* Nome do participante */}
//                                     {Object.keys(pick).filter(key => key !== 'User').map((key) => (
//                                         <td key={key} style={{ 
//                                             backgroundColor: results[key] === pick[key] ? 'green' : 'red' 
//                                         }}>
//                                             {pick[key]}
//                                     </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default PicksOverview;


