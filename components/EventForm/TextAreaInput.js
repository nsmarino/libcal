const TextAreaInput = ({name, label, register, errors}) => {
    return (
    <div>
      <label>{label}
        <textarea name={name} ref={register({ required: true })} />
      </label>
      {errors.description && <p>This field is required</p>}
    </div>
    )
  }
  
  export default TextAreaInput