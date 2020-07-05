
const Registration = ({ firstName, lastName, address, phone, email, libraryCard, event, handleSubmit }) => {

   return (
        <div>
            <h2>Register for {event.name}</h2>
            <form onSubmit={handleSubmit}>
              <p>First Name 
                <input {...firstName.inputProps} />
              </p>
              <p>
              Last Name <input {...lastName.inputProps} />
              </p>
              <p>
              Address <input {...address.inputProps} />
              </p>
              <p>
              Phone <input {...phone.inputProps} />
              </p>
              <p>
              Email <input {...email.inputProps} />
              </p>
              <p>
              Library Card # <input {...libraryCard.inputProps} />
              </p>
                <button>submit</button>
                <button>cancel</button>
            </form>
        </div>
    )
}

export default Registration