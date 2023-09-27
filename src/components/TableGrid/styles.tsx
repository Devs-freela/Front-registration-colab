import { colors } from '../../shared/themes';

export const tableContainer = {
  display: 'flex',
  flex: 1,
  height: 'calc(100vh - 260px)',
};

export const table = {
  width: '100%',
  border: 0,
  borderRadius: '4px',
  '& .super-app-theme--header': {
    backgroundColor: colors.primary_dark,
    border: colors.primary_lightest,
    color: colors.background_base,
    padding: '20px',
    height: '10px',
  },
  '& .MuiDataGrid-cell': {
    padding: '25px',

  },
  '& .MuiDataGrid-iconSeparator': {
    color: colors.primary_dark,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: '700px',
  },

};
