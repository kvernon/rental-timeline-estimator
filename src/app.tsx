import { Box, Typography } from '@mui/material';
import React from 'react';
import { TitleDropDown } from './components/rules/TitleDropDown';

export const App = () => (
  <Box sx={{ backgroundColor: 'primary.dark' }}>
    <Typography>Hi</Typography>
    <TitleDropDown titles={['Hello']} />
  </Box>
);
