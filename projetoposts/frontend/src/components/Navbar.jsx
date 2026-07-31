import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to="/">Memórias</Link>
        </h2>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/addmemory">Adicionar Memória</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;