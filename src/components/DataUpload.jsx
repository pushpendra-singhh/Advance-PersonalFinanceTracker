import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { useFinanceContext } from '../context/FinanceContext';

const DataUpload = () => {
  const { addTransaction } = useFinanceContext();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    setPreview(jsonData.slice(0, 5)); // Preview first 5 rows
  };

  const handleImport = () => {
    if (!preview.length) return;

    preview.forEach((row) => {
      addTransaction({
        id: Date.now().toString(),
        date: row.Date || new Date().toISOString().split('T')[0],
        type: row.Type || 'expense',
        category: row.Category || 'Uncategorized',
        amount: parseFloat(row.Amount) || 0,
        notes: row.Notes || '',
      });
    });

    alert('Data imported successfully!');
    setFile(null);
    setPreview([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Data Upload</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
            Upload Excel File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        {file && (
          <button
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Preview Data
          </button>
        )}
        {preview.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Data Preview</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(preview[0]).map((key) => (
                    <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {preview.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleImport}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Import Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUpload;