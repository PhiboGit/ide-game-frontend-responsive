import { alpha, createTheme } from '@mui/material/styles';


// Augment the palette to include an rarity color
declare module '@mui/material/styles' {
  interface Palette {
    noneRarity: Palette['primary'];
    commonRarity: Palette['primary'];
    uncommonRarity: Palette['primary'];
    rareRarity: Palette['primary'];
    epicRarity: Palette['primary'];
    legendaryRarity: Palette['primary'];
  }

  interface PaletteOptions {
    noneRarity?: PaletteOptions['primary'];
    commonRarity?: PaletteOptions['primary'];
    uncommonRarity?: PaletteOptions['primary'];
    rareRarity?: PaletteOptions['primary'];
    epicRarity?: PaletteOptions['primary'];
    legendaryRarity?: PaletteOptions['primary'];
  }
}

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

    noneRarity: {
      main: "#f2f2f2",
    },
    commonRarity: {
      main: "#b0b0b0",
    },
    uncommonRarity: {
      main: "#4caf50",
    },
    rareRarity: {
      main: "#2196f3",
    },
    epicRarity: {
      main: "#a335ee",
    },
    legendaryRarity: {
      main: "#ff9800",
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
