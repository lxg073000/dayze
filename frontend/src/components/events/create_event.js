import React from 'react';


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: "",
            description: "",
            date: "",
            time:"",
            newEvent:"",
        }  
        this.handleSubmit = this.handleSubmit.bind(this);       
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ newEvent: nextProps.newEvent })
    }

    composeDate(date, time){
        return new Date(date + " " + time)
    }

    handleSubmit(e) {
        e.preventDefault();
        let event = {
            title: this.state.title,
            description: this.state.description,
            date: this.composeDate(this.state.date, this.state.time),
        };

        this.props.createEvent(event);
        this.setState ({
            title: "",
            description: "",
            date: "",
            time:"",
        })
    }

    update() {
        return e => this.setState({
            title: e.currentTarget.value,
            description: e.currentTarget.value,
            date: e.currentTarget.value,
            time: e.currentTarget.value,
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input type="text"
                        value={this.state.title}
                        onChange={this.update()}
                        placeholder="Event title"/>
                    <label>Description</label>
                    <input type="textarea"
                        value={this.state.description}
                        onChange={this.update()}
                        placeholder="Event description"/>
                    <label>Date</label>
                    <input type="date"
                        value={this.state.date}
                        onChange={this.update()}
                        placeholder="Event date"/>
                    <label>Time</label>
                    <input type="time"
                        value={this.state.time}
                        onChange={this.update()}
                        placeholder="Event time"/>
                    <input type="submit" value="Create Event" />
                </form>
            </div>
        )
    }
}