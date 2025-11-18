import styled from '@emotion/styled';
import { Input } from './input';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { FontGroups } from '../../theming/fontGroups';

export const InputLocal = styled(Input)<{
  themeOptions: IThemeOptions;
  validationType: ValidatorTypes;
  fontGroup?: FontGroups;
  useTransparent: boolean;
}>`
  font-family: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.font};
  font-size: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.size};
  font-weight: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.weight};
  color: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.color};

  ${(coreTheme) =>
    !coreTheme.useTransparent &&
    `
     background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background}41;

     border: 3px solid ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background}41;
     transition: border-color 0.4s ease-out, background-color 0.4s ease-out;

     &:hover {
        border: 3px solid ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus};
        transition: border-color 0.4s ease-out, background-color 0.4s ease-out;
        background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
     }

     &:focus {
        border: 3px solid ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus};
        background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
     }
  `}

  ${(coreTheme) =>
    coreTheme.useTransparent &&
    `
     background-color: transparent;

     border-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background};
     transition: border-color 0.4s ease-out;

     &:hover {
        border-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus};
     }
   `}
`;
