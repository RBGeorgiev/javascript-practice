# Tower of Hanoi visualization

See it here: https://z02l2.codesandbox.io/

[The Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi) is a famous mathematical puzzle, often used in Computer Science to teach recursion. I heard it could be solved in 3 lines with recursion and decided to test myself on the problem. I also further challenged myself to try figuring out ways to solve the puzzle for an increased number of pegs (originial puzzle only has 3 pegs). Then I thought it would be a fun exercise to visualize and animate the solution. 

The visualization lets you select the number of disks and pegs, as well as the start and end peg, then immediately solves the problem and prints out the steps for the solution to the left of the canvas. Solution can be animated by clicking the 'Animate Solution' button. Animation speed is capped at 500ms to 10000ms for the full animation and 1ms to 10000ms otherwise. The animation can be paused at any time, which allows for the ability to manually go forwards and backwards through the moves. The color of the disks can be changed at any time. Turning on the checkbox next to the color puts a gradient on that specific color.