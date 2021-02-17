import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">&copy; 2017-2021 Company Name</p>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <Link to="/about">About</Link>
                </li>
                <li className="list-inline-item">
                    <Link to="/terms">Terms</Link>
                </li>
                <li className="list-inline-item">
                    <Link to="/support">Support</Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer