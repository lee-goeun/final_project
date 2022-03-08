import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100, maxHeight: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">검색 필터</InputLabel>
        <Select
          labelId="filter-selector"
          id="filter-selector"
          value={filter}
          label="filter"
          onChange={handleChange}
        >
          <MenuItem value={1}>강아지</MenuItem>
          <MenuItem value={2}>고양이</MenuItem>
          <MenuItem value={3}>기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
