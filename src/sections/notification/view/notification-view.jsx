/* eslint-disable import/order */
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import { users } from 'src/_mock/user';

import Scrollbar from 'src/components/scrollbar';

import { Box, Breadcrumbs } from '@mui/material';
import LoadingView from 'src/components/loadingView';
import { useNotificationAction } from 'src/redux/features/notification/action';
import { useNotificationState } from 'src/redux/features/notification/notificationSlice';
import NotificationTableHead from '../notification-table-head';
import NotificationTableRow from '../notification-table-row';
import NotificationTableToolbar from '../notification-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import { applyFilter, emptyRows } from '../utils';

// ----------------------------------------------------------------------

export default function NotificationView() {
  const { notifications, totalNotification, numberTake, notificationPage, isLoadNotification } =
    useNotificationState();
  const { onChangePageNotification, onChangeNumberTakeNotification } = useNotificationAction();

  const [selected, setSelected] = useState([]);

  const [filterName, setFilterName] = useState('');

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const lstSelected = notifications.slice(0, numberTake).map((n) => n.id);
      setSelected(lstSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, data) => {
    if (event.target.checked) {
      if (selected.indexOf(data.id) === -1) {
        setSelected((prevSelected) => [...prevSelected, data.id]);
      }
    } else {
      setSelected((prevSelected) => prevSelected.filter((id) => id !== data.id));
    }
  };

  const handleChangePage = (event, newPage) => {
    onChangePageNotification(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onChangePageNotification(0);
    onChangeNumberTakeNotification(event.target.value);
  };

  const handleFilterByName = (event) => {
    onChangePageNotification(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: notifications,
        filterName,
        key: 'title',
      }),
    [notifications, filterName]
  );

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="2xl">
      <Breadcrumbs sx={{ mt: 2, mb: 2 }} aria-label="breadcrumb">
        <Typography underline="hover" color="inherit" href="/">
          Home
        </Typography>
        <Typography
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Manager
        </Typography>
        <Typography sx={{ color: 'text.primary' }}>Notifications</Typography>
      </Breadcrumbs>

      <Card>
        <NotificationTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar
          sx={{
            minHeight: 400,
          }}
        >
          <TableContainer sx={{ overflow: 'unset' }}>
            <Box
              sx={{
                height: 2,
              }}
            >
              {isLoadNotification && <LoadingView />}
            </Box>
            <Table sx={{ minWidth: 800 }}>
              <NotificationTableHead
                isAllChecked={selected.length === notifications.slice(0, numberTake).length}
                rowCount={users.length}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'title', label: 'TITLE' },
                  { id: 'description', label: 'DESCRIPTION' },
                  { id: 'type', label: 'Type' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row) => (
                  <NotificationTableRow
                    key={row.id}
                    data={row}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => handleClick(event, row)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(notificationPage, numberTake, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={notificationPage}
          component="div"
          count={totalNotification}
          rowsPerPage={numberTake}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
