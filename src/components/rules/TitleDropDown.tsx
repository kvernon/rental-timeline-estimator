import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

export const TitleDropDown = (props: { titles: string[]; defaultIndex?: number; id?: string }) => {
  const [titleValue, setTitleValue] = React.useState((props.defaultIndex || 0).toString());

  const handleChange = (event: SelectChangeEvent) => {
    setTitleValue(event.target.value);
  };

  const selectUuid = props.id || window.crypto.randomUUID();
  return (
    <Select id={`title-drop-down-${selectUuid}`} sx={{ width: '100%' }} value={titleValue} onChange={handleChange}>
      {props.titles.map((i, idx) => {
        return (
          <MenuItem value={idx.toString()} key={`${selectUuid}-${idx.toString()}`}>
            {i}
          </MenuItem>
        );
      })}
    </Select>
  );
};
