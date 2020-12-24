import React from 'react';

const Filter = ({filterName,setFilterName}) => (
    <form>
        <div>
            find countries <input value={filterName} onChange={(event) => setFilterName(event.target.value)} />
        </div>
    </form>
)

export default Filter