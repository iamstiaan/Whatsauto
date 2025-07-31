# Changelog

## 0.1.0-alpha.2 (2025-07-31)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/iamstiaan/Whatsauto/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **client:** add support for endpoint-specific base URLs ([808b23d](https://github.com/iamstiaan/Whatsauto/commit/808b23df1ce6b2254bec2487fcfe25ac855e74ca))
* **client:** support file upload requests ([777c8d0](https://github.com/iamstiaan/Whatsauto/commit/777c8d00d61a9967dd6bd439bdfc791a3a2f8874))


### Bug Fixes

* **client:** don't send `Content-Type` for bodyless methods ([095e320](https://github.com/iamstiaan/Whatsauto/commit/095e32003711f6453bff6c64782286e32ae7331d))
* publish script — handle NPM errors correctly ([328eb01](https://github.com/iamstiaan/Whatsauto/commit/328eb012e015ab6fd9e2e15d59c1bb260dedb0ab))


### Chores

* change publish docs url ([adb083c](https://github.com/iamstiaan/Whatsauto/commit/adb083c66cbce468e1b456ecaf7afa2210b02241))
* **ci:** enable for pull requests ([767c860](https://github.com/iamstiaan/Whatsauto/commit/767c860b4a00eb212f557c30c4c2910c615f101a))
* **ci:** only run for pushes and fork pull requests ([dde0e05](https://github.com/iamstiaan/Whatsauto/commit/dde0e0537353d34109c7a5b928497de85606166f))
* **docs:** use top-level-await in example snippets ([795566c](https://github.com/iamstiaan/Whatsauto/commit/795566c92c5152f486132fbc4963892752fc6811))
* **internal:** make base APIResource abstract ([75b3c37](https://github.com/iamstiaan/Whatsauto/commit/75b3c37e62d0a9720838937da7f4e98516f1a5da))
* **internal:** remove redundant imports config ([3345980](https://github.com/iamstiaan/Whatsauto/commit/3345980628aeec2068d4fcee55df13539624b16e))
* **internal:** version bump ([c51a107](https://github.com/iamstiaan/Whatsauto/commit/c51a107e7a14445b16bf790c636366aeece78de5))
* make some internal functions async ([1db21f7](https://github.com/iamstiaan/Whatsauto/commit/1db21f74dd8cecdd888305f4134284029d4c1549))
* mention unit type in timeout docs ([b4ef819](https://github.com/iamstiaan/Whatsauto/commit/b4ef81928869384048fc4d226d79e08674f91f48))


### Refactors

* **types:** replace Record with mapped types ([cd2b4b2](https://github.com/iamstiaan/Whatsauto/commit/cd2b4b21b9523acab5c00cd04fd2048d22276fc2))

## 0.1.0-alpha.1 (2024-12-13)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/iamstiaan/Whatsauto/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **internal:** make git install file structure match npm ([#7](https://github.com/iamstiaan/Whatsauto/issues/7)) ([0c9e571](https://github.com/iamstiaan/Whatsauto/commit/0c9e57166268a5f51a12f480a6654cf07989ae4f))


### Chores

* go live ([#2](https://github.com/iamstiaan/Whatsauto/issues/2)) ([5e5ab28](https://github.com/iamstiaan/Whatsauto/commit/5e5ab283510ff0f83c69eeec93be7e4e0c34ee45))
* **internal:** bump cross-spawn to v7.0.6 ([#9](https://github.com/iamstiaan/Whatsauto/issues/9)) ([7964a30](https://github.com/iamstiaan/Whatsauto/commit/7964a3074716a657f6e12929ba861491ee797004))
* **internal:** codegen related update ([#12](https://github.com/iamstiaan/Whatsauto/issues/12)) ([8f0a853](https://github.com/iamstiaan/Whatsauto/commit/8f0a853f478b23ee36e7d44459acc08347b2d309))
* **internal:** remove unnecessary getRequestClient function ([#8](https://github.com/iamstiaan/Whatsauto/issues/8)) ([eae100d](https://github.com/iamstiaan/Whatsauto/commit/eae100da634f793fa8f3d8a82c34f5ac46e93de5))
* **internal:** update isAbsoluteURL ([#11](https://github.com/iamstiaan/Whatsauto/issues/11)) ([31e4566](https://github.com/iamstiaan/Whatsauto/commit/31e45660cdf0272e3caad98e0c3286d732ee627a))
* rebuild project due to codegen change ([#4](https://github.com/iamstiaan/Whatsauto/issues/4)) ([bdfb661](https://github.com/iamstiaan/Whatsauto/commit/bdfb661e6a07d8e55162023bd78adc0cec2a0852))
* remove redundant word in comment ([#6](https://github.com/iamstiaan/Whatsauto/issues/6)) ([b735c0f](https://github.com/iamstiaan/Whatsauto/commit/b735c0f95adb7934ee56c2ff766b32bfd4650e76))
* **types:** nicer error class types + jsdocs ([#10](https://github.com/iamstiaan/Whatsauto/issues/10)) ([15da8b4](https://github.com/iamstiaan/Whatsauto/commit/15da8b4785314a622ff6729cdb60d4d413d2affb))


### Documentation

* remove suggestion to use `npm` call out ([#5](https://github.com/iamstiaan/Whatsauto/issues/5)) ([db34e48](https://github.com/iamstiaan/Whatsauto/commit/db34e48af3778dafe16f6b7b37b7aee5e0b0193f))
