import { createContext, useContext, useState } from 'react';

type TProvider = {
  children: React.ReactNode;
};
type TContext = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  tapCount: number;
  setTapCount: React.Dispatch<React.SetStateAction<number>>;
  doubleTapCount: number;
  setDoubleTapCount: React.Dispatch<React.SetStateAction<number>>;
  isLongPressed: boolean;
  setIsLongPressed: React.Dispatch<React.SetStateAction<boolean>>;
  isDragged: boolean;
  setIsDragged: React.Dispatch<React.SetStateAction<boolean>>;
  isSwipedLeft: boolean;
  setIsSwipedLeft: React.Dispatch<React.SetStateAction<boolean>>;
  isSwipedRight: boolean;
  setIsSwipedRight: React.Dispatch<React.SetStateAction<boolean>>;
  isSizeChanged: boolean;
  setIsSizeChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const GestureContext = createContext<TContext | null>(null);

export function GestureProvider({ children }: TProvider) {
  const [score, setScore] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);
  const [isSwipedRight, setIsSwipedRight] = useState(false);
  const [isSizeChanged, setIsSizeChanged] = useState(false);

  return (
    <GestureContext.Provider
      value={{
        score,
        setScore,
        tapCount,
        setTapCount,
        doubleTapCount,
        setDoubleTapCount,
        isLongPressed,
        setIsLongPressed,
        isDragged,
        setIsDragged,
        isSwipedLeft,
        setIsSwipedLeft,
        isSwipedRight,
        setIsSwipedRight,
        isSizeChanged,
        setIsSizeChanged,
      }}>
      {children}
    </GestureContext.Provider>
  );
}

export const useGesture = () => {
  const gestureTracker = useContext(GestureContext);
  if (!gestureTracker) {
    throw new Error('useGesture must be used within a GestureProvider');
  }
  return gestureTracker;
};
