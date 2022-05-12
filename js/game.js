const apiUrl = 'url/super/duper/game';

const Game = (function(url){
    console.log('hallo, vanuit een module');

    //Configuratie en state waarden
    let configMap = {
        apiUrl: url
    };

    let stateMap = {
        gameState: null,
        oldGameState: null,
        gameToken: '',
        playerId: '',
    };

    let gameStateInterval;

    // Private function init
    const privateInit = function(playerId, gameToken){
        stateMap.gameToken = gameToken;
        stateMap.playerId = playerId;

        Game.Template.init();
        Game.Api.init();
        Game.Stats.init();

        _getCurrentGameState();
        gameStateInterval = setInterval(_getCurrentGameState, 2000);
    };

    const aanDeBeurt = async function() {
        return Game.Data.get(`https://jordilb.hbo-ict.org/api/Spel/Beurt/${stateMap.gameToken}`);
    };

    const _getCurrentGameState = async function () {

        stateMap.gameState = await Game.Model.getGameState(stateMap.gameToken);

        if (stateMap.oldGameState === null) {
            Game.Reversi.showBoard(stateMap.gameState.bord);
            Game.Stats.updateChart(stateMap.gameState.bord);
        } else if (stateMap.gameState.bord !== stateMap.oldGameState.bord) {
            let update = false;
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    let oldColor = stateMap.oldGameState.bord[y][x];
                    let color = stateMap.gameState.bord[y][x];

                    if (oldColor !== color) {
                        update = true;
                        Game.Reversi.showFiche(x, y, color)
                    }
                }
            }
            if(update) Game.Stats.updateChart(stateMap.gameState.bord);
        }

        let kleur = document.getElementById("kleur");
        kleur.innerHTML = stateMap.gameState.speler1Token === stateMap.playerId ? 'Kleur: Wit' : 'Kleur: Rood';

        let beurt = document.getElementById("aanDeBeurt");
        beurt.innerHTML = await aanDeBeurt() === 1 ? 'Aan de beurt: Wit' : 'Aaan de beurt: Rood';

        let speler1 = stateMap.gameState.bord.map(v => v.filter(l => l === 1).length).reduce((i1, i2) => i1 + i2);
        let speler2 = stateMap.gameState.bord.map(v => v.filter(l => l === 2).length).reduce((i1, i2) => i1 + i2);
        let scoreSpelers = `Wit: ${speler1}` + ' - ' + `Rood: ${speler2}`;

        let score = document.getElementById("score");
        score.innerHTML = scoreSpelers;

        if (stateMap.gameState.isKlaar) {
            clearInterval(gameStateInterval);

            if (speler1 > speler2) {
                beurt.innerHTML = 'Wit heeft gewonnen!';
            } else if (speler2 > speler1) {
                beurt.innerHTML = 'Rood heeft gewonnen!';
            } else {
                beurt.innerHTML = 'Gelijk spel';
            }

            let playerId = await aanDeBeurt() === 1 ? stateMap.gameState.speler1Token : stateMap.gameState.speler2Token;
            if (playerId === stateMap.playerId) {
                $.get(`https://jordilb.hbo-ict.org/Spel/Done/${stateMap.gameToken}`).then(r => r);
            }

        }

        stateMap.oldGameState = stateMap.gameState;
    };

    const doeZet = async function(x, y) {
        let playerId = await aanDeBeurt() === 1 ? stateMap.gameState.speler1Token : stateMap.gameState.speler2Token;

        if (playerId === stateMap.playerId) {
            await Game.Data.put(`https://jordilb.hbo-ict.org/api/spel/${stateMap.gameToken}/zet?token=${stateMap.playerId}&x=${x}&y=${y}`);
            await _getCurrentGameState();
        }
    };

    // Waarde object geretourneerd aan de outer scope
    return {
        init: privateInit,
        doeZet,
    }

})(apiUrl);


