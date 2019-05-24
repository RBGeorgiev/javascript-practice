export function verticalCollision(object, ball) {
    let ballPos = ball.position;
    let ballRadius = ball.radius;
    let objectPos = object.position;

    // top and bottom side collision
    if (
        ballPos.y > objectPos.y - ballRadius
        && ballPos.y < objectPos.y + object.height + ballRadius
        && ballPos.x > objectPos.x
        && ballPos.x < objectPos.x + object.width
    ) {
        return true;
    }
    return false;
}

export function horizontalCollision(object, ball) {
    let ballPos = ball.position;
    let ballRadius = ball.radius;
    let objectPos = object.position;

    // left and right side collision
    if (
        ballPos.x > objectPos.x - ballRadius
        && ballPos.x < objectPos.x + object.width + ballRadius
        && ballPos.y > objectPos.y
        && ballPos.y < objectPos.y + object.height
    ) {
        return true;
    }
    return false;
}