import * as React from 'react';
import Map from './components/map/Map';

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
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
