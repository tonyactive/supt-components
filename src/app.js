import Button from './Button/Button';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../dist/css/rsuite-table.css';

import { Table, Column, HeaderCell, Cell } from '../lib/index';

function App() {
  const currentAlertdata = [
    {
      id: '1',
      time: 'Current Alerts',
      desc: '',
      priority: '',
      host: '',
      children: [
        {
          id: '1-1',
          time: '1/6/21 6:03 PM',
          desc:
            'Data backup does not exist. Without a data backup, your database cannot be recovered.',
          priority: 'high',
          host: '*'
        },
        {
          id: '1-2',
          time: '1/6/21 10:03 PM',
          desc:
            "Transparent Huge Pages (THP) are activated or not readable on lssjc0102. CHECK_PLATFORM('CHECK_THP').VALUE:.",
          priority: 'medium',
          host: '*'
        },
        {
          id: '1-3',
          time: '1/6/21 10:03 PM',
          desc:
            "Transparent Huge Pages (THP) are activated or not readable on lssjc0102. CHECK_PLATFORM('CHECK_THP').VALUE:.",
          priority: 'low',
          host: '*'
        }
      ]
    }
  ];
  const [tableData, setTableData] = useState(currentAlertdata);
  return (
    <div>
      <Button disabled option="emphasized">
        Hello Demo!
      </Button>
      <div>
        <Table
          isTree
          rowKey="id"
          width={1000}
          data={tableData}
          autoHeight={true}
          bordered={true}
          onExpandChange={(isOpen, rowData) => {
            console.log(isOpen, rowData);
          }}
          headerHeight={35}
          rowHeight={38}
          hover={false}
          onRowClick={rowData => {
            console.log(rowData);
          }}
        >
          <Column width={200}>
            <HeaderCell>Time</HeaderCell>
            <Cell height={50} dataKey="time" />
          </Column>
          <Column width={400} resizable={true}>
            <HeaderCell>Description</HeaderCell>
            <Cell height={50} dataKey="desc" />
          </Column>

          <Column width={200}>
            <HeaderCell>Priority</HeaderCell>
            <Cell height={50} dataKey="priority" />
          </Column>

          <Column width={200}>
            <HeaderCell>Host</HeaderCell>
            <Cell height={50} dataKey="host" />
          </Column>
        </Table>
      </div>
    </div>
    //<div>Hello Demo!</div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
