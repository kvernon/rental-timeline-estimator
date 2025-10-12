import styled from '@emotion/styled';

export interface IStackProps {
  paddingBottom?: string;
  marginBottom?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  direction?: 'column' | 'row';
  spacing?: number;
  flexGrow?: number;
}

export const Stack = styled.div((props: IStackProps) => ({
  display: 'flex',
  width: '100%',
  flexDirection: props.direction ?? 'column',
  flexGrow: props.flexGrow,
  flex: props.spacing,
  paddingBottom: props.paddingBottom ?? '0',
  marginBottom: props.marginBottom ?? '0',
  paddingTop: props.paddingTop ?? '0',
  paddingLeft: props.paddingLeft ?? '0',
  paddingRight: props.paddingRight ?? '0',
}));

export const StackMarginRight = styled(Stack)<IStackProps>`
  margin-right: 10px;
  width: unset;
`;
