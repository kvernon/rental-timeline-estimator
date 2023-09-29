import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import _get from 'lodash/get';

export const useWatcher = <T>(names: string[] = []): [T[], Dispatch<SetStateAction<T[]>>] => {
  const { watch } = useFormContext();

  const [results, setResults] = useState<T[]>(new Array(names.length));

  useEffect(() => {
    const subscription = watch((data, { name }) => {
      if (name !== undefined) {
        const idx = names.findIndex((e) => e === name);
        const foundData = _get(data, name);

        if (idx !== -1) {
          const updated = [...results];
          updated[idx] = foundData;

          if (results.join(',') !== updated.join(',')) {
            setResults(updated);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, names, results]);

  return [results, setResults];
};
