import { Typography } from '@mui/material'
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CraftingSection from './CraftingSection';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function RefiningSection() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}
          sx={{
            minHeight: '32px',
            "& button": {
              minHeight: '32px',
              padding: '8px 16px',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              color: 'text.primary'
            }, 
            "& button.Mui-selected": {backgroundColor: 'primary.main', color: 'text.primary'},
            "& button:hover": {backgroundColor: 'divider', color: 'text.primary'},
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: 'transparent',
            }
          }}
          >
          <Tab label="Smelting" {...a11yProps(0)} />
          <Tab label="Woodworking" {...a11yProps(1)} />
          <Tab label="Weaving" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CraftingSection professionId='smelting'/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CraftingSection professionId='woodworking'/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CraftingSection professionId='weaving'/>
      </CustomTabPanel>
    </Box>
  )
}