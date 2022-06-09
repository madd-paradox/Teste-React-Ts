export interface IConfigCarrosselProps {
  items: Item[];
}

export interface Item {
  title: string;
  img: string;
  link: string;
  order: number;
}
