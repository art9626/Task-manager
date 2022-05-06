import React from 'react';

interface ISelector {
  values: string[];
  isLoading?: boolean;
  title?: string;
  value: string;
  onChange: (name: string) => void;
}

const Selector: React.FC<ISelector> = React.memo(({ values, isLoading = false, value, onChange }) => {
  return (
    <select disabled={isLoading} value={value} onChange={(e) => onChange(e.currentTarget.value)} style={{width: '150px'}}>
      <option value=''></option>
      {
        values.map((item) => {
          return (
            <option key={item} value={item}>{item}</option>
          );
        })
      }
    </select>
  );
});

export default Selector;