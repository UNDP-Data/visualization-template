import '../style/tableStyle.css';

export const TableEl = () => (
  <div className='flex-wrap margin-bottom-07'>
    <div className='margin-bottom-07'>
      <h6>Large Table</h6>
      <div className='margin-top-07'>
        <div className='undp-table-head'>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column'>
            Column head 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column'>
            Column head 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column  align-right'>
            Column head 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column align-center'>
            Column head 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 1 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 1 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 1 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-center'>
            Row 1 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 2 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 2 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 2 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-center'>
            Row 2 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 3 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 3 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 3 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-center'>
            Row 3 Column 4
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className='margin-bottom-07 margin-top-07'>
      <h6>Small Table</h6>
      <div className='margin-top-07'>
        <div className='undp-table-head-small'>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column'>
            Column head 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column'>
            Column head 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column align-right'>
            Column head 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column align-right'>
            Column head 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small'>
            Row 1 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small'>
            Row 1 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small align-right'>
            Row 1 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small align-right'>
            Row 1 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small'>
            Row 2 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small'>
            Row 2 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small align-right'>
            Row 2 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small align-right'>
            Row 2 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small'>
            Row 3 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small'>
            Row 3 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small align-right'>
            Row 3 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell-small align-right'>
            Row 3 Column 4
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className='margin-bottom-07 margin-top-07'>
      <h6>Table With Sticky Head</h6>
      <div className='margin-top-07 undp-scrollbar' style={{ height: '20rem' }}>
        <div className='undp-table-head undp-table-head-sticky'>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column'>
            Column head 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column'>
            Column head 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column align-right'>
            Column head 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-head-cell undp-sticky-head-column align-right'>
            Column head 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 1 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 1 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 1 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 1 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 2 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 2 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 2 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 2 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 3 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 3 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 3 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 3 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 4 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 4 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 4 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 4 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 5 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 5 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 5 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 5 Column 4
          </div>
        </div>
        <div className='undp-table-row'>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 6 Column 1
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell'>
            Row 6 Column 2
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 6 Column 3
          </div>
          <div style={{ width: '25%' }} className='undp-table-row-cell align-right'>
            Row 6 Column 4
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
);
