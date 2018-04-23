// A simple test to verify a visible window is opened with a title
var Application = require('spectron').Application
var assert = require('assert')


describe('application launch', function () {
  this.timeout(10000)

  before(function () {
    this.app = new Application({
      path: 'c:\\Git_Code\\alm_qot\\electron\\electron-dist\\QoT-win32-ia32\\QoT.exe',
    })
    return this.app.start()
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('wait for window to load', function () {
    return this.app.client.waitForVisible('[aid=host]',10000).then(function (isVisible) {
      assert.equal(isVisible, true)
    })
  })

  it('authentication', function () {
    this.app.client.pause(1000)
    this.app.client.setValue('[aid=host]','16.186.77.33:8080')
    this.app.client.pause(1000)
    this.app.client.setValue('[aid=user]','xxx')
    this.app.client.pause(1000)
    this.app.client.setValue('[aid=password]','xxx')
    this.app.client.pause(1000)
    this.app.client.leftClick('[aid=authentication]')
    return this.app.client.waitForVisible('[aid=login]',10000).then(function (isVisible) {
      assert.equal(isVisible, true)
    })
  })

  it('login', function () {
    this.app.client.click('[aid=login]')
    return this.app.client.waitForVisible('[aid=defect]',10000).then(function (isVisible) {
      assert.equal(isVisible, true)
    })
  })

})



