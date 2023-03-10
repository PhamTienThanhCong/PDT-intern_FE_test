import { Link } from "react-router-dom";

function ItemTableComponent({ item, index }) {
    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
                <Link to={`/detail/${index + 1}`}>Chi tiết</Link>
            </td>
        </tr>
    );
}

export default ItemTableComponent;