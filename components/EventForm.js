const EventForm = () => {
    return (
        <div>
            <h2>Add an event</h2>
            <form>
                Name of event <input type="text"/>
                Day <input type="date"/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default EventForm