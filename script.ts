const mainApp = function () {
	const log = (i: unknown) => console.log('\n', i)

	type Form = HTMLFormElement | null
	type Div = HTMLDivElement | null

	//

	const gameModule = function () {}
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	const playerFactory = function (name: string, symbol: string) {
		return { name, symbol }
	}
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	const gameBoardModule = (function () {
		//grabs the elements and sets up event listeners
		const form: Form = document.querySelector('.form-startBttn')

		function handleStartBttn(this: HTMLFormElement, ev: SubmitEvent) {
			ev.preventDefault()

			const formData = new FormData(this)
			const _player1Name = formData.get('player1')?.toString()
			const _player1Symbol = formData.get('player1Symbol')?.toString().toUpperCase()
			const _player2Name = formData.get('player2')?.toString()
			const _player2Symbol = formData.get('player2Symbol')?.toString().toUpperCase()

			const player1 = playerFactory(
				_player1Name === '' ? 'Player 1' : _player1Name ?? '',
				_player1Symbol === '' ? 'X' : _player1Symbol ?? ''
			)
			const player2 = playerFactory(
				_player2Name === '' ? 'Player 2' : _player2Name ?? '',
				_player2Symbol === '' ? 'O' : _player2Symbol ?? ''
			)

			log(player1)
			log(player2)

			//
			//
			//
			//
			//

			const renderGameBoard = (function () {
				const gameBoard: Div = document.querySelector('.gameBoard')
				log(gameBoard)

				gameBoard?.style.setProperty('--grid-rows', '3')
				gameBoard?.style.setProperty('--grid-cols', '3')

				for (let i = 0; i <= 3; i++) {
					for (let j = 0; j <= 3; j++) {
						const gameCell = document.createElement('div')

						if (gameBoard) {
							gameBoard.appendChild(gameCell).className = 'gameCell'
							gameCell.setAttribute('data-key', `${i},${j}`)
						}

						gameCell.addEventListener('click', handleCellClick)
					}
				}

				function handleCellClick(this: HTMLDivElement, ev: MouseEvent) {
					log(this)
					log(ev)
				}
			})()
		}
		//
		//
		//
		form?.addEventListener('submit', handleStartBttn)
	})()

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
}

//
//
//
//
//
//
//
//
//
//
//

document.addEventListener('DOMContentLoaded', mainApp)
