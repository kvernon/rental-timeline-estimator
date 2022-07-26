import { IValidatorStackProvider } from './IValidatorStackProvider';

import create from 'zustand';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { ValidateResults } from './ValidateResults';

export const useStackProviderStore = create<IValidatorStackProvider>()((set, get) => {
  return {
    entities: [],
    pushOrUpdateEntity: (entity) =>
      set((state) => ({
        entities: [...state.entities.filter((x) => x.key !== entity.key), entity],
      })),
    updateCollectionEntity: (item) =>
      set((state) => {
        if (!item || !item.data || !item.data.stackId) {
          return { entities: state.entities };
        }

        const foundStack = state.entities.find((x) => x.key === item.data.stackId);
        if (foundStack) {
          const foundEntities = foundStack.collection.find((x) => x.data.id === item.data.id);

          if (foundEntities) {
            foundStack.collection = [...foundStack.collection.filter((x) => x.data.id !== item.data.id), item];
          } else {
            foundStack.collection.push(item);
          }

          return {
            entities: [...state.entities.filter((x) => x.key !== foundStack.key), foundStack],
          };
        }

        return {
          entities: [
            ...state.entities.filter((x) => x.key !== item.data.stackId),
            {
              collection: [item],
              key: item.data.stackId,
            },
          ],
        };
      }),
    areValidateResults: (stackKey, panelValidatorStackType: ValidatorStackTypes) => {
      const find = get().entities.find((x) => x.key === stackKey);
      const map = find?.collection.map((y) => y.results.validationResult);
      return ValidateResults(panelValidatorStackType, map || []);
    },

    getEntityByKeys: (stackKey, collectionKey) => {
      const newVar = get().entities.find((x) => x.key === stackKey);

      if (!newVar) {
        return null;
      }

      const newVar2 = newVar?.collection.find((x) => x.data.id === collectionKey);

      if (!newVar2) {
        return null;
      }

      return newVar2;
    },
  };
});
