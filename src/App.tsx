import React from 'react';
import BathTube, { BathTubeRef } from './BathTube';
import './App.css';

function App() {
  const bathTubeRef = React.useRef<BathTubeRef>()

  const [widthValue, setWidthValue] = React.useState<number>(300)
  const [heightValue, setHeightValue] = React.useState<number>(20)
  const [levelsValue, setLevelsValue] = React.useState<number>(5)
  const [delayValue, setDelayValue] = React.useState<number>(100)
  const [colorsValue, setColorsValue] = React.useState<string>('#78BFEB,#4EBFF2,#51BBDB,#4ED8F2,#61E0EB')
  const [colorValue, setColorValue] = React.useState<string>('#00FFFF')
  const [clippedValue, setClippedValue] = React.useState<boolean>(true)

  return (
    <div className="App">
      <header className="App-header">
        <BathTube
          onRef={(callbacks) => bathTubeRef.current = callbacks}
          // All callbacks:
          onActionEnd={() => console.log('onActionEnd')}
          onDecreaseWaterLevel={() => console.log('onDecreaseWaterLevel')}
          onIncreaseWaterLevelDone={() => console.log('onIncreaseWaterLevelDone')}
          onStep={(step) => console.log(step)}
          // All options:
          width={widthValue}
          height={heightValue}
          levels={levelsValue}
          delay={delayValue}
          clip={clippedValue}
          defaultColor={colorValue}
          colors={colorsValue.split(',')}
        />
        <div className="AppActions">
          <button onClick={() => bathTubeRef.current?.increaseWaterLevel()}>increaseWaterLevel</button>
          <button onClick={() => bathTubeRef.current?.decreaseWaterLevel()}>decreaseWaterLevel</button>
        </div>
        <div>
          <p>Options</p>
          <label htmlFor="width">Width</label>
          <input type="number" id="width" value={widthValue} onChange={(e) => setWidthValue(parseInt(e.target.value))} />
          <br />
          <label htmlFor="height">Height</label>
          <input type="number" id="height" value={heightValue} onChange={(e) => setHeightValue(parseInt(e.target.value))} />
          <br />
          <label htmlFor="levels">Levels</label>
          <input type="number" id="levels" value={levelsValue} onChange={(e) => setLevelsValue(parseInt(e.target.value))} />
          <br />
          <label htmlFor="delay">Delay (in ms)</label>
          <input type="number" id="delay" value={delayValue} onChange={(e) => setDelayValue(parseInt(e.target.value))} />
          <br />
          <label htmlFor="colors">Colors</label>
          <input type="text" id="colors" value={colorsValue} onChange={(e) => setColorsValue(e.target.value)} />
          <br />
          <label htmlFor="color">Default Fill Color</label>
          <input type="text" id="color" value={colorValue} onChange={(e) => setColorValue(e.target.value)} />
          <br />
          <label htmlFor="clip">Clip?</label>
          <input type="checkbox" id="clip" checked={clippedValue} onChange={(e) => setClippedValue(e.target.checked)} />
          <br />
        </div>
      </header>
    </div>
  );
}

export default App;
