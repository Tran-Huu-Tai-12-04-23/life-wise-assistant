import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { InputWrapper } from 'src/components/input';
import { useTeamAction } from 'src/redux/features/team/action';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import { Listbox, Root } from './style';

export default function SelectMember({ onChangeValue }) {
  const { lstUser } = useTeamState();
  const { onGetLstUserToInvite } = useTeamAction();

  const [selectedValue, setSelectedValue] = useState([]);
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
    options: lstUser || [],
    value: selectedValue,
    getOptionLabel: (option) => option.name || option.username || 'Unknown',
    onChange: (event, newValue) => {
      setSelectedValue(newValue);
      onChangeValue(newValue.map((item) => item.id));
    },
  });

  useEffect(() => {
    onGetLstUserToInvite();
  }, []);

  const reversedValue = [...value].reverse();

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
            {reversedValue.slice(0, 1).map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  avatar={<Avatar>{option.username.charAt(0).toUpperCase()}</Avatar>}
                  label={option.username}
                  onDelete={() => {
                    const newValue = selectedValue.filter((item) => item.id !== option.id);
                    setSelectedValue(newValue);
                    onChangeValue(newValue.map((item) => item.id));
                  }}
                  key={key}
                  {...tagProps}
                />
              );
            })}
            {value.length > 1 && (
              <Typography variant="h7" color="gray">
                +{value.length - 1}
              </Typography>
            )}
          </Stack>
          <input placeholder="Select members" {...getInputProps()} />
        </InputWrapper>
      </Box>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                {option.username}
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}

SelectMember.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
};
