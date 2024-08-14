import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Box, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { InputWrapper } from 'src/components/input';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import { Listbox, Root, StyledTag } from '../style';
import { BOARD_TAG } from './tag-enum';

export default function SelectTag({ onChangeValue }) {
  const { teams } = useTeamState();
  const [selectedValue, setSelectedValue] = useState([]);
  const values = useMemo(() => Object.keys(BOARD_TAG).map((key) => BOARD_TAG[key]), [teams]);
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: values || [],
    value: selectedValue,
    getOptionLabel: (option) => option.name,
    onChange: (event, newValue) => {
      setSelectedValue(newValue);
      onChangeValue(newValue.map((item) => item.name));
    },
  });

  return (
    <Root>
      <Box sx={{ width: '100%' }} {...getRootProps()}>
        <InputWrapper minWidth="100%" ref={setAnchorEl} className={focused ? 'focused' : ''}>
          <Stack
            direction="row"
            sx={{ maxWidth: '250px', overflow: 'auto-scroll' }}
            alignItems="center"
            gap={1}
          >
            {value
              .reverse()
              .slice(0, 2)
              .map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <StyledTag
                    key={key}
                    {...tagProps}
                    label={option.name}
                    color={option?.color}
                    backgroundColor={option?.background}
                  />
                );
              })}
            {value.length > 2 && (
              <Typography variant="h7" color="gray">
                +{value.length - 2}
              </Typography>
            )}
          </Stack>
          <input placeholder="select tags" {...getInputProps()} />
        </InputWrapper>
      </Box>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {values?.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                {option.name}
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}
