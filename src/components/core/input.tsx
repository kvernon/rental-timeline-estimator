import styled from '@emotion/styled';

export interface IInputProps {
  hasSpinner?: boolean;
  useUnderlineOnly?: boolean;
}

export const Input = styled.input<IInputProps>`
  padding: 0;
  flex-grow: 1;
  text-align: right;
  width: 100%;
  height: 59px;
  border-radius: 0.3rem;

  ${(props) =>
    props.useUnderlineOnly === true &&
    `
    transition: border-color 0.4s ease-out;
    border-color: white;
    border-width: 0px 0px 5px 0;
  `}

  ${(props) =>
    props.useUnderlineOnly === false &&
    `
      transition: background-color 0.4s ease-out;
      border-width: 3px;
  `}

  ${(props) =>
    props.hasSpinner === false &&
    `
    &[type=number]::-webkit-inner-spin-button,
    &[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `}
`;
