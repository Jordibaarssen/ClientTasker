Game.Api = (function () {


    async function privateInit() {
        let place = document.getElementById('funFact');
        let fact = await funFact();
        place.innerHTML = Game.Template.parseTemplate("api.funFact", {fact:fact});
    }

    async function funFact() {
        return await Game.Data.funFact();
    }

    return {
        init: privateInit,
        funFact,
    }
})();