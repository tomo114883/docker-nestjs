import { create } from 'zustand';
import { EditedTask } from '../lib/definitions';

// Define the state for the store.
type State = {
  editedTask: EditedTask;
  updateEditedTask: (payload: EditedTask) => void;
  resetEditedTask: () => void;
};

// Create the store for the defined object.
const useStore = create<State>((set) => ({
  editedTask: { id: 0, title: '', description: '' },
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
        description: payload.description,
      },
    }),
  resetEditedTask: () =>
    set({ editedTask: { id: 0, title: '', description: '' } }),
}));

export default useStore;
