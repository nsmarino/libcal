import styled from '@emotion/styled'

const StyledTextArea = styled.div`
  width: 100%;
  display: flex;
  textarea {
    font-family: Arial;
    flex: 1 0 auto;
    height: 9rem;
    font-size: 2rem;
    padding: 0.25rem;
    border: none;
    border-bottom: 1px solid grey;
    resize: none;
  }
  
`


const TextAreaInput = ({name, label, register, errors}) => {
    return (
    <StyledTextArea>
        <textarea name={name} placeholder={label} ref={register({ required: true })} />
      {errors.description && <p>This field is required</p>}
    </StyledTextArea>
    )
  }
  
  export default TextAreaInput