"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var apiUrl = 'url/super/duper/game';

var Game = function (url) {
  console.log('hallo, vanuit een module'); //Configuratie en state waarden

  var configMap = {
    apiUrl: url
  };
  var stateMap = {
    gameState: null,
    oldGameState: null,
    gameToken: '',
    playerId: ''
  };
  var gameStateInterval; // Private function init

  var privateInit = function privateInit(playerId, gameToken) {
    stateMap.gameToken = gameToken;
    stateMap.playerId = playerId;
    Game.Template.init();
    Game.Api.init();
    Game.Stats.init();

    _getCurrentGameState();

    gameStateInterval = setInterval(_getCurrentGameState, 2000);
  };

  var aanDeBeurt = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", Game.Data.get("https://jordilb.hbo-ict.org/api/Spel/Beurt/".concat(stateMap.gameToken)));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function aanDeBeurt() {
      return _ref.apply(this, arguments);
    };
  }();

  var _getCurrentGameState = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var update, x, y, oldColor, color, kleur, beurt, speler1, speler2, scoreSpelers, score, playerId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Game.Model.getGameState(stateMap.gameToken);

            case 2:
              stateMap.gameState = _context2.sent;

              if (stateMap.oldGameState === null) {
                Game.Reversi.showBoard(stateMap.gameState.bord);
                Game.Stats.updateChart(stateMap.gameState.bord);
              } else if (stateMap.gameState.bord !== stateMap.oldGameState.bord) {
                update = false;

                for (x = 0; x < 8; x++) {
                  for (y = 0; y < 8; y++) {
                    oldColor = stateMap.oldGameState.bord[y][x];
                    color = stateMap.gameState.bord[y][x];

                    if (oldColor !== color) {
                      update = true;
                      Game.Reversi.showFiche(x, y, color);
                    }
                  }
                }

                if (update) Game.Stats.updateChart(stateMap.gameState.bord);
              }

              kleur = document.getElementById("kleur");
              kleur.innerHTML = stateMap.gameState.speler1Token === stateMap.playerId ? 'Kleur: Wit' : 'Kleur: Rood';
              beurt = document.getElementById("aanDeBeurt");
              _context2.next = 9;
              return aanDeBeurt();

            case 9:
              _context2.t0 = _context2.sent;

              if (!(_context2.t0 === 1)) {
                _context2.next = 14;
                break;
              }

              _context2.t1 = 'Aan de beurt: Wit';
              _context2.next = 15;
              break;

            case 14:
              _context2.t1 = 'Aaan de beurt: Rood';

            case 15:
              beurt.innerHTML = _context2.t1;
              speler1 = stateMap.gameState.bord.map(function (v) {
                return v.filter(function (l) {
                  return l === 1;
                }).length;
              }).reduce(function (i1, i2) {
                return i1 + i2;
              });
              speler2 = stateMap.gameState.bord.map(function (v) {
                return v.filter(function (l) {
                  return l === 2;
                }).length;
              }).reduce(function (i1, i2) {
                return i1 + i2;
              });
              scoreSpelers = "Wit: ".concat(speler1) + ' - ' + "Rood: ".concat(speler2);
              score = document.getElementById("score");
              score.innerHTML = scoreSpelers;

              if (!stateMap.gameState.isKlaar) {
                _context2.next = 34;
                break;
              }

              clearInterval(gameStateInterval);

              if (speler1 > speler2) {
                beurt.innerHTML = 'Wit heeft gewonnen!';
              } else if (speler2 > speler1) {
                beurt.innerHTML = 'Rood heeft gewonnen!';
              } else {
                beurt.innerHTML = 'Gelijk spel';
              }

              _context2.next = 26;
              return aanDeBeurt();

            case 26:
              _context2.t2 = _context2.sent;

              if (!(_context2.t2 === 1)) {
                _context2.next = 31;
                break;
              }

              _context2.t3 = stateMap.gameState.speler1Token;
              _context2.next = 32;
              break;

            case 31:
              _context2.t3 = stateMap.gameState.speler2Token;

            case 32:
              playerId = _context2.t3;

              if (playerId === stateMap.playerId) {
                $.get("https://jordilb.hbo-ict.org/Spel/Done/".concat(stateMap.gameToken)).then(function (r) {
                  return r;
                });
              }

            case 34:
              stateMap.oldGameState = stateMap.gameState;

            case 35:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function _getCurrentGameState() {
      return _ref2.apply(this, arguments);
    };
  }();

  var doeZet = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(x, y) {
      var playerId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return aanDeBeurt();

            case 2:
              _context3.t0 = _context3.sent;

              if (!(_context3.t0 === 1)) {
                _context3.next = 7;
                break;
              }

              _context3.t1 = stateMap.gameState.speler1Token;
              _context3.next = 8;
              break;

            case 7:
              _context3.t1 = stateMap.gameState.speler2Token;

            case 8:
              playerId = _context3.t1;

              if (!(playerId === stateMap.playerId)) {
                _context3.next = 14;
                break;
              }

              _context3.next = 12;
              return Game.Data.put("https://jordilb.hbo-ict.org/api/spel/".concat(stateMap.gameToken, "/zet?token=").concat(stateMap.playerId, "&x=").concat(x, "&y=").concat(y));

            case 12:
              _context3.next = 14;
              return _getCurrentGameState();

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function doeZet(_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }(); // Waarde object geretourneerd aan de outer scope


  return {
    init: privateInit,
    doeZet: doeZet
  };
}(apiUrl); //const $ = require("browser-sync");


