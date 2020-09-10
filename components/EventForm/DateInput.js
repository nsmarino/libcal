const DateInput = ({ name, label, register, errors, required }) => {
    return (
    <div>
      <label>{label}
        <input type="date" name={name} ref={register({ required: {required} })} />
      </label>
      {errors[name] && <p>This field is required</p>}
    </div>
    )
  }
  
  export default DateInput