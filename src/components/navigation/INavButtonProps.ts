export interface INavButtonProps {
  title: string;
  disabled?: boolean;
  onClick: (title: string) => void;
  selected?: boolean;
}
