import styled from '@emotion/styled'

const StyledTextInput = styled.div`
  width: 100%;
  display: flex;
  input {
    flex: 1 0 auto;
    font-size: 2rem;
    padding: 0.25rem;
    border: none;
    border-bottom: 1px solid grey;
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