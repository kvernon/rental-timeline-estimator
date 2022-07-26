import { ThemeOptions } from '@mui/material';
import { pink } from '@mui/material/colors';

export const options: ThemeOptions = {
  palette: {
    primary: {
      main: '#0a0a0a',
      light: 'pink',
      dark: '#262040',
    },
    secondary: pink,
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    },
    fontSize: 14,
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiStack: {
      defaultProps: {
        padding: '2px',
      },
    },
  },
};
