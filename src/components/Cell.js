import { useState } from 'react'

function Cell({ coordinate, type }) {
	const [coordinates, setCoordinates] = useState(coordinate)

	return(
		<div className="Cell" id={type}>
		</div>
	)
}

export default Cell;