import { useState, useCallback } from 'react';

const UseInput = (prop) => {
  const [state, setState] = useState(prop);
  const onChangeValue = useCallback((e) => {
    setState(e.target.value);
  }, []);

  return [state, onChangeValue];
};

export default UseInput;
