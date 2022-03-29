import FileSaver from 'file-saver';
import styled from 'styled-components';

const XLSX = require('xlsx');

interface Props {
    data: any;
    indicatorTitle: string;
}

const DownloadButton = styled.div`
  border-radius: 0.2rem;
  font-size: 1.4rem;
  font-weight: normal;
  color: var(--black-600);
  border: 1px solid var(--black-450);
  cursor: pointer;
  padding: 0.4rem 1rem;
  margin: 2rem 1rem 1rem 0;
  background-color: var(--white);
  &:hover {
    border: 1px solid var(--primary-blue);
    color: var(--primary-blue);
  }
  &:active{
    border: 1px solid var(--primary-blue);
    color: var(--primary-blue);
  }
`;
const ExportExcel = (props: Props) => {
  const {
    data,
    indicatorTitle,
  } = props;
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const Heading = [
    {
      country: 'Country',
      countryCode: 'ISO-3 Code',
      year: 'Year',
      value: indicatorTitle,
    },
  ];

  const exportToExcel = (csvData: any) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: ['country', 'countryCode', 'year', 'value'],
      skipHeader: true,
    });

    const wscols = [
      { wch: 20 },
      { wch: 5 },
      { wch: 15 },
    ];

    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: ['country', 'countryCode', 'year', 'value'],
      skipHeader: true,
      origin: -1, // ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataForExcel = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataForExcel, `${indicatorTitle.replaceAll(',', '').replaceAll('.', ' ')}.xlsx`);
  };

  return (
    <DownloadButton
      onClick={() => exportToExcel(data)}
    >
      Download Data as XLSX
    </DownloadButton>
  );
};

export default ExportExcel;
