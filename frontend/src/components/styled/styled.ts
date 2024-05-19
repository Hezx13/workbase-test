import { Box, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
    alignItems: 'flex-start',
  overflowX: 'auto',
  overflowY: 'hidden',
  height: '100%',
  padding: '16px',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});

export const List = styled(Paper)({
  minWidth: '300px',
  maxWidth: '300px',
  marginRight: '16px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  '&::WebkitBoxShadow': '8px 8px 24px -17px rgba(66, 68, 90, 1)',
 '&::MozBoxShadow': '8px 8px 24px -17px rgba(66, 68, 90, 1)',
 boxShadow:' 8px 8px 24px -17px rgba(66, 68, 90, 1)'
});

export const Task = styled(Typography)({
  boxShadow: '1px 1px 1px 1px #00000020',
  margin: '0.5rem 0',
  padding: '8px',
  borderRadius: '4px',
});