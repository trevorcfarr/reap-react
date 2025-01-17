import React, { useState, useMemo } from 'react';
import { tableHeader, tableData } from '../types/types';
import { RenderField } from './RenderField';
import SortableHeader from './SortableHeader';

interface TableProps {
    data: tableData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    const tableHeaders: tableHeader[] = [
        {
            name: "Street Address",
            field: "Address",
        },
        {
            name: "City",
            field: "City",
        },
        {
            name: "State",
            field: "State",
        },
        {
            name: "Zip Code",
            field: "ZipCode",
        },
        {
            name: "County",
            field: "County",
        },
        {
            name: "Property Type",
            field: "PropertyType",
        },
        {
            name: "Square Feet",
            field: "Sqft",
        }
    ];

    const handleSort = (field: string) => {
        if (sortField === field) {
            // If clicking the same field, toggle direction
            if (sortDirection === 'asc') {
                setSortDirection('desc');
            } else if (sortDirection === 'desc') {
                setSortField(null);
                setSortDirection(null);
            }
        } else {
            // New field, start with ascending
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedData = useMemo(() => {
        if (!sortField || !sortDirection) {
            return data;
        }

        return [...data].sort((a, b) => {
            const aValue = a[sortField as keyof tableData];
            const bValue = b[sortField as keyof tableData];

            // Handle numeric sorting for Sqft
            if (sortField === 'Sqft') {
                const aNum = parseInt(aValue);
                const bNum = parseInt(bValue);
                return sortDirection === 'asc'
                    ? aNum - bNum
                    : bNum - aNum;
            }

            // String sorting for other fields
            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
    }, [data, sortField, sortDirection]);

    return (
        <div className='flex flex-col gap-2' id="table-container">
            <div className="text-lg font-semibold">Property Results</div>
            <table className='w-full bg-white border-collapse rounded-[8px] p-10 max-w-screen-lg mx-auto'>
                <thead>
                    <tr>
                        {tableHeaders.map(header => (
                            <th
                                key={header.field}
                                className='text-left border border-tertiary-main p-2 text-xs'
                            >
                                <SortableHeader
                                    header={header}
                                    onSort={handleSort}
                                    currentSort={sortField}
                                    sortDirection={sortDirection}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={index}>
                            {tableHeaders.map((header) => (
                                <td
                                    key={header.field}
                                    className='border border-tertiary-main p-2 text-xs'
                                >
                                    <RenderField header={header} data={item} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
