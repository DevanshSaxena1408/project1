import { create } from "zustand";

type Section = "home" | "about" | "experience" | "projects" | "skills" | "contact";
type NavigationMode = "quick" | "explore";

interface PortfolioState {
  currentSection: Section;
  previousSection: Section | null;
  navigationMode: NavigationMode;
  isLoading: boolean;
  loadingProgress: number;
  introComplete: boolean;
  isChatOpen: boolean;
  hoveredPlanet: string | null;
  isTransitioning: boolean;
  soundEnabled: boolean;
  showHints: boolean;
  visiblePlanetCount: number;
  activeScrollSection: string;

  setCurrentSection: (section: Section) => void;
  setNavigationMode: (mode: NavigationMode) => void;
  setIsLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setIntroComplete: (complete: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
  setHoveredPlanet: (planet: string | null) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setShowHints: (show: boolean) => void;
  setVisiblePlanetCount: (count: number) => void;
  setActiveScrollSection: (section: string) => void;
}

export const useStore = create<PortfolioState>((set) => ({
  currentSection: "home",
  previousSection: null,
  navigationMode: "quick",
  isLoading: true,
  loadingProgress: 0,
  introComplete: false,
  isChatOpen: false,
  hoveredPlanet: null,
  isTransitioning: false,
  soundEnabled: false,
  showHints: true,
  visiblePlanetCount: 0,
  activeScrollSection: "hero",

  setCurrentSection: (section) =>
    set((state) => ({
      currentSection: section,
      previousSection: state.currentSection,
    })),
  setNavigationMode: (mode) => set({ navigationMode: mode }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setIntroComplete: (complete) => set({ introComplete: complete }),
  setIsChatOpen: (open) => set({ isChatOpen: open }),
  setHoveredPlanet: (planet) => set({ hoveredPlanet: planet }),
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setShowHints: (show) => set({ showHints: show }),
  setVisiblePlanetCount: (count) => set({ visiblePlanetCount: count }),
  setActiveScrollSection: (section) => set({ activeScrollSection: section }),
}));
