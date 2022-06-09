import React from "react";
import "office-ui-fabric-react/dist/css/fabric.css";
import "./App.css";
import { Pivot, PivotItem, Text } from "@fluentui/react";
import { ConfigCarrossel } from "../ConfigCarrossel";
import { Item } from "../ConfigCarrossel/props";

const itemsFill = [
  {
    key: 0,
    title: "Teste 2",
    img: "/img",
    link: "#link",
    order: 2,
  },
  {
    key: 1,
    title: "Teste 1",
    img: "/img",
    link: "#link",
    order: 1,
  },
  {
    key: 2,
    title: "Teste 3",
    img: "/img",
    link: "#link",
    order: 3,
  },
];

export class App extends React.Component<
  {},
  { items: Item[]; pageKey: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: itemsFill,
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
          className="pivot"
          selectedKey={this.state.pageKey}
          onLinkClick={(e) => this.changePage(e?.props.itemKey || "")}
        >
          <PivotItem headerText="Carrossel" alwaysRender={true} itemKey="home">
            {items.map((item) => {
              return (
                <>
                  <Text key={item.key}>
                    {item.title} - {item.img} - {item.link} - {item.order}
                  </Text>
                  <br />
                </>
              );
            })}
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
