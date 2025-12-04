import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const getFormData = (state: RootState) => state.form;

export const getRulesConfig = createSelector([getFormData], (formData) => formData.rulesConfig);
