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