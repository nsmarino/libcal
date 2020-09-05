const TitleInput = ({register, errors}) => {
  return (
  <div>
    <label>Title
      <input name="title" ref={register({ required: true })} />
    </label>
    {errors.title && <p>This field is required</p>}
  </div>
  )
}

export default TitleInput