import React from 'react';
import './BathTube.css';

const array = (size: number) => new Array(size).fill(null)
const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export type BathTubeRef = {
  increaseWaterLevel: () => any
  decreaseWaterLevel: () => any
}

type StepData = {
  step: number;
  progress: number;
}

type BathTubeProps = {
  colors?: string[]
  defaultColor?: string
  height?: number
  levels?: number
  clip?: boolean
  width?: number
  delay?: number
  onIncreaseWaterLevelDone?: () => any
  onDecreaseWaterLevel?: () => any
  onStep?: (data: StepData) => any
  onActionEnd?: () => any
  onRef?: (refs: BathTubeRef) => void
}

const BathTube: React.FC<BathTubeProps> = ({
  colors = ['#78BFEB', '#4EBFF2', '#51BBDB', '#4ED8F2', '#61E0EB'],
  defaultColor = '#00FFFF',
  height = 20,
  width = 300,
  levels = 5,
  delay = 2000,
  clip = true,
  onRef = null,
  onIncreaseWaterLevelDone = () => null,
  onDecreaseWaterLevel = () => null,
  onActionEnd = () => null,
  onStep = () => null,
}) => {
  const [currentLevel, setCurrentLevel] = React.useState<number>(0);
  const [animationActive, setAnimationActive] = React.useState<number>(0);

  const runAnimation = React.useCallback((type: number) => {
    const animation = async () => {
      setAnimationActive(type)
      let tempLevel = currentLevel

      while (type === 1 ? tempLevel < levels : tempLevel > 0) {
        tempLevel += type
        setCurrentLevel(tempLevel)
        onStep?.({ step: tempLevel, progress: tempLevel / levels })
        await wait(delay)
      }

      setAnimationActive(0)
      type === 1 ? onIncreaseWaterLevelDone?.() : onDecreaseWaterLevel?.()
      onActionEnd?.()
    }

    animation()

  }, [
    currentLevel,
    delay,
    levels,
    onActionEnd,
    onDecreaseWaterLevel,
    onIncreaseWaterLevelDone,
    onStep,
    setAnimationActive,
  ])

  const increaseWaterLevel = React.useCallback(() => {
    if (!animationActive) { runAnimation(1) }
  }, [runAnimation, animationActive])

  const decreaseWaterLevel = React.useCallback(() => {
    if (!animationActive) { runAnimation(-1) }
  }, [runAnimation, animationActive])

  React.useEffect(() => {
    if (onRef) {
      onRef({
        increaseWaterLevel: increaseWaterLevel,
        decreaseWaterLevel: decreaseWaterLevel
      })
    }
  }, [onRef, increaseWaterLevel, decreaseWaterLevel])

  return (
    <div
      className={`BathTubeContainer ${clip ? 'BathTube_Clip' : ''}`}
      style={{ width: `${width}px`, height: `${height * levels}px` }}
    >
      {array(levels).map((_, idx) => (
        idx < currentLevel
          ? <div key={idx} style={{ height: `${height}px`, backgroundColor: colors?.[idx] || defaultColor }}></div>
          : null
      ))}
    </div>
  );
}

export default BathTube
