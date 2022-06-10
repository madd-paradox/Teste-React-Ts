import React from "react";
import { IConfigCarrosselProps } from "./props";
import { IConfigCarrosselState } from "./state";
import { Item } from "../../props";
import {
  CommandBarButton,
  DefaultButton,
  DetailsList,
  Dialog,
  DialogFooter,
  DialogType,
  IColumn,
  IIconProps,
  initializeIcons,
  IStackStyles,
  Panel,
  PrimaryButton,
  Selection,
  Stack,
  TextField,
} from "@fluentui/react";

const addIcon: IIconProps = { iconName: "Add" };
const editIcon: IIconProps = { iconName: "Edit" };
const deleteIcon: IIconProps = {
  iconName: "Delete",
  styles: { root: { color: "#d13438 !important" } },
};
const stackStyles: Partial<IStackStyles> = { root: { height: 44 } };
const textFieldStyles = { root: { marginBottom: 8 } };
const buttonStyles = { root: { marginRight: 8 } };

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
const itemClear: Item = {
  title: "",
  img: "",
  link: "",
  order: 0,
};
export class ConfigCarrossel extends React.Component<
  IConfigCarrosselProps,
  IConfigCarrosselState
> {
  private _selection: Selection;

  constructor(props: any) {
    super(props);
    initializeIcons();
    this.state = {
      formItem: itemClear,
      panelOpen: false,
      dialogOpen: false,
      disableAdd: false,
      disableEdit: true,
      disableDelete: true,
    };
    this._selection = new Selection({
      onSelectionChanged: () => this.selectionFunction(),
    });
  }

  selectionFunction = () => {
    switch (this._selection.getSelectedCount()) {
      case 0:
        this.setState({
          disableAdd: false,
          disableEdit: true,
          disableDelete: true,
        });
        break;
      case 1:
        let itemSelected = this._selection.getSelection()[0] as Item;
        let index = this.props.items.indexOf(itemSelected);
        this.setState({
          formItem: this.props.items[index],
          disableAdd: true,
          disableEdit: false,
          disableDelete: false,
        });
        break;
      default:
        this.setState({
          disableAdd: true,
          disableEdit: true,
          disableDelete: false,
        });
        break;
    }
  };

  openPanel = () => this.setState({ panelOpen: true });
  dismissPanel = () => this.setState({ panelOpen: false });
  toggleHideDialog = () => this.setState(prevState => ({ dialogOpen: !prevState.dialogOpen }));

  setItem = () => {
    let listItems = this.props.items;

    if (this._selection.getSelectedCount() === 0) {
      // adicionando um item
      listItems.push(this.state.formItem);
    } else {
      // editando um item
      let index = listItems.indexOf(this._selection.getSelection()[0] as Item);
      listItems[index] = this.state.formItem;
    }

    this.props.setItems(listItems);
    this.dismissPanel();
    this.props.changePage('home');
  };

  deleteItem = () => {
    let listItems = this.props.items;
    if (this._selection.getSelectedCount() === 0) {
      // deletar um item
      let index = listItems.indexOf(this.state.formItem);
      listItems.splice(index, 1);
    } else {
      // deletar varios items
      let itemsSelected = this._selection.getSelection() as Item[];
      itemsSelected.map((item) => listItems.splice(listItems.indexOf(item), 1));
    }
    this.props.setItems(listItems);
    this.toggleHideDialog();
    this.props.changePage('home');
  };

  handleChangeText = (e: any) => {
    let change: Item = this.state.formItem;
    switch (e.target.name) {
      case "title":
        change = {
          ...change,
          title: e.target.value,
        };
        break;
      case "img":
        change = {
          ...change,
          img: e.target.value,
        };
        break;
      case "link":
        change = {
          ...change,
          link: e.target.value,
        };
        break;
      default:
        break;
    }
    this.setState({ formItem: change });
  };

  onChangeFieldOrder = (_e: any, newValue?: string) => {
    if (!newValue || newValue.length <= 3) {
      this.setState((prevState) => ({
        formItem: {
          ...prevState.formItem,
          order: parseInt(newValue || "0"),
        },
      }));
    }
  };

  onRenderFooterContent = () => (
    <>
      <PrimaryButton onClick={this.setItem} styles={buttonStyles}>
        Salvar
      </PrimaryButton>
      <DefaultButton onClick={this.dismissPanel}>Cancelar</DefaultButton>
    </>
  );

  render() {
    var { title, img, link, order } = this.state.formItem;
    return (
      <>
        <Stack horizontal horizontalAlign="end" styles={stackStyles}>
          {!this.state.disableDelete && (
            <CommandBarButton
              text="Excluir item"
              iconProps={deleteIcon}
              styles={buttonStyles}
              onClick={this.toggleHideDialog}
            />
          )}
          {!this.state.disableEdit && (
            <CommandBarButton
              text="Editar item"
              iconProps={editIcon}
              styles={buttonStyles}
              onClick={this.openPanel}
            />
          )}
          {!this.state.disableAdd && (
            <CommandBarButton
              text="Adicionar item"
              iconProps={addIcon}
              styles={buttonStyles}
              onClick={() =>
                this.setState({ formItem: itemClear }, this.openPanel)
              }
            />
          )}
        </Stack>
        <DetailsList
          items={this.props.items}
          columns={columns}
          selection={this._selection}
        />
        <Panel
          headerText={`${
            this._selection.getSelectedCount() === 0 ? "Adicionar " : "Editar"
          } item`}
          isOpen={this.state.panelOpen}
          onDismiss={this.dismissPanel}
          closeButtonAriaLabel="Close"
          onRenderFooterContent={this.onRenderFooterContent}
          isFooterAtBottom={true}
        >
          <TextField
            label="Título"
            placeholder="Digite o título aqui"
            name="title"
            value={title}
            onChange={this.handleChangeText}
            styles={textFieldStyles}
          />
          <TextField
            label="Imagem"
            placeholder="Insira o link da imagem aqui"
            name="img"
            value={img}
            onChange={this.handleChangeText}
            styles={textFieldStyles}
          />
          <TextField
            label="Link"
            placeholder="Insira um link aqui"
            name="link"
            value={link}
            onChange={this.handleChangeText}
            styles={textFieldStyles}
          />
          <TextField
            label="Ordem"
            placeholder="Digite a ordem do item aqui"
            name="order"
            value={order.toString()}
            onChange={this.onChangeFieldOrder}
            type="number"
            styles={textFieldStyles}
          />
        </Panel>
        <Dialog
          hidden={!this.state.dialogOpen}
          onDismiss={this.toggleHideDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Excluir item',
            closeButtonAriaLabel: 'Close',
            subText: 'Tem certeza dessa ação?',
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this.deleteItem} text="Sim" />
            <DefaultButton onClick={this.toggleHideDialog} text="Não" />
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}
