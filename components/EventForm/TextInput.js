import styled from '@emotion/styled'

const StyledTextInput = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  input {
    font-family: Georgia;
    max-width: 80%;
    flex: 1 0 auto;
    font-size: 1.5rem;
    padding: 0.25rem;
    border: 1px solid grey;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  }
  
`

const TextInput = ({register, name, label, errors}) => {
  return (
  <StyledTextInput>
      <input name={name} placeholder={label} ref={register({ required: true })} />
    {errors[name] && <p>This field is required</p>}
  </StyledTextInput>
  )
}

export default TextInput