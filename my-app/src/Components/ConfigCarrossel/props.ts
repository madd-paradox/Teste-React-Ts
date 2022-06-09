export interface IConfigCarrosselProps {
  items: Item[];
  setItems: any;
  changePage: any;
}

export interface Item {
  key: number;
  title: string;
  img: string;
  link: string;
  order: number;
}
