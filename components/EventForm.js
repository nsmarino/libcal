const EventForm = ({ handleSubmit }) => {
    return (
        <div>
            <h2>Add an event</h2>
            <form onSubmit={handleSubmit} style={{width: '10em', display: 'flex', flexDirection: 'column'}}>
                Name of event <input type="text"/>
                Description <input type="textarea"/>
                Date <input type="date"/>
                Time <input type="time"/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default EventForm