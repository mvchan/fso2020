import React from 'react';

const Filter = ({filterName,setFilterName}) => (
    <form>
        <div>filter shown with <input value={filterName} onChange={(event) => setFilterName(event.target.value)} /></div>
    </form>
)

export default Filter