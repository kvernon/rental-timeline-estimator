export interface INavListProps {
  title: string;
  navList: { title: string; isSelected?: boolean; isDisabled?: boolean }[];
  onClick: (title: string, navList: { title: string; isSelected?: boolean; isDisabled?: boolean }[]) => void;
}
