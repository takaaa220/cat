import * as React from "react";
import * as ReactDOM from "react-dom";
import Container from "./components/Container";

export interface AppProps {}

export interface AppState {}

export enum Type {
  None,
  Breed,
  Category
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="Containers">
          <Container type={Type.None} />
          <Container type={Type.Breed} />
          <Container type={Type.Category} />
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
