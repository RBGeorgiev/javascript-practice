# JavaScript drawing canvas
Try it out on CodePen: https://codepen.io/BaiRado/pen/qGLbYj

Orignially I planned to use this to learn the very basics of the HTML canvas, however I decided to add some features for better functionality.

Currently there is an issue with the Bucket Fill tool where a one pixel wide outline will be formed around the border of a shape or line.
This happens because those pixels are a different color to both the color you are trying to replace (the old color) and the border pixel color. Because of that they are not included when the color replacement starts.

That is because, in short, the HTML canvas tries to draw starting exactly on the coordinate (which is between two pixels). So the color ends up half in one pixel, half in the other. Since the screen can't display half a pixel it expands the line to cover 2 pixels, causing a blurred and faded line.
You can read more about it here: https://diveintohtml5.info/canvas.html in the PATHS section.

There are ways to work around the problem when drawing straight lines, but so far I have not managed to find a solution that works with uneven lines.