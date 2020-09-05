const DescriptionTextArea = ({register, errors}) => {
    return (
    <div>
      <label>Description
        <textarea name="description" ref={register({ required: true })} />
      </label>
      {errors.description && <p>This field is required</p>}
    </div>
    )
  }
  
  export default DescriptionTextArea