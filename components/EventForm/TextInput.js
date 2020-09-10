const TextInput = ({register, name, label, errors}) => {
  return (
  <div>
    <label>{label}
      <input name={name} ref={register({ required: true })} />
    </label>
    {errors[name] && <p>This field is required</p>}
  </div>
  )
}

export default TextInput