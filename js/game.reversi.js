Game.Reversi = (function(){
    console.log('hallo, vanuit module Reversi');

    let configMap;

    const privateInit = function(){
        console.log("private spel");
    };

    const showBoard = function (bord) {
        const board = document.querySelector(".board");

        board.innerHTML = Game.Template.parseTemplate("reversi.board", {
            board: bord,
        });

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let square = document.querySelector(`.board-row-y-${y}.board-row-x-${x}`);
                square.addEventListener("click", evt => {
                    if (square.children.length > 0) return;
                    Game.doeZet(x, y);
                })
            }
        }

    };

    const showFiche = function (x, y, color) {
        let square = document.querySelector(`.board-row-y-${y}.board-row-x-${x}`);

        let fiche = document.createElement("div");
        fiche.classList.add("fade-in");
        fiche.classList.add(`fiche-${color}`);

        square.innerHTML = '';
        square.append(fiche)
    };

    return{
        init: privateInit,
        showBoard,
        showFiche,
    }

})();
