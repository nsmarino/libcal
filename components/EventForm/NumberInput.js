import styled from '@emotion/styled'

const StyledNumberInput = styled.div`
display: inline-flex;
flex: 1 1 auto;
flex-direction: column;
align-items: center;

button {
  background: black;
  color: white;
  border: none;
  width: 1rem;
  height: 2rem;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
-webkit-appearance: none; 
margin: 0; 
}
input[type=number] {
-moz-appearance:textfield;
width: 2rem;
height: 2rem;
text-align: center;
}
`

const NumberInput = ({name, label, register, errors, getValues, setValue}) => {

  const handleMinus = (e) => {
    e.preventDefault()
    const value = parseInt(getValues(`${name}`),10)
    setValue(`${name}`, value > 1 ? value - 1 : 1)
    }
  
  const handlePlus = (e) => {
    e.preventDefault()
    const value = parseInt(getValues(`${name}`),10)
    setValue(`${name}`, value < 25 ? value + 1 : 25)

  }

  
  return (
    <StyledNumberInput>
      <label htmlFor={name}>{label}</label>
      <div>
        <button onClick={handleMinus}>-</button>
        <input type="number" name={name} ref={register({ required: true })} />
        <button onClick={handlePlus}>+</button>
      </div>
      {errors[name] && <p>This field is required</p>}
    
    </StyledNumberInput>
    )
  }
  
  export default NumberInput