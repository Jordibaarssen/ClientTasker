Game.Model = (function(){
    console.log('hallo, vanuit module Model');

    const privateInit = function(){
        console.log("private model");
    };

    const getWeather = function (url) {
        Game.Data.get(url).then(data =>
        {

            if(data.main.temp == null){
                throw new Error("Geen temperatuur")
            }

            console.log(data)
        });

    };

    const _getGameState = async function(token){
        let game = await Game.Data.get(`https://jordilb.hbo-ict.org/api/spel/${ token }`);
        game.bord = boardToArray(game.bord);
        return game;
    };

    function boardToArray(board) {
        let arrayBoard = [];
        for (let i = 0; i < 8; i++) {
            arrayBoard.push([0,0,0,0,0,0,0,0]);
        }

        for (let position in board) {
            let color = board[position];
            let positions = position.split(",");
            arrayBoard[positions[0]][positions[1]] = color;
        }

        return arrayBoard
    }

    return{
        init: privateInit,
        weather: getWeather,
        getGameState: _getGameState,
    }

})();