const InputCheckbox = ({id, label, value, setValue}) => {
    return(
        <div className="form-group row">
            <label htmlFor={id} className="col-sm-2 col-form-label">{ label }</label>
            <div className="col-sm-10">
                <input type="checkbox" className="form-control" id={id}
                checked = {value}
                value = {value}
                onChange={(e) => setValue(e.currentTarget.checked)}
                />
            </div>
        </div>
    )
}

export default InputCheckbox