import React from 'react';

type TList = {
  children: React.ReactNode;
  header: string;
}

const List: React.FC<TList> = React.memo(({ children, header }) => {
  return (
    <>  
      <h3>{header}</h3>
      <ul>
        {children}
      </ul>
    </>
  );
});

export default List;