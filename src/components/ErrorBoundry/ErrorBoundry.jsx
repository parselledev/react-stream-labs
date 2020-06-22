import React, {Component} from 'react';
import ErrorIndicator from 'Components/ErrorIndicator/ErrorIndicator';

class ErrorBoundry extends Component {

  state = {
    hasError: false
  }

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  render() {
    return(
      this.state.hasError ? <ErrorIndicator /> : this.props.children
    );
  }

}

export default ErrorBoundry;