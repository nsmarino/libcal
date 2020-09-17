import styled from '@emotion/styled'

const StyledDateInput = styled.div`
  width: 100%;
  display: flex;

  input {
  }

  /* Removes the clear button from date inputs */
input[type="date"]::-webkit-clear-button {
    display: none;
}

input[type="date"]::-webkit-inner-spin-button { 
    display: none;
}


input[type="date"] {
    flex: 1 0 auto;
    padding: 0.25rem;
    border: none;
    -webkit-appearance: none;
    color: grey;
    font-family: Arial;
    font-size: 1rem;
    background:white;
  } 
`

const DateInput = ({ name, label, register, errors, required }) => {
    return (
    <StyledDateInput>
        <input type="date" name={name} ref={register({ required: {required} })} />
      {errors[name] && <p>This field is required</p>}
    </StyledDateInput>
    )
  }
  
  export default DateInput