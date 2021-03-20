const id = (id) => document.getElementById(id);

export const canvas = id('canvas');
export const ctx = canvas.getContext('2d');

export const canvas2 = id('canvas2');
export const ctx2 = canvas2.getContext('2d');

export const tileInfoDiv = id('tileInfoDiv');

export const highestPeakSpan = id('highestPeakSpan');
export const deepestDepthSpan = id('deepestDepthSpan');
export const longestRiverSpan = id('longestRiverSpan');

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

export const precipitationForRiverMinSpan = id('precipitationForRiverMinSpan');
export const precipitationForRiverMinInput = id('precipitationForRiverMinInput');
export const precipitationForRiverMaxSpan = id('precipitationForRiverMaxSpan');
export const precipitationForRiverMaxInput = id('precipitationForRiverMaxInput');
export const precipitationForLakeMinSpan = id('precipitationForLakeMinSpan');
export const precipitationForLakeMinInput = id('precipitationForLakeMinInput');
export const precipitationForLakeMaxSpan = id('precipitationForLakeMaxSpan');
export const precipitationForLakeMaxInput = id('precipitationForLakeMaxInput');

export const heightPrecipitationMultiplierSpan = id('heightPrecipitationMultiplierSpan');
export const heightPrecipitationMultiplierInput = id('heightPrecipitationMultiplierInput');
export const lakeHeightPrecipitationMultiplierSpan = id('lakeHeightPrecipitationMultiplierSpan');
export const lakeHeightPrecipitationMultiplierInput = id('lakeHeightPrecipitationMultiplierInput');

export const initialPeakHeightSpan = id('initialPeakHeightSpan');
export const initialPeakHeightInput = id('initialPeakHeightInput');
export const maxAllowedHeightExpandContainer = id('maxAllowedHeightExpandContainer');
export const limitHeightCheckbox = id('limitHeightCheckbox');
export const maxAllowedHeightSpan = id('maxAllowedHeightSpan');
export const maxAllowedHeightInput = id('maxAllowedHeightInput');
export const maxAllowedDepthExpandContainer = id('maxAllowedDepthExpandContainer');
export const limitDepthCheckbox = id('limitDepthCheckbox');
export const maxAllowedDepthSpan = id('maxAllowedDepthSpan');
export const maxAllowedDepthInput = id('maxAllowedDepthInput');

export const heightDecrementMinSpan = id('heightDecrementMinSpan');
export const heightDecrementMinInput = id('heightDecrementMinInput');
export const heightDecrementMaxSpan = id('heightDecrementMaxSpan');
export const heightDecrementMaxInput = id('heightDecrementMaxInput');

export const chanceForLandSpan = id('chanceForLandSpan');
export const chanceForLandInput = id('chanceForLandInput');

export const numberOfRandomInitialPeaksOrTrenchesMinSpan = id('numberOfRandomInitialPeaksOrTrenchesMinSpan');
export const numberOfRandomInitialPeaksOrTrenchesMinInput = id('numberOfRandomInitialPeaksOrTrenchesMinInput');
export const numberOfRandomInitialPeaksOrTrenchesMaxSpan = id('numberOfRandomInitialPeaksOrTrenchesMaxSpan');
export const numberOfRandomInitialPeaksOrTrenchesMaxInput = id('numberOfRandomInitialPeaksOrTrenchesMaxInput');

export const showHeightmapCheckbox = id('showHeightmapCheckbox');
export const grayscaleHeightmapCheckbox = id('grayscaleHeightmapCheckbox');
export const drawBiomesDelaunayStyleCheckbox = id('drawBiomesDelaunayStyleCheckbox');
export const showOceanDepthCheckbox = id('showOceanDepthCheckbox');

export const showTilesCheckbox = id('showTilesCheckbox');
export const showWindDirectionCheckbox = id('showWindDirectionCheckbox');

export const displayTileValuesForm = id('displayTileValuesForm');
export const displayTileHeightValuesRadioBtn = id('displayTileHeightValuesRadioBtn');
export const displayTileTemperatureValuesRadioBtn = id('displayTileTemperatureValuesRadioBtn');
export const displayTileCurrentPrecipitationValuesRadioBtn = id('displayTileCurrentPrecipitationValuesRadioBtn');
export const displayTileTotalPrecipitationValuesRadioBtn = id('displayTileTotalPrecipitationValuesRadioBtn');