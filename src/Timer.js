import React from 'react';
// import PropTypes from 'prop-types';

class Timer extends React.Component {

  constructor(props){
    super();
    this.state = {
      timer: {
        minutes: '0',
        seconds: '00'
      }
    }
  }

  componentDidMount() {
    this.myInterval();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  myInterval = () => {
    setInterval(this.incrementTimer, 1000);
  }

  incrementTimer = () => {
    let min = this.state.timer.minutes;
    let sec = this.state.timer.seconds;
  	sec++;
    if(sec >= 60){
    	sec = 0;
      min++;
    }
    this.setState({
      timer: {
        minutes: min,
        seconds: sec <= 9 ? '0'+sec : sec
      }
    });
  }

  render() {
    return (
      <span>
        <span>Time: </span>
        {this.state.timer.minutes + ':' + this.state.timer.seconds}
      </span>
    )
  }

}

// Timer.propTypes = {
// }

export default Timer;
