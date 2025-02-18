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
  setLocationState: (newLocationState) =>
    set(() => ({ locationState: newLocationState })),
}));
