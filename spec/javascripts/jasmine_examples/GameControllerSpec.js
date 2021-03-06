describe("GameController", function() {
  describe("#initialize", function() {
    gameData = {colors: ["#FFFFFF", "#FFFFF0", "#FFFFF1", "#FFFFF2" ], sounds: ["/assets/1.mp3", "/assets/2.mp3", "/assets/3.mp3", "/assets/4.mp3"], positions: [1, 2, 3, 4]} ;
    var applicationController = new ApplicationController('#game-section')
    var gameController =  new GameController(2, "single", '#game-section', applicationController);
      it("creates a new GameController instance", function(){
        expect(gameController).toBeDefined();
      });

      it("creates a new GameController with the set number of rounds and game mode", function(){
        expect(gameController.n).toEqual(2);
        expect(gameController.gameMode).toEqual('single');
      });

      it("assigns applicationController as its delegate", function(){
        expect(gameController.delegate).toEqual(applicationController);
      });

      it("when a new GameController is instantiated it creates a new intance of GameModel", function(){
        expect(gameController.gameModel).toBeDefined();
      });

      it("when a new GameController is instantiated it creates a new intance of GameModel, which has n + 20 number of rounds", function(){
        expect(gameController.gameModel.rounds.length).toEqual(22);
      });

      it("when a new GameController is instantiated it creates a new intance of GameModel, which has n rounds with the attributes prescribed by the Game Mode Type", function(){
        expect(gameController.gameModel.rounds[0].color).toBeDefined();
        expect(gameController.gameModel.rounds[0].sound).toBeDefined();
      });

      it("when a new GameController is instantiated it creates a new intance of SoundBuilder", function(){
        expect(gameController.soundBuilder).toBeDefined();
      });

       it("when a new GameController is instantiated it creates a new intance of RoundView", function(){
        expect(gameController.roundView).toBeDefined();
      });

  });

  describe("#fetchGameStructure", function(){
      it("when gameMode is 'single' it only fetches position attributes", function(){
      gameData = {colors: ["#FFFFFF", "#FFFFF0", "#FFFFF1", "#FFFFF2" ], sounds: ["/assets/1.mp3", "/assets/2.mp3", "/assets/3.mp3", "/assets/4.mp3"], positions: [1, 2, 3, 4]} ;
      var applicationController = new ApplicationController('#game-section')
      var gameController =  new GameController(2, "single", '#game-section', applicationController);
      expect(gameController.fetchGameStructure('single')).toEqual({positions: [1, 2, 3, 4]});
      });

      it("when gameMode is 'dual' it fetches position and sound attributes", function(){
      gameData = {colors: ["#FFFFFF", "#FFFFF0", "#FFFFF1", "#FFFFF2" ], sounds: ["/assets/1.mp3", "/assets/2.mp3", "/assets/3.mp3", "/assets/4.mp3"], positions: [1, 2, 3, 4]} ;
      var applicationController = new ApplicationController('#game-section')
      var gameController =  new GameController(2, "single", '#game-section', applicationController);
      expect(gameController.fetchGameStructure('single')).toEqual({positions: [1, 2, 3, 4]});
      });

      it("when gameMode is 'triple' it fetches position and sound attributes", function(){
      gameData = {colors: ["#FFFFFF", "#FFFFF0", "#FFFFF1", "#FFFFF2" ], sounds: ["/assets/1.mp3", "/assets/2.mp3", "/assets/3.mp3", "/assets/4.mp3"], positions: [1, 2, 3, 4]} ;
      var applicationController = new ApplicationController('#game-section')
      var gameController =  new GameController(2, "single", '#game-section', applicationController);
      expect(gameController.fetchGameStructure('single')).toEqual({positions: [1, 2, 3, 4]});
      });

  })

  describe("#initiateGame", function() {
     gameData = {colors: ["#FFFFFF", "#FFFFF0", "#FFFFF1", "#FFFFF2" ], sounds: ["/assets/1.mp3", "/assets/2.mp3", "/assets/3.mp3", "/assets/4.mp3"], positions: [1, 2, 3, 4]} ;
      var applicationController = new ApplicationController('#game-section')
      var gameController =  new GameController(2, "single", '#game-section', applicationController);
    it("calls #constructRound method, which applies RoundView first round data (color, sounds etc)", function(){
      expect(gameController.roundView.constructRound).toBeDefined();
    });

    it("starts #setInterval timer that cycles through rounds", function(){
      expect(gameController.initiateGame).toBeDefined();
      // should access #setInterval...
    });

  })

  describe("#evalGuess", function() {
    gameData = {colors: ["#FFFFFF", "#FFFFF0", "#FFFFF1", "#FFFFF2" ], sounds: ["/assets/1.mp3", "/assets/2.mp3", "/assets/3.mp3", "/assets/4.mp3"], positions: [1, 2, 3, 4]} ;
      var applicationController = new ApplicationController('#game-section')
      var gameController =  new GameController(2, "single", '#game-section', applicationController);
    gameController.currentRound = gameController.gameModel.rounds[3]
    // it('if "e" is pressed, calls #scoreGuess method and evals for color match', function(){
    //   expect(gameController.gameModel.scoreGuess("color", gameController.currentRound )).toBeDefined();
    // });


    it("calls #scoreGuess to score postion, sound and color attributes", function(){
      var round =  new RoundModel(1, {colors: ["#FFFFFF", "#FFFFF0", "#FFFFF1", "#FFFFF2" ], sounds: ["/assets/1.mp3", "/assets/2.mp3", "/assets/3.mp3", "/assets/4.mp3"], positions: [1, 2, 3, 4]})
      expect(round.position).toBeDefined();
      expect(round.sound).toBeDefined();
      expect(round.color).toBeDefined();
    });
  });

});




