import React from 'react'
import PropTypes from 'prop-types'

const Button = ({btnType, btnName, btnClass, onClick}) => {
    return(
        <button type={btnType} className={btnClass} onClick={onClick}> {btnName} </button>
    )
}

Button.propTypes = {
    btnName: PropTypes.string.isRequired,
    btnClass: PropTypes.string,
}

Button.defaultProps = {
    btnName: 'Add task',
    btnClass: 'btn btn-success',
    btnType: 'button',
}

export default Button