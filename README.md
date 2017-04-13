# A-Frame Machinima Testing

Machinima testing is the process of playing back motion-captured user
interactions in an automated testing enviroment. This repo includes all of
the configuration required to add machinima testing to your A-Frame WebVR 
development workflow using the 
[aframe-motion-capture-components](https://github.com/dmarcos/aframe-motion-capture-components)
in a [Karma](https://karma-runner.github.io/1.0/index.html)/[Mocha](https://mochajs.org/) 
testing framework.

## Workflow

1. Create an HTML A-Frame scene for testing in `machinima_testing/scenes/` 
2. `npm run record` to serve the scene
3. Press spacebar to start recording
4. Perform user actions with your HMD and tracked controllers
5. Press spacebar to end the recording
6. Save the json recording file to `machinima_testing/recordings/`
7. Write a test suite that points to the scene and recording files
8. `npm run test:machinima` to replay the recording and run tests on the results

## Injecting the scene into the test environment

The `setup` function in the example test file in this repo will read the
`a-scene` from your test scene file, modify it to play back your recording, 
and inject it into the Karma test environment. All you need to do is specify 
the filenames for the scene and recording files you want to use in the suite
in the global variables at the top of the file.

<strong>Including components and Dependencies:</strong> As the script only
injects the `a-scene` element and its contents, `script` tags in the `head` or
`body` will not be avialable in the testing environment. Rather than linking
to scripts, `require` the components and depenencies you need in `tests/main.js`, 
and they will be available both when recording and when testing. 

## Important settings

Here are the key configuration options that make this work:

### karma.conf.js

* browserNoActivityTimeout: set longer than your longest recording to prevent
  Karma from abandoning the browser
* files: inlcude the scenes and serve the recordings
* preprocessors: use html2js to make the scene files available as a string in test setup

### *.test.js

* this.timeout(0): set longer than your longest recording to prevent Mocha from abandoning
  the test (or 0 for no timeout)
* this.scene.addEventListener: listen for the 'replayingstopped' event to run assertions 
  on the state at the end of the recording. Make sure to set `once: true` because this
  event is emitted multiple times and will break your cleanup otherwise. 

### __init.test.js

* setup: Leave the A-Frame render loop intact
* teardown: set `scene-replayer.isReplaying = false` to help with cleanup

### package.json

* scipts: record and test:machina