"use strict";
const mainApp = function () {
    const log = (i) => console.log('\n', i);
    //
    const gameModule = function () { };
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
        function handleStartBttn(ev) {
            var _a, _b, _c, _d;
            ev.preventDefault();
            const formData = new FormData(this);
            const _player1Name = (_a = formData.get('player1')) === null || _a === void 0 ? void 0 : _a.toString();
            const _player1Symbol = (_b = formData.get('player1Symbol')) === null || _b === void 0 ? void 0 : _b.toString().toUpperCase();
            const _player2Name = (_c = formData.get('player2')) === null || _c === void 0 ? void 0 : _c.toString();
            const _player2Symbol = (_d = formData.get('player2Symbol')) === null || _d === void 0 ? void 0 : _d.toString().toUpperCase();
            const player1 = playerFactory(_player1Name === '' ? 'Player 1' : _player1Name !== null && _player1Name !== void 0 ? _player1Name : '', _player1Symbol === '' ? 'X' : _player1Symbol !== null && _player1Symbol !== void 0 ? _player1Symbol : '');
            const player2 = playerFactory(_player2Name === '' ? 'Player 2' : _player2Name !== null && _player2Name !== void 0 ? _player2Name : '', _player2Symbol === '' ? 'O' : _player2Symbol !== null && _player2Symbol !== void 0 ? _player2Symbol : '');
            log(player1);
            log(player2);
            //
            //
            //
            //
            //
            const renderGameBoard = (function () {
                const gameBoard = document.querySelector('.gameBoard');
                log(gameBoard);
                gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.style.setProperty('--grid-rows', '3');
                gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.style.setProperty('--grid-cols', '3');
                for (let i = 0; i <= 3; i++) {
                    for (let j = 0; j <= 3; j++) {
                        const gameCell = document.createElement('div');
                        if (gameBoard) {
                            gameBoard.appendChild(gameCell).className = 'gameCell';
                            gameCell.setAttribute('data-key', `${i},${j}`);
                        }
                        gameCell.addEventListener('click', handleCellClick);
                    }
                }
                function handleCellClick(ev) {
                    log(this);
                    log(ev);
                }
            })();
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
