import React from 'react';
import { withRouter } from 'react-router-dom';
import EventBox from './event_box';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentWillMount() {
        this.props.fetchEvents();
    }

    componentWillReceiveProps(newState) {
        this.setState({ events: newState.events })
    }

    render() {
        return (
            <div>
                <h2>Upcoming Events</h2>
                {this.state.events.map(evnt => (
                    <EventBox key={evnt.id} title={evnt.title} description={evnt.description} date={evnt.date}/> 
                ))}
            </div>
        )
    }
}

export default withRouter(Event);