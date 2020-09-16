//
//  AudioVerseUITests.swift
//  AudioVerseUITests
//
//  Created by Matthew Leffler on 9/15/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import XCTest

class AudioVerseUITests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
      
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() throws {
        // UI tests must launch the application that they test.
        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
      
        let closeButton = app.buttons["login-modal-close"];
        if(closeButton.exists) {
          closeButton.tap();
        }
      
        snapshot("01MainScreen")
      
        app.buttons["discover-tab"].tap()
        snapshot("02DiscoverScreen")
      
        app.buttons["books-tab"].tap()
        snapshot("03BooksScreen")
        
        app.buttons["menu-tab"].tap()
        snapshot("04MenuScreen")

        app.buttons["main-tab"].tap()
        app.otherElements["list-container"].otherElements.element(boundBy: 99).tap() // TODO: nix magic number
        
//        app.otherElements["mini-player"].otherElements.element(boundBy: 3).tap()
        snapshot("05PlayerScreen")

        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testLaunchPerformance() throws {
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, *) {
            // This measures how long it takes to launch your application.
            measure(metrics: [XCTOSSignpostMetric.applicationLaunch]) {
                XCUIApplication().launch()
            }
        }
    }
}
