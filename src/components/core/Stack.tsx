import styled from '@emotion/styled';

export interface IStackProps {
  paddingBottom?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginTop?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  /**
   * default is column
   */
  direction?: 'column' | 'row';
  spacing?: number;
  flexGrow?: number;
  onClick?: () => void;
  /**
   * if true, it will render a border around the Stack with the values "1px solid red"
   */
  borderDebug?: boolean;
}

/**
 * flexDirection will default to column, and width will default to 100%
 */
export const Stack = styled.div((props: IStackProps) => {
  const output = {
    display: 'flex',
    width: '100%',
    flexDirection: props.direction ?? 'column',
    flexGrow: props.flexGrow,
    flex: props.spacing,
    paddingBottom: props.paddingBottom ?? '0',
    marginBottom: props.marginBottom ?? '0',
    marginTop: props.marginTop ?? '0',
    marginLeft: props.marginLeft ?? '0',
    paddingTop: props.paddingTop ?? '0',
    paddingLeft: props.paddingLeft ?? '0',
    paddingRight: props.paddingRight ?? '0',
    border: '1px solid red',
  };

  if (!props.borderDebug) {
    output.border = 'none';
  }

  return output;
});
