import { useState } from 'react';
import { read, utils } from 'xlsx';

type DataSheets = {
  Name: string;
  __rowNum__: number;
};

export const useParseExcel = () => {
  const [data, setData] = useState<DataSheets[]>();
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [listNumber, setListNumber] = useState<DataSheets[]>();
  const [fileName, setFileName] = useState<string>('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileName(e.target.files[0].name);
      
      const data = await e.target.files[0].arrayBuffer();
      const workbook = read(data);

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonDate = utils.sheet_to_json<DataSheets>(worksheet);

      setData(jsonDate);

    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data) {
      if (e.target.value.length >= 3) {
        setError(false);
        if (
          data.find((item: DataSheets) =>
            item.Name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        ) {
          setListNumber(
            data.filter((item: DataSheets) =>
              item.Name.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
          setResult('Номер найден');
        } else {
          setListNumber([]);
          setResult('Номер ненайден');
        }
      } else {
        setListNumber([]);
        setError(true);
        setResult('Введите минимум 3 символа');
      }
    } else {
      setListNumber([]);
      setResult('Сначала загрузите файл');
    }
  };

  return { handleUpload, error, handleSearch, result, listNumber, fileName };
};