Game.Data = function () {
  console.log('hallo, vanuit module Data');
  var configMap = {
    mock: [{
      url: 'api/Spel/Beurt',
      data: 0
    }]
  };
  var stateMap = {
    environment: 'production'
  };

  var getMockData = function getMockData(url) {
    var mockData = configMap.mock.find(function (item) {
      return item.url === url;
    });
    return new Promise(function (resolve, reject) {
      resolve(mockData);
    });
  };

  var get = function get(url) {
    if (stateMap.environment === "production") {
      return $.get(url).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    } else if (stateMap.environment === "development") {
      return getMockData(url);
    }
  };

  var put = function put(url) {
    if (stateMap.environment === "production") {
      return new Promise(function (resolve) {
        $.ajax({
          url: url,
          type: 'PUT',
          success: function success(r) {
            resolve(r);
          }
        });
      });
    } else if (stateMap.environment === "development") {
      return getMockData(url);
    }
  };

  var funFact = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return $.get('https://api.aakhilv.me/fun/facts');

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function funFact() {
      return _ref4.apply(this, arguments);
    };
  }();

  var privateInit = function privateInit(url) {
    if (stateMap.environment === "development") {
      return getMockData(url);
    } else if (stateMap.environment === "production") {//doe request aan server
      //xhttp.open("GET", "ajax_info.txt", true);
      //xhttp.send();
    } else {
      throw new Error("de environment is geen development of production");
    }
  };

  return {
    init: privateInit,
    get: get,
    put: put,
    funFact: funFact
  };
}();

