import { useState, useEffect } from 'react'
import Cell from './Cell.js'
import './styles.css'


function Board() {

	const GRID_WIDTH = 10
	const GRID_HEIGHT = 10
	const SNAKE_HEAD = [1, 1]
	const FOOD_POINT = [8, 8]
	const START_DIRECTION = [0, 0]
	const GAME_SPEED = 250

	const [grid, setGrid] = useState([])
	const [snake, setSnake] = useState([SNAKE_HEAD])
	const [food, setFood] = useState(FOOD_POINT)
	const [dir, setDir] = useState(START_DIRECTION)

  useEffect(() => {
    document.addEventListener('keydown', setDirection);
    return () => {
      document.removeEventListener('keydown', setDirection);
    };
  }, []);

  useEffect(() => {
  	let gameLoop = setTimeout(() => {
  		console.log("Effect called")
      setGame();
    }, GAME_SPEED);

    return () => clearTimeout(gameLoop);
  }, [grid]);

  function setDirection(e){
  	switch(e.key){
  	case "ArrowUp":
  		setDir([-1, 0])
  		break;
  	case "ArrowDown":
  		setDir([1, 0])
  		break;
  	case "ArrowLeft":
  		setDir([0, -1])
  		break;
  	case "ArrowRight":
  		setDir([0, 1])
  		break;
  	default:
  		break;
  	}
  }

  function setGame(){
  	let gameGrid = []
  	renderBoard(gameGrid)
  	moveSnake()
  	collisionDetection()
		renderSnake(gameGrid)
		renderFood(gameGrid)
		setGrid(gameGrid)

		renderGame()
  }

  function renderBoard(gameGrid){
		for (let i=0; i<GRID_HEIGHT; i++){
  		let row = []
			for (let j=0; j<GRID_WIDTH; j++){
				row.push({
					key: Math.random(),
					coordinate: [i, j],
					type: "Grid"
				})
			}
			gameGrid.push(row)
		}
  }

  function renderSnake(gameGrid){
  	for (let i=0; i<snake.length; i++){
			gameGrid[snake[i][0]][snake[i][1]].type = "Snake"
		}
  }

  function renderFood(gameGrid){
  	gameGrid[food[0]][food[1]].type = "Food"
  }

  function moveSnake(){
  	let body = []
  	body.push([(snake[0][0] + dir[0]), (snake[0][1] + dir[1])])
  	for (let i=0; i<snake.length-1; i++){
			body.push(snake[i])
		}
		setSnake(body)
  }

	function renderGame(){
		let gridCells = []

		for (let i=0; i<grid.length; i++){
			for (let j=0; j<grid[1].length; j++){
				gridCells.push(<Cell key={`${grid[i][j].key}`} coordinate={grid[i][j].coordinate} type={grid[i][j].type}/>)
			}
		}

		return gridCells
	}

	function collisionDetection(){
		debugger
		let head = snake[0]
		for (let i=1; i<snake.length; i++){
			if (head.toString() == snake.toString[i]){
				alert("Game Over");
			}
		}
		if (head.toString() == food.toString()){
			growSnake()
			moveFood()
		}
	}

	function growSnake(){
		let body = JSON.parse(JSON.stringify(snake))
		let tail = body[body.length-1]
		// let newHead = [(tail[0]+dir[0]), (tail[1]+dir[1])]
		// body.unshift(newHead)
		body.push(tail)
		setSnake(body)
	}

	function moveFood(){
		let newFood = food
		while (true) {
			newFood = [(Math.floor(Math.random()*10)), (Math.floor(Math.random()*10))]
			for (let i in snake){
				if (snake[i].toString() == newFood.toString()){
					continue
				}
			}
			break
		}
		setFood(newFood)
	}	

	return (
		<div className="Board">
			{renderGame()}
		</div>
	)
}

export default Board;
