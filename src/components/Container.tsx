import * as React from "react";
import { getBreeds, getCategories, getCats } from "../utils/api";
import { Type } from "../App";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

export interface ContainerProps {
  type: Type;
}

export interface ContainerState {
  cats: Cat[];
  categoryID: any;
  breedID: any;
  menuItem: MenuInput[];
  page: number;
}

export interface Cat {
  id: string;
  url: string;
}

export interface MenuInput {
  value: string | number;
  text: string;
}

export default class Container extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);

    this.state = {
      cats: [],
      categoryID: null,
      breedID: null,
      menuItem: [],
      page: 1
    };
    this.loadCat = this.loadCat.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const menuItem: MenuInput[] = [];
    if (this.props.type === Type.Breed) {
      try {
        const result = await getBreeds();
        for (let i = 0; i < result.data.length; i += 1) {
          menuItem.push({ value: result.data[i].id, text: result.data[i].name });
        }
        this.setState({ menuItem, breedID: menuItem[0].value as string });
      } catch (error) {
        console.log(error);
      }
    } else if (this.props.type === Type.Category) {
      try {
        const result = await getCategories();
        const menuItem = [];
        for (let i = 0; i < result.data.length; i += 1) {
          menuItem.push({ value: result.data[i].id, text: result.data[i].name });
        }
        this.setState({ menuItem, categoryID: menuItem[0].value as number });
      } catch (error) {
        console.log(error);
      }
    }
    this.loadCat();
  }

  async loadCat() {
    const { page, breedID, categoryID } = this.state;
    try {
      const result = await getCats(page, breedID, categoryID);
      console.log(result);
      const cats = this.state.cats;

      for (let i = 0; i < result.data.length; i += 1) {
        cats.push({ id: result.data[i].id, url: result.data[i].url });
      }

      this.setState({ cats, page: page + 1 });
    } catch (error) {
      console.log(error);
    }
  }

  onChangeHandler(e: any) {
    if (this.props.type === Type.Category) {
      this.setState({ categoryID: e.target.value });
    } else if (this.props.type === Type.Breed) {
      this.setState({ breedID: e.target.value });
    }
  }

  render() {
    const { cats, categoryID, breedID, menuItem } = this.state;
    const { type } = this.props;
    const catElement = cats.map((cat, index) => {
      return <img className="Cat__Item" key={`${index}/${type}`} src={cat.url} />;
    });
    const menuElement = menuItem.map((item, index) => {
      return (
        <MenuItem key={`${index}/${type}`} value={item.value}>
          {item.text}
        </MenuItem>
      );
    });

    return (
      <div className="Container">
        <AppBar position="absolute" color="default">
          <Toolbar>
            {type === Type.Breed || type === Type.Category ? (
              <FormControl>
                <Select
                  value={type === Type.Breed ? breedID : categoryID}
                  onChange={this.onChangeHandler}
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}
                >
                  {menuElement}
                </Select>
              </FormControl>
            ) : null}
          </Toolbar>
        </AppBar>
        <div className="Cat">
          {catElement}
          <Button variant="contained" color="primary" onClick={this.loadCat}>
            More...
          </Button>
        </div>
      </div>
    );
  }
}
