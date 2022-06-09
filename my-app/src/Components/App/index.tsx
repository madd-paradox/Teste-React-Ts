import React, { useState } from "react";
import { Pivot, PivotItem, Text } from "@fluentui/react";
import "./App.css";
import { ConfigCarrossel } from "../ConfigCarrossel";
import { Item } from "../ConfigCarrossel/props";

export const App: React.FunctionComponent = () => {
  const [items, setItems] = useState<Item[]>([
    {
      title: 'Teste 2',
      img: '/img',
      link: '#link',
      order: 2,
    },
    {
      title: 'Teste 1',
      img: '/img',
      link: '#link',
      order: 1,
    },
    {
      title: 'Teste 3',
      img: '/img',
      link: '#link',
      order: 2,
    }
  ]);

  return (
    <>
      {/* Header */}
      <Text className="header">Teste Técnico React.</Text>
      {/* Content */}
      <Pivot className="pivot">
        <PivotItem headerText="Carrossel">
          <Text></Text>
        </PivotItem>
        <PivotItem headerText="Configurações">
          <ConfigCarrossel items={items} />
        </PivotItem>
      </Pivot>
    </>
  );
};
