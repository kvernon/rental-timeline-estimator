export interface INavListProps {
  title: string;
  navList: { title: string; isSelected?: boolean; isDisabled?: boolean }[];
  onClick: (title: string, navList: { title: string; isSelected?: boolean; isDisabled?: boolean }[]) => void;
}
export interface INavListGenericProps {
  title: string;
  navList: { title: string; path: string }[];
}
