import React from 'react';

import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { FontGroups } from '../../theming/fontGroups';

const StreetSign = styled(Stack)<{
  themeOptions: IThemeOptions;
}>`
  width: fit-content;
  font-family: ${(props) => props.themeOptions.typography.get(FontGroups.street)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(FontGroups.street)?.size};
  font-weight: ${(props) => props.themeOptions.typography.get(FontGroups.street)?.weight};
  line-height: ${(props) => props.themeOptions.typography.get(FontGroups.street)?.lineHeight};
  background: ${(props) => props.themeOptions.palette.streetBackground};
  border: ${(props) => props.themeOptions.palette.streetBorder};
  border-radius: ${(props) => props.themeOptions.palette.streetBorderRadius};
  white-space: nowrap;
  min-width: auto;
  padding-left: 10px;
  padding-right: 15px;
  margin-top: 0;
`;

interface IStreetProps {
  address?: string;
}

export function Street({ address }: IStreetProps): React.ReactNode {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <Stack style={{ padding: '8px', width: 'unset' }}>
      <StreetSign themeOptions={coreTheme}>{address}</StreetSign>
    </Stack>
  );
}
