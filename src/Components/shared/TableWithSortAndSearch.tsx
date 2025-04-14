import { CircularProgress } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React from "react";

type Column = {
  header: string;
  field: string;
  sortable?: boolean;
  hasImage?: boolean;
};

type RowData = {
  id: number | string;
  [key: string]: any;
};

interface Props {
  columns: Column[];
  data: RowData[];
  loading: boolean;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  onEdit: (row: RowData) => void;
  onDelete: (id: string | number) => void;
  onToggle: (id: string | number) => void;
  emptyMessage?: string;
  switchStates?: Record<string | number, boolean>;
}

export const TableWithSortAndSearch: React.FC<Props> = ({
  columns,
  data,
  loading,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
  onToggle,
  emptyMessage = "No hay resultados.",
  switchStates = {},
}) => 
  {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.field}
                className={`py-3 px-4 ${col.sortable ? "cursor-pointer" : ""}`}
                onClick={() => col.sortable && onSort(col.field)}
              >
                {col.header}
                {sortField === col.field &&
                  (sortDirection === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6">
                <CircularProgress />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => {
                  if (col.field === "options") {
                    return (
                      <td key={`${row.id}-options`} className="py-5 px-4">
                        <span className="flex gap-1">
                          <IconPencil
                            className="cursor-pointer"
                            onClick={() => onEdit(row)}
                          />
                          <IconTrash
                            className="cursor-pointer"
                            onClick={() => onDelete(row.id)}
                          />
                        </span>
                      </td>
                    );
                  }

                  if (col.field === "actions") {
                    return (
                      <td key={`${row.id}-actions`} className="py-5 px-4">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={switchStates[row.id]}
                            onChange={() => onToggle(row.id)}
                          />
                          <div
                            className={`w-11 h-6 rounded-full transition duration-200 ${
                              switchStates[row.id]
                                ? "!bg-blue-600"
                                : "bg-gray-200"
                            }`}
                          ></div>
                          <div
                            className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                              switchStates[row.id] ? "translate-x-5" : ""
                            }`}
                          ></div>
                        </label>
                      </td>
                    );
                  }

                  return (
                    <td key={`${row.id}-${col.field}`} className="py-5 px-4">
                      {col.hasImage ? (
                        <p className="flex items-center gap-4">
                          <img
                            className="w-[30px] h-[30px] rounded-md"
                            src={row.logo || "../../assets/img/people-icon.jpg"}
                            alt={`Imagen de ${row.businessName}`}
                          />
                          {row[col.field]}
                        </p>
                      ) : (
                        row[col.field]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
