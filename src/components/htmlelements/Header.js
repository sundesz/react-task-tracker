import React from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, onClick, formValue}) => {

    const location = useLocation()

    return (
        <nav className="navbar navbar-dark bg-dark" style={{marginBottom: '2rem'}}>
            <div className="navbar-brand">{title}</div>

            { location.pathname === '/' && <Button
                btnName={formValue ? 'Close form' : 'Add task'}
                btnClass={`btn ${formValue ? 'btn-danger' : 'btn-success'}`}
                onClick={onClick}
            />}
        </nav>
    )
}

Header.defaultProps = {
    title: 'Task tracker'
}

export default Header