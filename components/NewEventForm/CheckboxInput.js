const CheckboxInput = ({name, label, register, errors}) => {
    return (
    <div>
      <label>{label}
        <input type="checkbox" name={name} ref={register} />
      </label>
      {errors[name] && <p>This field is required</p>}
    </div>
    )
  }
  
  export default CheckboxInput