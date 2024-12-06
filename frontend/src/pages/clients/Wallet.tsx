import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface RowData {
  [key: string]: string | number; // Dữ liệu động từ Excel
}

export const Wallet: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);

  // Hàm xử lý Import dữ liệu
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt?.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setData(jsonData as RowData[]);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Tải lên file Excel và hiển thị thông tin</h2>
      <input type="file" onChange={handleFileImport} />
      <div style={{ marginTop: '20px' }}>
        {data.length > 0 && (
          <table
            style={{
              border: '1px solid #333',
              borderCollapse: 'collapse',
              width: '100%',
            }}
          >
            <thead>
              <tr>
                {Object.keys(data[0]).map((header) => (
                  <th
                    key={header}
                    style={{
                      border: '1px solid #333',
                      padding: '8px',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td
                      key={idx}
                      style={{
                        border: '1px solid #333',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Wallet