import * as React from "react";
import * as ReactDOM from "react-dom";
import Container from "./components/Container";

export interface AppProps {}

export interface AppState {
  isShow: boolean;
}

export enum Type {
  None,
  Breed,
  Category
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isShow: window.matchMedia("(min-width: 700px)").matches
    };
  }

  render() {
    return (
      <div className="App">
        <div className="Containers">
          {this.state.isShow ? <Container type={Type.None} /> : null}
          <Container type={Type.Breed} />
          <Container type={Type.Category} />
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
