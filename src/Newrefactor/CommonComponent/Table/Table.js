import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import { useMemo, useState } from "react";
import Cell from "./Cell";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

export default function Table(props) {
  const {
    enableSelect,
    dataList,
    pagination,
    setPagination,
    sortModel,
    setSortModel,
    isLoading,
    set_filter_object,
    defaultColumns,
    checkbox, //queryData, setSelectedData,
  } = props.state;
  //const [columns, setColumns] = useState(defaultColumns);

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const handleChange = (event) => {
      setPagination({ ...pagination, rowsPerPage: event.target.value });
    };

    return (
      <Stack direction="row" spacing={2}>
        <div sx={{ border: 0 }}>
          Rows Per column: &nbsp;&nbsp;
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pagination.rowsPerPage}
            label="Age"
            onChange={handleChange}
            style={{ height: 30 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </div>
        <div>
          <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
          />
        </div>
      </Stack>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight={true}
        columns={defaultColumns}
        rows={dataList}
        rowCount={pagination.totalRows}
        loading={isLoading}
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
        checkboxSelection={checkbox}
        // componentsProps={{}}
        pagination
        paginationMode="server"
        // rowsPerPageOptions={[10, 20, 50]}
        page={pagination.currPage}
        pageSize={pagination.rowsPerPage}
        onPageChange={(newPage) => {
          setPagination({ ...pagination, currPage: newPage });
        }}
        onPageSizeChange={(newPageSize) => {
          setPagination({ ...pagination, rowsPerPage: newPageSize });
        }}
        sortingMode="server" //sortModel={sortModel}
        onSortModelChange={(newSortModel) => {
          setSortModel(newSortModel);
        }}
      />
    </div>
  );
}
