import React, { Component } from "react";

export default class event_showcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {
        0: {
          id: 0,
          title: "Go to the Store",
          description: "you need milk and eggs",
          date: "Thu Apr 01 2021",
        },
        1: {
          id: 1,
          title: "Check interview DB",
          description: "I'm not sure if there are updates",
          date: "Fri Apr 02 2021",
        },
        2: {
          id: 2,
          title: "Work on MERN project",
          description: "A few more things to clean up",
          date: "Fri Apr 02 2021",
        },
        3: {
          id: 3,
          title: "Call Mom",
          description: "Her birthday's coming up!",
          date: "Sat Apr 03 2021",
        },

        4: {
          id: 4,
          title: "Exercise",
          description: "No pain no gain",
          date: "Sun Apr 04 2021",
        },

        5: {
          id: 5,
          title: "Go to the Store",
          description: "you need milk and eggs",
          date: "Thu Apr 01 2021",
        },

        6: {
          id: 6,
          title: "Check interview DB",
          description: "I'm not sure if there are updates",
          date: "Fri Apr 02 2021",
        },
        7: {
          id: 7,
          title: "Work on MERN project",
          description: "A few more things to clean up",
          date: "Fri Apr 02 2021",
        },
        8: {
          id: 8,
          title: "Call Mom",
          description: "Her birthday's coming up!",
          date: "Sat Apr 03 2021",
        },
        9: {
          id: 9,
          title: "Exercise",
          description: "No pain no gain",
          date: "Sun Apr 04 2021",
        },
      },
    };
  }

  seedEvents() {
    return Object.values(this.state.events).map((event, idx) => (
      <ul key={idx} className="event-card">
        <li key={event.id}>{`${event.title}`}</li>
        <li key={event.id + 1}>{`${event.description}`}</li>
        <li key={event.id + 2}>{`${event.date}`}</li>
        <div className="linebreak"></div>
      </ul>
    ));
  }

  // componentDidMount(){
  //   this.fetchEvents()
  // }

  render() {
    return (
      <div className="widget-box-narrow">
        <div className="event-list-grid"></div>
        {this.seedEvents()}
      </div>
    );
  }
}
