import EditIcon from '@mui/icons-material/Edit';
import { IconButton, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { table, tableContainer } from './styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalDelete } from '../ModalDelete';

interface TableGridProps {
  rows: any[];
  columns: GridColDef[];
  onDelete?: () => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  titleDelete?: string;
  subtitleDelete?: string;
  setColaboradorId?: (id: string) => void;
  handleOpenModalEdit?: () => void;
  handleAttReq?: () => void;
  history?: boolean
  handleOpenHistory?: (id: string) => void
  setSkip?: (number: number) => void
  totalRows?: number
  isLoading?: boolean
  onDeleteBairro?: () => void
  onDeleteLider?: () => void
}
export function TableGrid(props: TableGridProps) {
  let actionColumn: GridColDef[] = [
    {
      field: "history",
      headerName: " ",
      type: 'string',
      align: 'right',
      editable: false,
      renderCell: ({ row }) => (
        <>
          {
            props.history &&
            <IconButton onClick={() => {
              if (props.handleOpenHistory) {
                props.handleOpenHistory(row.id)
              }
            }}>
              <VisibilityIcon />
            </IconButton>
          }
        </>
      )
    },
    {
      field: 'menu',
      headerName: ' ',
      type: 'string',
      align: 'right',
      editable: false,
      renderCell: ({ row }) => (
        <>
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
            props.onDelete && <ModalDelete
              id={row.id}
              handleAtt={props.onDelete}
            ></ModalDelete>
          }
          {
            props.onDeleteBairro && <ModalDelete
              id={row.id}
              handleAtt={props.onDeleteBairro}
              onDeleteBairro={true}
            ></ModalDelete>
          }
          {
            props.onDeleteLider && <ModalDelete
              id={row.id}
              handleAtt={props.onDeleteLider}
            ></ModalDelete>
          }
        </>
      ),
    },
  ];

  if (!props.history) {
    actionColumn.shift()
  }

  if (!props.history && !props.onEdit && !props.onDelete) {
    actionColumn = []
  }

  const handleOnCellClick = (params: GridCellParams) => {
    if (params.field !== 'menu' && props.onView) {
      props.onView(params.id.toString());
    }
  };

  const columns = [...props.columns, ...actionColumn];
  const matches = useMediaQuery('(max-width:480px)');
  return (
    <Box sx={tableContainer}>
      {props.setSkip && props.totalRows && props.isLoading ?
        <DataGrid
          onPaginationModelChange={(e) => props.setSkip && props.setSkip(e.page * e.pageSize)}
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
          paginationMode="server"
          pageSizeOptions={[5]}
          loading={props.isLoading !== undefined ? props.isLoading : false}
          rowCount={props.totalRows && props.totalRows}
          onCellClick={handleOnCellClick}
          sx={table}
        />
        :
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
          pageSizeOptions={[10]}
          loading={props.isLoading !== undefined ? props.isLoading : false}
          onCellClick={handleOnCellClick}
          sx={table}
        />
      }

    </Box>
  );
}
