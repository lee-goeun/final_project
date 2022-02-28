import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [animal, setAnimal] = useState('');

  const handleChange = (event) => {
    setAnimal(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">동물</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={animal}
          label="Age"
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
