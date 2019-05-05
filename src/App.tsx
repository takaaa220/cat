import * as React from "react";
import * as ReactDOM from "react-dom";
import Container from "./components/Container";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
