const id = (id) => document.getElementById(id);

export const canvas = id('canvas');
export const ctx = canvas.getContext('2d');

export const canvas2 = id('canvas2');
export const ctx2 = canvas2.getContext('2d');

export const tileInfoDiv = id('tileInfoDiv');

export const htmlDropdowns = document.getElementsByClassName("dropdown");

export const randomSeedBtn = id('randomSeedBtn');
export const seedInput = id('seedInput');
export const runMapGenBtn = id('runMapGenBtn');
export const changeMapTerrainBtn = id('changeMapTerrainBtn');
export const numOfTilesSpan = id('numOfTilesSpan');
export const numOfTilesInput = id('numOfTilesInput');

export const temperatureSpan = id('temperatureSpan');
export const temperatureInput = id('temperatureInput');
export const relativeHumiditySpan = id('relativeHumiditySpan');
export const relativeHumidityInput = id('relativeHumidityInput');
export const dewpointSpan = id('dewpointSpan');
export const dewpointInput = id('dewpointInput');

export const windSpeedSpan = id('windSpeedSpan');
export const windSpeedInput = id('windSpeedInput');
export const changeMapWindDirectionBtn = id('changeMapWindDirectionBtn');

export const riverVolumeMinSpan = id('riverVolumeMinSpan');
export const riverVolumeMinInput = id('riverVolumeMinInput');
export const riverVolumeMaxSpan = id('riverVolumeMaxSpan');
export const riverVolumeMaxInput = id('riverVolumeMaxInput');
export const lakeVolumeMinSpan = id('lakeVolumeMinSpan');
export const lakeVolumeMinInput = id('lakeVolumeMinInput');
export const lakeExpansionThresholdSpan = id('lakeExpansionThresholdSpan');
export const lakeExpansionThresholdInput = id('lakeExpansionThresholdInput');

export const heightPrecipitationMultiplierSpan = id('heightPrecipitationMultiplierSpan');
export const heightPrecipitationMultiplierInput = id('heightPrecipitationMultiplierInput');
export const lakeHeightPrecipitationMultiplierSpan = id('lakeHeightPrecipitationMultiplierSpan');
export const lakeHeightPrecipitationMultiplierInput = id('lakeHeightPrecipitationMultiplierInput');

export const initialPeakHeightSpan = id('initialPeakHeightSpan');
export const initialPeakHeightInput = id('initialPeakHeightInput');
export const limitHeightCheckbox = id('limitHeightCheckbox');
export const maxAllowedHeightSpan = id('maxAllowedHeightSpan');
export const maxAllowedHeightInput = id('maxAllowedHeightInput');
export const limitDepthCheckbox = id('limitDepthCheckbox');
export const maxAllowedDepthSpan = id('maxAllowedDepthSpan');
export const maxAllowedDepthInput = id('maxAllowedDepthInput');

export const terrainHeightUniformitySpan = id('terrainHeightUniformitySpan');
export const terrainHeightUniformityInput = id('terrainHeightUniformityInput');
export const terrainHeightIncreaseWeightSpan = id('terrainHeightIncreaseWeightSpan');
export const terrainHeightIncreaseWeightInput = id('terrainHeightIncreaseWeightInput');

export const chanceForLandSpan = id('chanceForLandSpan');
export const chanceForLandInput = id('chanceForLandInput');

export const numberOfRandomInitialPeaksOrTrenchesMinSpan = id('numberOfRandomInitialPeaksOrTrenchesMinSpan');
export const numberOfRandomInitialPeaksOrTrenchesMinInput = id('numberOfRandomInitialPeaksOrTrenchesMinInput');
export const numberOfRandomInitialPeaksOrTrenchesMaxSpan = id('numberOfRandomInitialPeaksOrTrenchesMaxSpan');
export const numberOfRandomInitialPeaksOrTrenchesMaxInput = id('numberOfRandomInitialPeaksOrTrenchesMaxInput');
export const lloydRelaxationTimesSpan = id('lloydRelaxationTimesSpan');
export const lloydRelaxationTimesInput = id('lloydRelaxationTimesInput');

export const showHeightmapCheckbox = id('showHeightmapCheckbox');
export const showGrayscaleHeightmapCheckbox = id('showGrayscaleHeightmapCheckbox');
export const showTemperatureMapCheckbox = id('showTemperatureMapCheckbox');
export const showHumidityMapCheckbox = id('showHumidityMapCheckbox');
export const drawBiomesDelaunayStyleCheckbox = id('drawBiomesDelaunayStyleCheckbox');
export const showOceanDepthCheckbox = id('showOceanDepthCheckbox');

export const showTilesCheckbox = id('showTilesCheckbox');
export const showWindDirectionCheckbox = id('showWindDirectionCheckbox');

export const displayTileValuesForm = id('displayTileValuesForm');
export const displayTileHeightValuesRadioBtn = id('displayTileHeightValuesRadioBtn');
export const displayTileTemperatureValuesRadioBtn = id('displayTileTemperatureValuesRadioBtn');
export const displayTileCurrentPrecipitationValuesRadioBtn = id('displayTileCurrentPrecipitationValuesRadioBtn');
export const displayTileTotalPrecipitationValuesRadioBtn = id('displayTileTotalPrecipitationValuesRadioBtn');

export const highestPeakSpan = id('highestPeakSpan');
export const deepestDepthSpan = id('deepestDepthSpan');
export const longestRiverSpan = id('longestRiverSpan');

export const biomeCountContainer = id('biomeCountContainer');
export const biomeCountDiv = id('biomeCountDiv');
export const biomeCountEntry = id('biomeCountEntry');