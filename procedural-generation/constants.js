const id = (id) => document.getElementById(id);

export const canvas = id('canvas');
export const ctx = canvas.getContext('2d');

export const temperatureLabel = id('temperatureLabel');
export const temperatureSpan = id('temperatureSpan');
export const temperatureInput = id('temperatureInput');
export const relativeHumidityLabel = id('relativeHumidityLabel');
export const relativeHumiditySpan = id('relativeHumiditySpan');
export const relativeHumidityInput = id('relativeHumidityInput');
export const dewpointLabel = id('dewpointLabel');
export const dewpointSpan = id('dewpointSpan');
export const dewpointInput = id('dewpointInput');
export const windSpeedLabel = id('windSpeedLabel');
export const windSpeedSpan = id('windSpeedSpan');
export const windSpeedInput = id('windSpeedInput');
export const precipitationForRiverMinLabel = id('precipitationForRiverMinLabel');
export const precipitationForRiverMinSpan = id('precipitationForRiverMinSpan');
export const precipitationForRiverMinInput = id('precipitationForRiverMinInput');
export const precipitationForRiverMaxLabel = id('precipitationForRiverMaxLabel');
export const precipitationForRiverMaxSpan = id('precipitationForRiverMaxSpan');
export const precipitationForRiverMaxInput = id('precipitationForRiverMaxInput');
export const precipitationForLakeMinLabel = id('precipitationForLakeMinLabel');
export const precipitationForLakeMinSpan = id('precipitationForLakeMinSpan');
export const precipitationForLakeMinInput = id('precipitationForLakeMinInput');
export const precipitationForLakeMaxLabel = id('precipitationForLakeMaxLabel');
export const precipitationForLakeMaxSpan = id('precipitationForLakeMaxSpan');
export const precipitationForLakeMaxInput = id('precipitationForLakeMaxInput');