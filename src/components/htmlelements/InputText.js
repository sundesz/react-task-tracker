const InputText = ({id, label, value, setValue}) => {
    return(
    <div className="form-group row">
        <label htmlFor={id} className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
            <input
                type="text"
                id={id}
                className="form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    </div>
    )
}

export default InputText