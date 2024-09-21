import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';
import React from 'react';

const StyledButton = styled.button<{
  theme: IThemeOptions;
  disabled?: boolean;
}>`
  padding-top: 10px;
  padding-left: 3px;
  padding-right: 3px;
  height: 70px;
  width: 100%;
  font-family: ${(props) => props.theme.typography.get(FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.theme.typography.get(FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.theme.typography.get(FontGroups.input)?.weight};
  background-color: ${(props) => (props.disabled ? `${props.theme.palette.validation.Invalid.background}81` : props.theme.palette.inputBackground)};
  border-radius: 0.3rem;
  border-width: 0;
  border-bottom: 5px solid #021c26;
  box-shadow: 0 10px 1px #05465e;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.4s ease-out;

  &:hover:enabled {
    background-color: ${(props) => props.theme.palette.inputBackgroundFocus};
  }
`;

export interface IAddListButtonProps {
  role: string;
  label: string;
  theme: IThemeOptions;
  isDisabled?: boolean;
  onClick: () => void;
}

export function AddListButton(p: IAddListButtonProps) {
  return (
    <StyledButton type="button" role="button" aria-label={p.role} onClick={p.onClick} disabled={p.isDisabled} theme={p.theme} title={p.label}>
      {p.label}
    </StyledButton>
  );
}
