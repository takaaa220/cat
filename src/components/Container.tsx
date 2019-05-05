import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import { getCats } from "../utils/api";

export interface ContainerProps {}

export interface ContainerState {
  cats: Cat[];
}

export interface Cat {
  id: string;
  url: string;
}

export default class Container extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);

    this.state = {
      cats: []
    };
    this.loadCat = this.loadCat.bind(this);
  }

  async loadCat() {
    try {
      const result = await getCats();
      const cats = this.state.cats;

      for (let i = 0; i < result.data.length; i += 1) {
        cats.push({ id: result.data[i].id, url: result.data[i].url });
      }

      this.setState({ cats });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { cats } = this.state;
    const catElement = cats.map(cat => {
      return <img key={cat.id} src={cat.url} />;
    });
    return (
      <InfiniteScroll pageStart={0} loadMore={this.loadCat} hasMore={false} loader={<div>Loading...</div>}>
        <div>{catElement}</div>
      </InfiniteScroll>
    );
  }
}
