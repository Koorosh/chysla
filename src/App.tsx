import * as React from 'react';
import Dashboard from './containers/Dashboard'

class App extends React.Component {
  public render() {
    const wrapperStyles = {
      fontFamily: "Roboto, sans-serif",
      width: "100%",
      maxWidth: 980,
      margin: "0 auto",
    }

    return (
      <div className="App">
        <div style={wrapperStyles}>
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
