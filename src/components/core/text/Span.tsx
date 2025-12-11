import styled from '@emotion/styled';

export interface ISpanProps {
  paddingBottom?: string;
  marginBottom?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  direction?: 'column' | 'row';
  spacing?: number;
  flexGrow?: number;
}

export const Span = styled.span((props: ISpanProps) => ({
  display: 'flex',
  width: '100%',
  flexDirection: props.direction ?? 'column',
  flexGrow: props.flexGrow,
  flex: props.spacing,
  paddingBottom: props.paddingBottom ?? '0',
  marginBottom: props.marginBottom ?? '0',
  paddingTop: props.paddingTop ?? '0',
  paddingLeft: props.paddingLeft ?? '2px',
  paddingRight: props.paddingRight ?? '0',
}));
