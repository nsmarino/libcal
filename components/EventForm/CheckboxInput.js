const CheckboxInput = ({name, label, register}) => {
    return (
    <div>
      <label>
        <input type="checkbox" name={name} ref={register} />
        {label}
      </label>
    </div>
    )
  }
  
  export default CheckboxInput