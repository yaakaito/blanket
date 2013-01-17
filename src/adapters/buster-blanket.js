(function() {

    if(!buster) {
        throw new Exception("buster library does not exist in global namespace!");
    }

    var blanketRepoter = function(runner) {
        runner.on('test:setUp', function() {
            blanket.setupCoverage();
        });

        runner.on('test:start', function() {
            blanket.onTestStart();
        });

        runner.on('context:start', function() {
            blanket.onModuleStart();
        });

        runner.on('test:success', function() {

            blanket.onTestDone(); //TODO:
        });

        runner.on('test:tearDown', function() {
            blanket.onTestsDone();
        });
    };

    var oldRun = buster.run;
    buster.run = function() {
        buster.log('wating for blanket');
    }
    blanket.beforeStartTestRunner({
        callback : function() {
            oldRun();
            buster.run = oldRun;
        }
    });
})();