import React from 'react';

class EventBox extends React.Component {
    render() {
        return (
            <div>
                <span>{this.props.title}</span>
                <span>{this.props.description}</span>
                <span>{this.props.date,toString()}</span>
            </div>
        )
    }
}

export default EventBox;