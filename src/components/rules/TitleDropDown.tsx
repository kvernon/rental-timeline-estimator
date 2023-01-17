import React from 'react';
import styled from '@emotion/styled';

const Select = styled.select`
  width: 100%;
  padding-left: 10px;
  border: 2px solid #56afcc;
  border-radius: 4px;
  color: #56afcc;
  border-color: #6ad8fd;
  height: 43px;

  &:focus {
    color: #9EE5FF;
    border-color: #9EE5FF;
  },

`;

export const TitleDropDown = function (props: { titles: string[]; defaultIndex?: number; id?: string }) {
  const [titleValue, setTitleValue] = React.useState((props.defaultIndex || 0).toString());

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setTitleValue(event.target.value);
    console.log(event.target.value);
  }

  const selectUuid = props.id || window.crypto.randomUUID();
  const id = `title-drop-down-${selectUuid}`;
  return (
    <Select id={id} onChange={handleChange} value={titleValue}>
      {props.titles.map((title: string, idx: number) => {
        return (
          <option value={idx.toString()} key={`${id}-${idx.toString()}`}>
            {title}
          </option>
        );
      })}
    </Select>
  );
};
