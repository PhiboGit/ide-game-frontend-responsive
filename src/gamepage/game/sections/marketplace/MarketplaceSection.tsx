import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import InventorySection from "../character/inventory/InventorySection";
import ResourceMarketplace from "./resourcesMarketplace/ResourceMarketplace";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      display={value === index ? 'flex' : 'none'}
      overflow= 'hidden'
      flex={1}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box display={'flex'} flex={1} overflow= 'hidden'>
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MarketplaceSection() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} flex={1} overflow= 'hidden'>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant="h4">Marketplace</Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
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
          <Tab label="Resources" {...a11yProps(0)} />
          <Tab label="Items" {...a11yProps(1)} />
          <Tab label="My Listings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ResourceMarketplace />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} >
        Items
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        My Listings
      </CustomTabPanel>
    </Box>
  )
}