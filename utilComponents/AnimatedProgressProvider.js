import React from 'react';
import { Animate } from 'react-move';

const valueStart = 0;

class AnimatedProgressProvider extends React.Component {
  interval = undefined;

  state = {
    isAnimated: false,
  };

  componentDidMount() {
    if (this.props.repeat) {
      this.interval = window.setInterval(() => {
        this.setState({
          // eslint-disable-next-line react/no-access-state-in-setstate
          isAnimated: !this.state.isAnimated,
        });
      }, this.props.duration * 1000);
    } else {
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        isAnimated: !this.state.isAnimated,
      });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <Animate
        start={() => ({
          value: valueStart,
        })}
        update={() => ({
          timing: {
            duration: this.props.duration * 1000,
            ease: this.props.easingFunction,
          },
          value: [
            this.state.isAnimated ? this.props.valueEnd : this.props.valueStart,
          ],
        })}
      >
        {({ value }) => this.props.children(value)}
      </Animate>
    );
  }
}

export default AnimatedProgressProvider;
