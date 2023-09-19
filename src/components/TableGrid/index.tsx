import EditIcon from '@mui/icons-material/Edit';
import { IconButton, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
//import { ModalDelete } from '../ModalDelete/ModalDelete';
import { table, tableContainer } from './styles';
//import { useToken } from '../../shared/hooks/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

interface TableGridProps {
  rows: any[];
  columns: GridColDef[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  titleDelete?: string;
  subtitleDelete?: string;
  setColaboradorId?: (id: string) => void;
  handleOpenModalEdit?: () => void;
  handleAttReq?: () => void;
}
export function TableGrid(props: TableGridProps) {
  const actionColumn: GridColDef[] = [
    {
      field: 'menu',
      headerName: ' ',
      type: 'string',
      align: 'right',
      editable: false,
      renderCell: ({ row }) => (
        <>
          {/*  <ModalDelete
            title={props.titleDelete}
            subtitle={props.subtitleDelete}
            onDelete={() =>
              props.onDelete ? props.onDelete(row.id) : ''
            }></ModalDelete> */}
          {
            props.onEdit && <IconButton
              onClick={() => {
                if (props.handleOpenModalEdit && props.setColaboradorId) {
                  props.handleOpenModalEdit()
                  props.setColaboradorId(row.id)
                }
              }
              }>
              <EditIcon />
            </IconButton>
          }
          {
            props.onDelete && <IconButton
              onClick={() => {
                api.delete(`api/colaborador/${row.id}`).then((res) => {
                  toast.success("Colaborador deletado com sucesso!.")
                  if (props.handleAttReq) {
                    props.handleAttReq()
                  }
                }).catch((err) => toast.error(err.data.message))
              }
              }>
              <DeleteIcon />
            </IconButton>
          }
        </>
      ),
    },
  ];

  const handleOnCellClick = (params: GridCellParams) => {
    if (params.field !== 'menu' && props.onView) {
      props.onView(params.id.toString());
    }
  };

  const columns = [...props.columns, ...actionColumn];
  const matches = useMediaQuery('(max-width:480px)');
  return (
    <Box sx={tableContainer}>
      <DataGrid
        rows={props.rows}
        columns={columns.map((column: GridColDef) => ({
          ...column,
          ...(!matches ? {
            flex: 1,
          } : { width: 230 }),
          sortable: false,
          headerClassName: 'super-app-theme--header',
        }))}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        onCellClick={handleOnCellClick}
        sx={table}
      />
    </Box>
  );
}
