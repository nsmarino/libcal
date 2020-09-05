const TimeInput = ({name, label, register, errors}) => {
    return (
    <div>
      <label>{label}
        <input type="time" name={name} ref={register({ required: true })} />
      </label>
      {errors[name] && <p>This field is required</p>}
    </div>
    )
  }
  
  export default TimeInput