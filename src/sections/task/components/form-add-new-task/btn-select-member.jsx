import { useState } from 'react';

import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { Avatar, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import CloseIcon from 'src/components/icons/close-icon';
import EmptyBoardIcon from 'src/components/icons/empty-board-icon';
import PersonIcon from 'src/components/icons/person-icon';
import InputCustom from 'src/components/input';
import { useTeamState } from 'src/redux/features/team/teamSlice';
// ----------------------------------------------------------------------

export default function BtnSelectMemberPopover({onChange}) {
  const [open, setOpen] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const theme = useTheme();
  const {currentTeam} = useTeamState()
  const [lstMemberSelected, setLstMemberSelected] = useState([])

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  


  return (
    <>
          <Button
          sx={{width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: 0.5, justifyContent: 'flex-start', pl: 2, pr: 2}}
             onClick={handleOpen}
          color="inherit"  startIcon={<PersonIcon size={14}/>}>
             <Typography sx={{fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold'}}>Add members</Typography>
            </Button>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal:'left' }}
        transformOrigin={{ vertical: 'top', horizontal:'left' }}
        PaperProps={{
          sx: {
            width: 320,
           minHeight:400,
           background: 'transparent',
           border: 'none',
           boxShadow: 'none',
          },
        }}
      >
      <Stack  direction="column" gap={1} sx={{p: 1, borderRadius: 1, background: theme.palette.background.paper,  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)' }}>
       <Stack alignItems="center">
         <Typography sx={{fontSize: 12, textAlign: 'center',color: 'gray', fontWeight: 'bold'}}>Members</Typography>
       </Stack>
        <InputCustom onChange={(e) => setSearchKey(e.target.value)} value={searchKey} placeholder="Typing name of members ..."/>
        <Typography sx={{fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold'}}>Members of board</Typography>

        <Stack direction="column" gap={1}>
        {currentTeam?.members?.filter((item) => item?.username.toLowerCase().includes(searchKey.toLowerCase())).map((data) => {

const isChecked = lstMemberSelected.find(item => item.id === data.id)

            return    <MemberItem 
            isChecked={isChecked}
                        onSelect={() => {
                            const memberExist = lstMemberSelected.find(item => item.id === data.id)
                            if(memberExist) {
                                const restData = lstMemberSelected.filter(item => item.id !== data.id)
                                setLstMemberSelected(restData)
                                onChange(restData)
                            } else {
                                const restData =[...lstMemberSelected, data]
                                setLstMemberSelected(restData)
                                onChange(restData)
                            }


                        }}
                        key={data.id} data={data} />

        })}
       
       {currentTeam?.members?.filter((item) => item?.username.toLowerCase().includes(searchKey.toLowerCase())).length === 0 && <Stack alignItems='center'>
        <EmptyBoardIcon size={22}/></Stack>}
        </Stack>

      </Stack>
      </Popover>
    </>
  );
}

const MemberItem = ({data, onSelect, isChecked}) => <Stack onClick={onSelect} direction="row" gap={1} alignItems="center" sx={{
    padding: 1,
    cursor: 'pointer',
    background: isChecked ? 'rgba(0,0,0,0.05)' : 'transparent',
            borderRadius: 0.5,
    "&:hover": {
        background: 'rgba(0,0,0,0.05)',
    }
}}>
        <Avatar src={data?.avatar} sx={{width: 24, height: 24}} />
         <Typography sx={{fontSize: 12, color: 'gray', textAlign: 'start'}}>{data?.username}</Typography>
         {isChecked && <IconButton sx={{ml: 'auto'}} onClick={onSelect}><CloseIcon size={12}/></IconButton>}
    </Stack>