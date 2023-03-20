import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TitleDropDownValidator } from './components/validators/TitleDropDownValidator';
import { ValidatorStackTypes } from './components/validators/ValidatorStackTypes';
import { options } from './theme';

export const App = function () {
  const methods = useForm({});
  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={options}>
        <h1>Hi</h1>
        <TitleDropDownValidator titles={['Hello']} validationType={ValidatorStackTypes.Optional} />
      </ThemeProvider>
    </FormProvider>
  );
};
