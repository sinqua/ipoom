'use client'
import React, { forwardRef } from 'react';

const SaveChange = forwardRef(function SaveChange(props, ref: any) {

    const handleClick = () => {
        const name = ref.current?.value;
        console.log(name);
    }

    return (
      <div className="flex justify-end">
        <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleClick}>
          변경사항 저장
        </button>
      </div>
    );
  });


  export default SaveChange;