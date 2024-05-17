import { alpha, createTheme } from '@mui/material/styles';

// A custom theme for this app
const themePalette = createTheme({
    palette: {
    mode: 'dark',
    primary: {
      main: '#30a9d5',
    },

    error: {
      main: '#B00020',
    },
    background: {
      default: "#434250",
      paper: "#33333d",

    },
    
  },
});

const theme = createTheme(themePalette,{
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `none`,
          boxShadow: 'none',
          backgroundImage: `linear-gradient(180deg, ${alpha(themePalette.palette.primary.main, 0.2)}, ${alpha(themePalette.palette.primary.main, 0)})`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: `${themePalette.palette.background.default}`,
          boxShadow: 'none',
          backgroundImage: `linear-gradient(0deg, ${alpha(themePalette.palette.primary.main, 0.05)}, ${alpha(themePalette.palette.primary.main, 0.05)}, ${alpha(themePalette.palette.primary.main, 0.05)}, ${alpha(themePalette.palette.primary.main, 0.05)}, ${alpha(themePalette.palette.primary.main, 0.05)}, ${alpha(themePalette.palette.primary.main, 0)})`,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          transition: 'none',
        },
      },
    }
  },
})

export default theme;
