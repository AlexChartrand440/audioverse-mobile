# AudioVerse Mobile

This is the repository for the next-generation iOS and Android apps for AudioVerse in React Native.

AudioVerse is a website dedicated to spreading God's word through free sermon audio and much more. If you would like to 
learn more about AudioVerse please visit [https://audioverse.org](https://audioverse.org).

You can download our apps from the [App Store](https://itunes.apple.com/us/app/audioverse/id726998810?mt=8) or 
[Google Play Store](https://play.google.com/store/apps/details?id=org.audioverse.exodus) or build them yourself using 
this repository. For Android you can also get the latest version 
[here](https://github.com/AVORG/audioverse-mobile/releases).

<img src="https://github.com/AVORG/audioverse-mobile/blob/master/screenshots/AudioVerse%20App.gif?raw=true">

# How to contribute

## Contributing

- Report bugs by filing a [GitHub issue](https://github.com/avorg/audioverse-mobile/issues)
- Make feature requests by filing a [GitHub issue](https://github.com/avorg/audioverse-mobile/issues)
- Find a [GitHub issue](https://github.com/avorg/audioverse-mobile/issues) to work on and leave a comment to let other
  people know you're working on it

## Development

### Usage

Complete first-time setup before running these commands.

1. Start Metro Bundler: `npm start` or `docker-compose up`
1. Open [http://localhost:8081/debugger-ui/](http://localhost:8081/debugger-ui/) in Chrome on host machine, and open
   Chrome console
1. Check that the bundler has finished starting up by visiting [localhost:8081](http://localhost:8081/) 
   in another tab
1. `react-native run-android` or `react-native run-ios`

### First-time setup

1. Ensure you have react-native installed locally
1. Ensure you have npm and/or Docker installed locally
1. `git clone` this repo
1. Install Node dependencies: `npm install` or `docker-compose run --rm node npm install`
1. Setup your [Firebase project](https://console.firebase.google.com/)
1. Email technical@audioverse.org to request a .env file for API access
1. Place the .env file you receive in the project root

#### Android

1. Install [Android Studio](https://developer.android.com/studio/) (optionally via 
   [JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/))
1. Install an Android SDK via Android Studio, noting its location
1. Add the following line to your shell profile, replacing the path with the location you noted in the previous step: 
   `export ANDROID_SDK_ROOT='/Users/narthur/Library/Android/sdk'`
1. Add the following additional line to your shell profile:
   `export PATH=$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/platform-tools:$PATH`
1. Source your shell profile: `. ~/.bash_profile`
1. [Install a Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) 
   (required for `react-native run-android`) - [avoid version 13](https://github.com/facebook/react-native/issues/26625)
1. Register an Android app in your Firebase project, using the id 'org.audioverse.exodus'
1. During the registration process, download the google-services.json file 
   ([reference](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup))
1. Place the google-services.json file in the android/app directory
1. Create an AVD (Android Virtual Device) from Android Studio

#### iOS

1. Install [Xcode](https://developer.apple.com/xcode/)
1. Install [Cocoapods](https://cocoapods.org/): `sudo gem install cocoapods` or `brew install cocoapods`
1. Install Cocoapods dependencies: `cd ios && pod install`
1. Register an iOS app in your Firebase project, using the id 'org.audioverse.mobile'
1. During the registration process, download the GoogleService-Info.plist file 
   ([reference](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup))
1. Keep the GoogleService-Info.plist file in your ~/Downloads folder

### Debugging

#### error: Multiple commands produce '...'

If you have Xcode >= 11 installed and receive this error when running `react-native run-ios`, you may need to 
[remove the offending assets](https://github.com/oblador/react-native-vector-icons/issues/1074#issuecomment-534027196)
from the list of assets in the "Copy Bundle Resources" [build phase](https://help.apple.com/xcode/mac/10.2/#/dev50bab713d)
from within the Xcode IDE. After doing so, rerun `react-native run-ios`.

#### No bundle URL present.

If you see this error inside the iOS emulator, it means the [Metro Bundler](https://facebook.github.io/metro/) isn't 
accessible inside the emulator. This may be because you forgot to start it. Run either `npm start` or 
`docker-compose up`, check that the bundler has finished starting up by visiting [localhost:8081](http://localhost:8081/) 
in a browser, and then re-run `react-native run-ios`.

#### Runtime is not ready for debugging.

- Confirm that the bundler has finished starting up by visiting [localhost:8081](http://localhost:8081/) in a browser
- Open [http://localhost:8081/debugger-ui/](http://localhost:8081/debugger-ui/) in Chrome on host machine, and open
  Chrome console
- Reload the app by hitting command-R with the emulator focused

## Testing

To run the test suite, run one of the following commands, depending on whether or not you're using Docker:

```bash
npm test
docker-compose run --rm node npm test
```

## Deployment

These instructions are for use by the AudioVerse internal team. To setup a build folder:

1. Android: Copy the av-upload-key.keystore to android/app
1. iOS: Follow the prompts when running Fastlane (`npm run ios:beta`) below.

When deploying a new version:

1. Run `npm ci`
1. Run `cd ios && pod install`
1. Run `npm version patch`
1. Run `npm run ios:beta` and follow the authentication prompts.
1. Run `npm run android:beta`
1. Handle final steps in App Store Connect/Google Play Console.
