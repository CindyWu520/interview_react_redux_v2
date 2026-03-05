export interface Item {
  guid: string;
  name: string;
  path: string[];
  properties: ItemProperties;
}

export interface ItemProperties {
  [key: string]: string | number | undefined;
}

export interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

export interface SelectedItemState {
  guid: string | null;
  properties: ItemProperties | null;
  activeTab: number;
  loading: boolean;
}