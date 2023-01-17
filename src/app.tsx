import React from 'react';
import { TitleDropDown } from './components/rules/TitleDropDown';

export const App = function () {
  return (
    <div>
      <h1>Hi</h1>
      <TitleDropDown titles={['Hello']} />
    </div>
  );
};
