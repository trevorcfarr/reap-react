import React from 'react';
import { tableHeader } from '../types/types';

interface SortableHeaderProps {
    header: tableHeader;
    onSort: (field: string) => void;
    currentSort: string | null;
    sortDirection: 'asc' | 'desc' | null;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
    header,
    onSort,
    currentSort,
    sortDirection
}) => {
    const handleClick = () => {
        onSort(header.field);
    };

    return (
        <span
            onClick={handleClick}
            className="flex flex-row items-center gap-1 cursor-pointer hover:text-blue-600"
        >
            {header.name}
            {currentSort === header.field && (
                <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
            )}
        </span>
    );
};

export default SortableHeader;
