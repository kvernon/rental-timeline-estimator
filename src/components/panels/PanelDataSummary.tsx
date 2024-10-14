import React, { ReactNode } from 'react';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { Header6 } from '../core/Header6';
import { Header5 } from '../core/Header5';

const TitleNode = styled(Header6)`
  text-align: right;
  margin: 2px;
  padding-right: 20px;
`;

const DataNode = styled(Header5)`
  text-align: right;
  margin: 2px;
  padding-right: 20px;
`;

const BackGroundNode = styled(Stack)`
  background-color: #4f41b9;
  padding-left: 0;
`;

export function PanelDataSummary(props: { title: string; data: string }): ReactNode {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <BackGroundNode theme={coreTheme} direction="column">
      <Stack theme={coreTheme} direction="column" paddingTop="18px" paddingBottom="18px" paddingLeft="0">
        <TitleNode theme={coreTheme}>{props.title}</TitleNode>
        <DataNode theme={coreTheme}>{props.data}</DataNode>
      </Stack>
    </BackGroundNode>
  );
}
