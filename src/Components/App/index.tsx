import React from "react";
import "office-ui-fabric-react/dist/css/fabric.css";
import "./App.css";
import { Item } from "../../props";
import { ItemsFill } from "../../data";
import { Carrossel } from "../Carrossel";
import { ConfigCarrossel } from "../ConfigCarrossel";
import { Pivot, PivotItem, Text } from "@fluentui/react";

export class App extends React.Component<
  {},
  { items: Item[]; pageKey: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: ItemsFill,
      pageKey: "home",
    };
  }

  setItems = (items: Item[]) => this.setState({ items });
  changePage = (pageKey: string) => this.setState({ pageKey });

  render() {
    var items = this.state.items;

    return (
      <>
        {/* Header */}
        <Text className="header">Teste Técnico React.</Text>
        {/* Content */}
        <Pivot
          selectedKey={this.state.pageKey}
          onLinkClick={(e) => this.changePage(e?.props.itemKey || "")}
        >
          <PivotItem headerText="Carrossel" alwaysRender={true} itemKey="home">
            <Carrossel items={items} />
          </PivotItem>
          <PivotItem
            headerText="Configurações"
            alwaysRender={true}
            itemKey="config"
          >
            <ConfigCarrossel
              items={items}
              setItems={this.setItems}
              changePage={this.changePage}
            />
          </PivotItem>
        </Pivot>
      </>
    );
  }
}