Game.Model = function () {
  console.log('hallo, vanuit module Model');

  var privateInit = function privateInit() {
    console.log("private model");
  };

  var getWeather = function getWeather(url) {
    Game.Data.get(url).then(function (data) {
      if (data.main.temp == null) {
        throw new Error("Geen temperatuur");
      }

      console.log(data);
    });
  };

  var _getGameState = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(token) {
      var game;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Game.Data.get("https://jordilb.hbo-ict.org/api/spel/".concat(token));

            case 2:
              game = _context5.sent;
              game.bord = boardToArray(game.bord);
              return _context5.abrupt("return", game);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function _getGameState(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  function boardToArray(board) {
    var arrayBoard = [];

    for (var i = 0; i < 8; i++) {
      arrayBoard.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    for (var position in board) {
      var color = board[position];
      var positions = position.split(",");
      arrayBoard[positions[0]][positions[1]] = color;
    }

    return arrayBoard;
  }

  return {
    init: privateInit,
    weather: getWeather,
    getGameState: _getGameState
  };
}();

Game.Reversi = function () {
  console.log('hallo, vanuit module Reversi');
  var configMap;

  var privateInit = function privateInit() {
    console.log("private spel");
  };

  var showBoard = function showBoard(bord) {
    var board = document.querySelector(".board");
    board.innerHTML = Game.Template.parseTemplate("reversi.board", {
      board: bord
    });

    var _loop = function _loop(y) {
      var _loop2 = function _loop2(x) {
        var square = document.querySelector(".board-row-y-".concat(y, ".board-row-x-").concat(x));
        square.addEventListener("click", function (evt) {
          if (square.children.length > 0) return;
          Game.doeZet(x, y);
        });
      };

      for (var x = 0; x < 8; x++) {
        _loop2(x);
      }
    };

    for (var y = 0; y < 8; y++) {
      _loop(y);
    }
  };

  var showFiche = function showFiche(x, y, color) {
    var square = document.querySelector(".board-row-y-".concat(y, ".board-row-x-").concat(x));
    var fiche = document.createElement("div");
    fiche.classList.add("fade-in");
    fiche.classList.add("fiche-".concat(color));
    square.innerHTML = '';
    square.append(fiche);
  };

  return {
    init: privateInit,
    showBoard: showBoard,
    showFiche: showFiche
  };
}();

var FeedbackWidget = /*#__PURE__*/function () {
  function FeedbackWidget(elementId) {
    _classCallCheck(this, FeedbackWidget);

    _defineProperty(this, "count", 1);

    this._elementId = elementId;
  }

  _createClass(FeedbackWidget, [{
    key: "elementId",
    get: function get() {
      //getter, set keyword voor setter methode
      return this._elementId;
    }
  }, {
    key: "show",
    value: function show(message, type) {
      var x = document.getElementById(this._elementId);
      x.style.display = "block";
      $(x).text(message);

      if (type === "danger") {
        $(x).addClass('alert alert-danger');
        $(x).removeClass('alert alert-success');
      } else if (type === "success") {
        $(x).addClass('alert alert-success');
        $(x).removeClass('alert alert-danger');
      }

      var msg = {
        message: message,
        type: type
      };
      this.log(msg);
      console.log(this.history());
    }
  }, {
    key: "hide",
    value: function hide() {
      var x = document.getElementById(this._elementId);
      x.style.display = "none";
    }
  }, {
    key: "log",
    value: function log(message) {
      {
        var lowestInt = this.count - 10;

        if (localStorage.length >= 10) {
          localStorage.removeItem('feedback_widget' + lowestInt);
          console.log("boven de 10");
        }

        localStorage.setItem('feedback_widget' + this.count, JSON.stringify(message));
        this.count++;
      }
    }
  }, {
    key: "removelog",
    value: function removelog() {
      var lowestInt = this.count - 10;
      var i;

      for (i = lowestInt; i < this.count; i++) {
        localStorage.removeItem('feedback_widget' + i);
      }

      for (i = 0; i < 10; i++) {
        localStorage.removeItem('feedback_widget' + i);
      }
    }
  }, {
    key: "history",
    value: function history() {
      var storage = [];
      var lowestInt = this.count - localStorage.length;
      var i;

      for (i = lowestInt; i < this.count; i++) {
        storage.push(JSON.parse(localStorage.getItem('feedback_widget' + i)));
      }

      var stringbuild = "";

      for (i = 0; i < storage.length; i++) {
        stringbuild += storage[i].type + " - " + storage[i].message + "\n";
      }

      return stringbuild;
    }
  }]);

  return FeedbackWidget;
}();

Game.Api = function () {
  function privateInit() {
    return _privateInit.apply(this, arguments);
  }

  function _privateInit() {
    _privateInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var place, fact;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              place = document.getElementById('funFact');
              _context6.next = 3;
              return funFact();

            case 3:
              fact = _context6.sent;
              place.innerHTML = Game.Template.parseTemplate("api.funFact", {
                fact: fact
              });

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _privateInit.apply(this, arguments);
  }

  function funFact() {
    return _funFact.apply(this, arguments);
  }

  function _funFact() {
    _funFact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return Game.Data.funFact();

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return _funFact.apply(this, arguments);
  }

  return {
    init: privateInit,
    funFact: funFact
  };
}();

Game.Stats = function () {
  var stateMap = {
    myChart: null,
    player1: [],
    player2: []
  };

  function privateInit() {
    var _stateMap$myChart;

    var ctx = $('#myChart');
    (_stateMap$myChart = stateMap.myChart) === null || _stateMap$myChart === void 0 ? void 0 : _stateMap$myChart.destroy();
    stateMap.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stateMap.player1.map(function (value, index) {
          return index + 1;
        }),
        datasets: [{
          label: 'Wit',
          data: stateMap.player1,
          fill: false,
          borderColor: 'rgb(255,255,255)',
          tension: 0.1
        }, {
          label: 'Rood',
          data: stateMap.player2,
          fill: false,
          borderColor: 'rgb(255,0,0)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            color: 'rgb(255,255,255)',
            grid: {
              color: 'rgb(255,255,255)'
            },
            title: {
              color: 'rgb(255,255,255)'
            }
          },
          x: {
            color: 'rgb(255,255,255)',
            grid: {
              color: 'rgb(255,255,255)'
            },
            title: {
              color: 'rgb(255,255,255)'
            }
          }
        }
      }
    });
  }

  function updateChart(data) {
    var player1 = data.map(function (v) {
      return v.filter(function (l) {
        return l === 1;
      }).length;
    }).reduce(function (i1, i2) {
      return i1 + i2;
    });
    var player2 = data.map(function (v) {
      return v.filter(function (l) {
        return l === 2;
      }).length;
    }).reduce(function (i1, i2) {
      return i1 + i2;
    });
    stateMap.player1.push(player1);
    stateMap.player2.push(player2);
    privateInit();
  }

  return {
    init: privateInit,
    updateChart: updateChart
  };
}();

Game.Template = function () {
  function getTemplate(templateName) {
    var templates = spa_templates.templates;

    var _iterator = _createForOfIteratorHelper(templateName.split(".")),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var t = _step.value;
        templates = templates[t];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return templates;
  }

  function parseTemplate(templateName, data) {
    return getTemplate(templateName)(data);
  }

  function _init() {
    Handlebars.registerHelper('ifeq', function (a, b, options) {
      if (a === b) {
        return options.fn(this);
      }

      return options.inverse(this);
    });
    Handlebars.registerHelper('ifnoteq', function (a, b, options) {
      if (a !== b) {
        return options.fn(this);
      }

      return options.inverse(this);
    });
  }

  return {
    init: _init,
    getTemplate: getTemplate,
    parseTemplate: parseTemplate
  };
}();