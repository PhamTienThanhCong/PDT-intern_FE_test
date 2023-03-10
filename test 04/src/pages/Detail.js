import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const ImgStyle = {
    width: '100%',
    minHeight: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function Detail() {
    const [data, setData] = useState({
        name: 'Loading...',
        height: 'Loading...',
        weight: 'Loading...',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeView, setTypeView] = useState('back default');
    const { id } = useParams();

    // change title page
    useEffect(() => {
        document.title = `Detail ${id}`;
        const apiUrl = process.env.REACT_APP_API_URL;
        axios.get(`${apiUrl}/${id}`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <>
            <Link to="/">Trở về trang chủ</Link>
            <Card>
                <div style={ ImgStyle }>
                    {
                        loading ? (<Spinner style={{
                            width: '3rem',height: '3rem',
                        }} animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>) :
                        error ? (<p>{error.message}</p>) :
                        (
                            <div>
                                <Card.Img 
                                    style={{ height: '400px', width: '400px' }} 
                                    variant="top" 
                                    src={ typeView === 'front default' ? data.sprites.back_default : data.sprites.front_default } 
                                />
                                <br />
                                <Button     
                                    variant="primary"
                                    onClick={() => setTypeView(
                                        typeView === 'front default' ? 'back default' : 'front default'
                                    )}
                                >{typeView}</Button>
                            </div>
                        )
                    }
                </div>
                <Card.Body>
                    <p><b>Tên:</b> {data.name}</p>
                    <p><b>Chiều Cao:</b> {data.height}</p>
                    <p><b>Cân nặng:</b> {data.weight}</p>
                    <b>Danh sách các hệ:</b>
                    <ul>
                        {data.types && data.types.map((item, index) => (
                            <li key={index}> {item.type.name}, </li>
                        ))}
                    </ul>
                    <b>danh sách năng lực:</b> 
                    <ul>
                        {data.abilities && data.abilities.map((item, index) => (
                            <li key={`abilities${index}`} > {item.ability.name}, </li>
                        ))}
                    </ul>
                        
                </Card.Body>
            </Card>
        </>

    );
}

export default Detail;