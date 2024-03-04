'use client'
import React, { useState } from 'react';

export default function ColumnHideCheckbox({ allColumns, getToggleHideAllColumnsProps }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggleColumn = (columnId) => {
        const column = allColumns.find((col) => col.id === columnId);
        column.toggleHidden();
    };

    return (
        <div className="relative">
            <div className="relative inline-block">
                <button
                    className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span>Select Columns</span>
                    <svg
                        className="w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            <label key="toggleAll" className="flex items-center space-x-2 px-4 py-2">
                                <input type="checkbox" {...getToggleHideAllColumnsProps()} />
                                <span>Toggle All</span>
                            </label>
                            {allColumns.slice(2).map((column) => (
                                <label key={column.id} className="flex items-center space-x-2 px-4 py-2">
                                    <input
                                        type="checkbox"
                                        value={column.id}
                                        onChange={() => handleToggleColumn(column.id)}
                                    />
                                    <span>{column.Header}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}