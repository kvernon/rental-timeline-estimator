import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IThemeOptions } from '../../theme';

export const TitleDropDown = function (props: { titles: string[]; defaultIndex?: number; id?: string }) {
  const coreTheme = useTheme() as IThemeOptions;

  const Select = styled.select<{ theme: IThemeOptions }>`
    appearance: none;
    width: 100%;
    padding-left: 10px;
    border: 2px solid ${(props) => props.theme.palette.panelBackground};
    border-radius: 0.5rem;
    color: #56afcc;
    border-color: ${(props) => props.theme.palette.inputBackground};
    height: 43px;
    background: transparent;
    &:focus {
      color: ${(props) => props.theme.palette.inputBackgroundFocus};
      border-color: ${(props) => props.theme.palette.inputBackgroundFocus};
    }
    &:hover {
      color: ${(props) => props.theme.palette.inputBackgroundFocus};
      border-color: ${(props) => props.theme.palette.inputBackgroundFocus};
    }
  `;

  const Option = styled.option`
    color: black;
    background: gray();
  `;

  const [titleValue, setTitleValue] = React.useState((props.defaultIndex || 0).toString());

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setTitleValue(event.target.value);
  }

  const selectUuid = props.id || window.crypto.randomUUID();
  const id = `title-drop-down-${selectUuid}`;
  return (
    <Select id={id} onChange={handleChange} value={titleValue} theme={coreTheme}>
      {props.titles.map((title: string, idx: number) => {
        return (
          <Option value={idx.toString()} key={`${id}-${idx.toString()}`}>
            {title}
          </Option>
        );
      })}
    </Select>
  );
};
