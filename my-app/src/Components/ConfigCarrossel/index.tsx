import {
  CommandBarButton,
  DetailsList,
  FontIcon,
  IColumn,
  IIconProps,
  MarqueeSelection,
  Selection,
} from "@fluentui/react";
import "./ConfigCarrossel.css";
import { IConfigCarrosselProps } from "./props";

export const ConfigCarrossel = (prop: IConfigCarrosselProps) => {
  const addIcon: IIconProps = { iconName: "Add" };
  const editIcon: IIconProps = { iconName: "Edit" };
  const deleteIcon: IIconProps = { iconName: "Delete" };

  let selection = new Selection({
    onSelectionChanged: () => console.log("mudar quando um item é selecionado"),
  });
  const columns: IColumn[] = [
    {
      key: "c1",
      name: "Ordem",
      fieldName: "order",
      minWidth: 60,
      maxWidth: 60,
    },
    {
      key: "c2",
      name: "Título",
      fieldName: "title",
      minWidth: 200,
      maxWidth: 400,
    },
    {
      key: "c3",
      name: "Imagem",
      fieldName: "img",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "c4",
      name: "Link",
      fieldName: "link",
      minWidth: 200,
      maxWidth: 400,
    },
  ];

  return (
    <>
      <div className="header-list">
        <CommandBarButton text="Excluir item" iconProps={deleteIcon} />
        <CommandBarButton text="Editar item" iconProps={editIcon} />
        <CommandBarButton text="Adicionar item" iconProps={addIcon} />
      </div>
      <MarqueeSelection selection={selection}>
        <DetailsList
          items={prop.items}
          columns={columns}
          selection={selection}
        />
      </MarqueeSelection>
    </>
  );
};
