"use strict";
const mainApp = function () {
    const log = (i) => console.log('\n', i);
    //
    const clearBoard = (function () {
        const clearBttn = document.querySelector('.bttn-clear');
        function handleClearBttn() {
            window.location.reload();
        }
        clearBttn === null || clearBttn === void 0 ? void 0 : clearBttn.addEventListener('click', handleClearBttn);
    })();
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
    const playerFactory = function (name, symbol) {
        return { name, symbol };
    };
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
        const form = document.querySelector('.form-startBttn');
        let onceFlag = true;
        let player1Turn = true;
        let player2Turn = false;
        let winnerGlobal = false;
        const cellsDataKeyPlayer1 = [];
        const cellsDataKeyPlayer2 = [];
        const scoreMap = new Map();
        function handleStartBttn(ev) {
            var _a, _b, _c, _d;
            ev.preventDefault();
            if (onceFlag) {
                const formData = new FormData(this);
                const _player1Name = (_a = formData.get('player1')) === null || _a === void 0 ? void 0 : _a.toString();
                const _player1Symbol = (_b = formData.get('player1Symbol')) === null || _b === void 0 ? void 0 : _b.toString();
                const _player2Name = (_c = formData.get('player2')) === null || _c === void 0 ? void 0 : _c.toString();
                const _player2Symbol = (_d = formData.get('player2Symbol')) === null || _d === void 0 ? void 0 : _d.toString();
                const player1 = playerFactory(_player1Name === '' ? 'Player 1' : _player1Name !== null && _player1Name !== void 0 ? _player1Name : '', _player1Symbol === '' ? 'X' : _player1Symbol !== null && _player1Symbol !== void 0 ? _player1Symbol : '');
                const player2 = playerFactory(_player2Name === '' ? 'Player 2' : _player2Name !== null && _player2Name !== void 0 ? _player2Name : '', _player2Symbol === '' ? 'O' : _player2Symbol !== null && _player2Symbol !== void 0 ? _player2Symbol : '');
                //
                //
                //
                //
                //
                const renderGameBoard = (function () {
                    const gameBoard = document.querySelector('.gameBoard');
                    gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.style.setProperty('--grid-rows', '3');
                    gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.style.setProperty('--grid-cols', '3');
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            const gameCell = document.createElement('div');
                            if (gameBoard) {
                                gameBoard.appendChild(gameCell).className = 'gameCell';
                                gameCell.setAttribute('data-key', `${i},${j}`);
                            }
                            gameCell.addEventListener('click', handleCellClick);
                        }
                    }
                    //
                    //
                    //
                    //
                    //
                    function handleCellClick() {
                        var _a;
                        const cellKey = (_a = this.dataset.key) !== null && _a !== void 0 ? _a : '';
                        let winner = '';
                        renderMove(cellKey, player1, player2);
                        const getWinner = checkWin(cellKey, scoreMap, cellsDataKeyPlayer1, cellsDataKeyPlayer2, player1Turn, player2Turn);
                        if (getWinner === player1.symbol)
                            winner = 'Player 1';
                        if (getWinner === player2.symbol)
                            winner = 'Player 2';
                        log(winner);
                        if (winnerGlobal)
                            announceWinner(winner);
                    }
                    //
                    //
                    //
                    //
                    //
                    function renderMove(cellDataKey_, player1_, player2_) {
                        const gameCellCurrent = document.querySelector(`.gameCell[data-key='${cellDataKey_}']`);
                        const gameCellText = document.createElement('fieldset');
                        if (!winnerGlobal) {
                            gameCellCurrent === null || gameCellCurrent === void 0 ? void 0 : gameCellCurrent.appendChild(gameCellText);
                            gameCellText.className = 'gameCellText';
                        }
                        if (player1Turn && player2Turn)
                            return null;
                        if (!player1Turn && !player2Turn)
                            return null;
                        if (player1Turn && !player2Turn) {
                            if (gameCellCurrent) {
                                gameCellText.textContent = player1_.symbol;
                                gameCellText.disabled = true;
                            }
                            player1Turn = false;
                            player2Turn = true;
                        }
                        else if (!player1Turn && player2Turn) {
                            if (gameCellCurrent) {
                                gameCellText.textContent = player2_.symbol;
                                gameCellText.disabled = true;
                            }
                            player1Turn = true;
                            player2Turn = false;
                        }
                    }
                    //
                    //
                    //
                    //
                    //
                    function checkWin(cellDataKey_, scoreMap_, cellsDataKeyPlayer1_, cellsDataKeyPlayer2_, player1Turn_, player2Turn_) {
                        var _a;
                        const winCondition = [
                            ['0,0', '0,1', '0,2'],
                            ['1,0', '1,1', '1,2'],
                            ['2,0', '2,1', '2,2'],
                            ['0,0', '1,0', '2,0'],
                            ['0,1', '1,1', '2,1'],
                            ['0,2', '1,2', '2,2'],
                            ['0,0', '1,1', '2,2'],
                            ['2,0', '1,1', '0,2'],
                        ];
                        const gameCellCurrent = document.querySelector(`.gameCell[data-key='${cellDataKey_}']`);
                        const symbol = (_a = gameCellCurrent === null || gameCellCurrent === void 0 ? void 0 : gameCellCurrent.textContent) !== null && _a !== void 0 ? _a : '';
                        if (player1Turn_) {
                            cellsDataKeyPlayer1_.push(cellDataKey_);
                            scoreMap_.set(symbol, cellsDataKeyPlayer1_);
                        }
                        else if (player2Turn_) {
                            cellsDataKeyPlayer2_.push(cellDataKey_);
                            scoreMap_.set(symbol, cellsDataKeyPlayer2_);
                        }
                        const winner = winCondition.reduce((acc, curr) => {
                            scoreMap_.forEach((value, key) => {
                                let _winner = false;
                                const [winStr0, ...rest] = curr;
                                const [winStr1, winStr2] = rest;
                                if (value.includes(winStr0) &&
                                    value.includes(winStr1) &&
                                    value.includes(winStr2)) {
                                    _winner = true;
                                }
                                if (_winner) {
                                    acc = key;
                                    winnerGlobal = true;
                                }
                            });
                            return acc;
                        }, '');
                        return winner;
                    }
                    //
                    //
                    //
                    //
                    //
                    function announceWinner(winner_) {
                        const announceH2 = document.querySelector('.announce-winner');
                        if (announceH2)
                            announceH2.textContent = `Congrats! ${winner_} wins!`;
                    }
                })();
                //
                //
                //
            }
            onceFlag = false;
        }
        //
        //
        //
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', handleStartBttn);
    })();
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
};
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
document.addEventListener('DOMContentLoaded', mainApp);
