const mainApp = function () {
	const log = (i: unknown) => console.log('\n', i)

	type Form = HTMLFormElement | null
	type Div = HTMLDivElement | null

	type Player = {
		name: string
		symbol: string
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

		const cellsDataKeyPlayer1: string[] = []
		const cellsDataKeyPlayer2: string[] = []
		const scoreMap = new Map()

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
						let winner = ''

						renderMove(cellKey, player1, player2)
						const getWinner = checkWin(
							cellKey,
							scoreMap,
							cellsDataKeyPlayer1,
							cellsDataKeyPlayer2
						)
						if (getWinner === player1.symbol) winner = 'Player 1'
						if (getWinner === player2.symbol) winner = 'Player 2'

						log(winner)
					}

					//
					//
					//
					//
					//

					function renderMove(cellDataKey_: string, player1_: Player, player2_: Player) {
						const gameCellCurrent: Div = document.querySelector(
							`.gameCell[data-key='${cellDataKey_}']`
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

					function checkWin(
						cellDataKey_: string,
						scoreMap_: Map<string, string[]>,
						cellsDataKeyPlayer1_: string[],
						cellsDataKeyPlayer2_: string[]
					) {
						const winCondition = [
							['0,0', '0,1', '0,2'],
							['1,0', '1,1', '1,2'],
							['2,0', '2,1', '2,2'],
							['0,0', '1,0', '2,0'],
							['0,1', '1,1', '2,1'],
							['0,2', '1,2', '2,2'],
							['0,0', '1,1', '2,2'],
							['2,0', '1,1', '0,2'],
						]

						const gameCellCurrent: Div = document.querySelector(
							`.gameCell[data-key='${cellDataKey_}']`
						)
						const symbol = gameCellCurrent?.textContent ?? ''

						if (player1Turn) {
							cellsDataKeyPlayer1_.push(cellDataKey_)
							scoreMap_.set(symbol, cellsDataKeyPlayer1_)
						} else if (player2Turn) {
							cellsDataKeyPlayer2_.push(cellDataKey_)
							scoreMap_.set(symbol, cellsDataKeyPlayer2_)
						}

						const winner = winCondition.reduce((acc, curr) => {
							scoreMap_.forEach((value, key) => {
								let winner = false

								const [winStr0, ...rest] = curr
								const [winStr1, winStr2] = rest

								if (
									value.includes(winStr0) &&
									value.includes(winStr1) &&
									value.includes(winStr2)
								) {
									winner = true
								}

								if (winner) acc = key
							})
							return acc
						}, '')

						return winner
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
