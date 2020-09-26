import styled from '@emotion/styled'

const StyledTextArea = styled.div`
display: flex;
justify-content: center;
margin-top: 1rem;
margin-bottom: 1rem;
textarea {
    font-family: Georgia;
    max-width: 80%;
    flex: 1 0 auto;
    height: 9rem;
    font-size: 1.5rem;
    padding: 0.25rem;
    border: 1px solid grey;
    resize: none;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
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