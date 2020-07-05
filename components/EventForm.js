const EventForm = ({ name, description, date, time, handleSubmit }) => {
    return (
        <div>
            <h2>Add an event</h2>
            <form onSubmit={handleSubmit} style={{width: '10em', display: 'flex', flexDirection: 'column'}}>
                Name of event <input {...name.inputProps} />
                Description <input {...description.inputProps}/>
                Date <input {...date.inputProps} />
                Time <input {...time.inputProps} />
                <button>submit</button>
            </form>
        </div>
    )
}

export default EventForm