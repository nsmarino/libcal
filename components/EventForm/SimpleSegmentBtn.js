
const SimpleSegmentBtn = ({ register, name, value, label, currentValue}) => {
  return (
  <label 
    htmlFor={value} 
    className={currentValue===value ? 'selected' : null}
  >{label}
    <input type="radio" id={value} name={name} value={value} ref={register} />
  </label>
  )
}

export default SimpleSegmentBtn