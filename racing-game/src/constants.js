const el = (el) => document.getElementById(el);

export const
    drawAxisCheckbox = el("drawAxisCheckbox"),
    drawCarsCheckbox = el("drawCarsCheckbox"),
    drawGatesCheckbox = el("drawGatesCheckbox"),
    drawSensorsCheckbox = el("drawSensorsCheckbox"),
    drawSensorCollisionsCheckbox = el("drawSensorCollisionsCheckbox"),
    drawSidesCheckbox = el("drawSidesCheckbox"),
    drawSpriteCheckbox = el("drawSpriteCheckbox"),
    drawVerticesCheckbox = el("drawVerticesCheckbox"),

    numberOfCars = el("numberOfCars"),
    numberOfCarsVal = el("numberOfCarsVal"),
    gameSpeed = el("gameSpeed"),
    gameSpeedVal = el("gameSpeedVal"),

    carImage = new Image();
carImage.src = "./src/img/car.png";