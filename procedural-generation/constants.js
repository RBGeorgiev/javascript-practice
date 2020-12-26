const id = (id) => document.getElementById(id);

export const canvas = id('canvas');
export const ctx = canvas.getContext('2d');

export const temperatureSpan = id('temperatureSpan');
export const temperatureInput = id('temperatureInput');
export const relativeHumiditySpan = id('relativeHumiditySpan');
export const relativeHumidityInput = id('relativeHumidityInput');
export const dewpointSpan = id('dewpointSpan');
export const dewpointInput = id('dewpointInput');
export const windSpeedSpan = id('windSpeedSpan');
export const windSpeedInput = id('windSpeedInput');
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
export const riverWidthDistanceStrengthControlSpan = id('riverWidthDistanceStrengthControlSpan');
export const riverWidthDistanceStrengthControlInput = id('riverWidthDistanceStrengthControlInput');

export const heightDecrementMinSpan = id('heightDecrementMinSpan');
export const heightDecrementMinInput = id('heightDecrementMinInput');
export const heightDecrementMaxSpan = id('heightDecrementMaxSpan');
export const heightDecrementMaxInput = id('heightDecrementMaxInput');

export const chanceForLandSpan = id('chanceForLandSpan');
export const chanceForLandInput = id('chanceForLandInput');