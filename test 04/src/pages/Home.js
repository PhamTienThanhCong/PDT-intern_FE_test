import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemTableComponent from '../components/ItemTableComponent';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    // change title page
    useEffect(() => {
        document.title = 'Home';
    }, []);

    useEffect(() => {
        const pageSize = process.env.REACT_APP_PAGE_SIZE;
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            axios.get(`${apiUrl}?limit=${pageSize}&offset=${(page - 1) * pageSize}`)
                // then and error 
                .then((response) => {
                    setData(response.data.results);
                    setTotalPage(Math.ceil(response.data.count / pageSize));
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [page]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPage) return;
        setLoading(true);
        setPage(page);
    }

    return (
        <>
            <Pagination>
                <Pagination.Prev 
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading || error }
                />

                <Pagination.Item>{page}</Pagination.Item>

                <Pagination.Next 
                    onClick={() => handlePageChange(page + 1)}
                    disabled={ page === totalPage || loading || error }
                />
            </Pagination>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Chi tết</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? <tr><td colSpan="3" className='text-center'>Loading...</td></tr> :
                            error ? <tr><td colSpan="3" className='text-center'>Error data is not response</td></tr> :
                                data.map((item, index) => (
                                    <ItemTableComponent key={index} item={item} index={index} />
                                ))
                    }
                </tbody>
            </Table>
            
        </>
    );
}

export default Home;