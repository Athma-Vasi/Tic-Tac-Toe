const mainApp = function () {
	const log = (i: unknown) => console.log('\n', i)

	type Form = HTMLFormElement | null
	type Div = HTMLDivElement | null

	type Player = {
		name: string
		symbol: string
	}

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
		let onceFlag = true
		let player1Turn = true
		let player2Turn = false

		let cells: Array<string[]> = []

		function handleStartBttn(this: HTMLFormElement, ev: SubmitEvent) {
			ev.preventDefault()

			if (onceFlag) {
				const formData = new FormData(this)
				const _player1Name = formData.get('player1')?.toString()
				const _player1Symbol = formData.get('player1Symbol')?.toString()
				const _player2Name = formData.get('player2')?.toString()
				const _player2Symbol = formData.get('player2Symbol')?.toString()

				const player1 = playerFactory(
					_player1Name === '' ? 'Player 1' : _player1Name ?? '',
					_player1Symbol === '' ? 'X' : _player1Symbol ?? ''
				)
				const player2 = playerFactory(
					_player2Name === '' ? 'Player 2' : _player2Name ?? '',
					_player2Symbol === '' ? 'O' : _player2Symbol ?? ''
				)

				//
				//
				//
				//
				//

				const renderGameBoard = (function () {
					const gameBoard: Div = document.querySelector('.gameBoard')

					gameBoard?.style.setProperty('--grid-rows', '3')
					gameBoard?.style.setProperty('--grid-cols', '3')

					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							const gameCell = document.createElement('div')

							if (gameBoard) {
								gameBoard.appendChild(gameCell).className = 'gameCell'
								gameCell.setAttribute('data-key', `${i},${j}`)
							}

							gameCell.addEventListener('click', handleCellClick)
						}
					}

					//
					//
					//
					//
					//

					function handleCellClick(this: HTMLDivElement) {
						const cellKey = this.dataset.key ?? ''
						log(cellKey)

						renderMove(cellKey, player1, player2)
						checkWin(cellKey, cells)
					}

					//
					//
					//
					//
					//

					function renderMove(cellKey_: string, player1_: Player, player2_: Player) {
						const gameCellCurrent: Div = document.querySelector(
							`.gameCell[data-key='${cellKey_}']`
						)

						const gameCellText = document.createElement('fieldset')
						gameCellCurrent?.appendChild(gameCellText)
						gameCellText.className = 'gameCellText'

						if (player1Turn && player2Turn) return null
						if (!player1Turn && !player2Turn) return null

						if (player1Turn && !player2Turn) {
							if (gameCellCurrent) {
								gameCellText.textContent = player1_.symbol
								gameCellText.disabled = true
							}

							player1Turn = false
							player2Turn = true
						} else if (!player1Turn && player2Turn) {
							if (gameCellCurrent) {
								gameCellText.textContent = player2_.symbol
								gameCellText.disabled = true
							}

							player1Turn = true
							player2Turn = false
						}
					}

					//
					//
					//
					//
					//

					function checkWin(cellKey_: string, cells_: Array<string[]>) {
						cells_.push(cellKey_.split(','))
						log(cells_)
					}

					//
					//
					//
				})()
				//
				//
				//
			}
			onceFlag = false
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
