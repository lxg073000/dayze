import { connect } from 'react-redux';
import { fetchUserEvents } from '../../actions/event_actions';
import Events from './events';

const mapStateToProps = (state) => {
    return {
        events: Object.values(state.events.all),
        currentUser: state.session.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserEvents: (user) => dispatch(fetchUserEvents(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events);