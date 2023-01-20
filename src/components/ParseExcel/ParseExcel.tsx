import styles from './ParseExcel.module.scss';
import cn from 'classnames';
import { useParseExcel } from './useParseExcel';

const ParseExcel = () => {
  const { handleUpload, error, handleSearch, result, listNumber, fileName } =
    useParseExcel();

  return (
    <div className={styles.wrapper}>

      <div className={styles.inputs}>
        <div className={styles.wrapperInput}>
          <input
            type='file'
            className={styles.inputUpload}
            onChange={(e) => handleUpload(e)}
          />
          Загрузить файл
        </div>

        <h1>Файл: {fileName}</h1>

        <input
          className={cn(styles.inputSearch, {
            [styles.inputError]: error,
          })}
          type='text'
          placeholder='Поиск по загруженному файлу...'
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <h2>
        Результат: <span className={styles.result}>{result}</span>
      </h2>
      {listNumber && (
        <ul>
          {listNumber.map((item) => {
            return <li key={item.Name}>{item.Name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default ParseExcel;
