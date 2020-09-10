const NumberInput = ({name, label, register, errors}) => {
    return (
    <div>
      <label>{label}
        <input type="number" name={name} ref={register({ required: true })} />
      </label>
      {errors[name] && <p>This field is required</p>}
    </div>
    )
  }
  
  export default NumberInput