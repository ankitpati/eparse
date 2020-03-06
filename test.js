const { Application } = require('spectron');
const { strictEqual } = require('assert');
const path = require('path');

const app = new Application({
    path: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    args: [path.join(__dirname, '.')]
});

let longUrl = 'https://reverse.geocoder.ls.hereapi.com/6.2/' +
              'reversegeocode.json?prox=41.8839%2C-87.6389%2C150&' +
              'mode=retrieveAddresses&maxresults=1&additionaldata=' +
              'IncludeShapeLevel%2CpostalCode&gen=9&apiKey=' +
              'H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs';
let expectedHostname = 'reverse.geocoder.ls.hereapi.com';

app.start().then(
    ()           => { return app.client.getTitle();                }).then(
    (page_title) => { strictEqual(page_title, 'G-Parse');          }).catch(
    (error)      => { console.error('Test failed', error.message); }).then(
    ()           => { return app.client.getText('.brand-logo');    }).then(
    (brand_logo) => { strictEqual(brand_logo, 'G-Parse');          }).catch(
    (error)      => { console.error('Test failed', error.message); }).then(
    async ()     => { await app.client.setValue('//*[@id="url"]', longUrl); }).then(
    ()           => { app.client.click('//*[@id="submit"]');       }).then(
    async ()     => { await app.client.waitUntilTextExists('//*[@id="hostname"]', expectedHostname); }).then(
    ()           => { return app.client.getText('//*[@id="hostname"]'); }).then(
    (hostname)   => { strictEqual(hostname, expectedHostname);     }).catch(
    (error)      => { console.error('Test failed', error.message); }).finally(
    ()           => { return app.stop();                           }).finally(
    ()           => { process.exit(0);                             });
