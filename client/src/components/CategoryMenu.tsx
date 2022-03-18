import React from 'react'
import { CategorySelectionProps } from '../global/types'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { capitalize } from '../util/helper'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};
const getStyles =(name: string, categoryName: string[], theme: Theme) => {
    return {
        fontWeight:
        categoryName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

const CategoryMenu = (props: CategorySelectionProps) => {
    const theme = useTheme();
    const handleChange = (event: SelectChangeEvent<typeof props.selected>) => {
        const {
            target: { value },
            } = event;
            props.setCategories(
            typeof value === 'string' ? value.split(',') : value,
            );
    };
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">{capitalize(props.type)}</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={props.selected}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                >
                {props.categories.map((category) => {
                    let processedCategoryName = ''
                    if (category.type === props.type) {
                        if (category.type === 'categories') {
                            processedCategoryName= capitalize(category.name)
                        } else {
                            processedCategoryName = category.name.toUpperCase()
                        }
                        return(
                            <MenuItem
                                key={category.name}
                                value={category.name}
                                style={getStyles(category.name, props.selected, theme)}
                            >
                            {processedCategoryName}
                            </MenuItem>
                        )
                    }
                })}
            </Select>
            </FormControl>
        </div>
    )
}

export default CategoryMenu
