import { Item } from "./props";

export interface IConfigCarrosselState {
    formItem: Item;
    panelOpen: boolean;
    dialogOpen: boolean;
    disableAdd: boolean;
    disableEdit: boolean;
    disableDelete: boolean;
}