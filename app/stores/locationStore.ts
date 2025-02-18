import { create } from "zustand";

interface LocationState {
  id: number;
  isShowingVariables: boolean;
}

interface LocationStore {
  locationState?: LocationState[];
  setLocationState: (locationState: LocationState[]) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locationState: [],
  // todo: update with correct logic
  setLocationState: (newLocationState) =>
    set(() => ({ locationState: newLocationState })),
}));
