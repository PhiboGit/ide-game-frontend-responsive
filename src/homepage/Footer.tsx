import { Link, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Typography variant="body2" component="footer" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        ME
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}