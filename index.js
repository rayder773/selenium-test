const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const whois = require('whois');

const app = express();
const port = 3000;

const url = 'https://www.ef.com/wwen/english-resources/english-vocabulary/top-3000-words/';
const endPoint = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_C0jIBgJ8EFndw44ugeXbxbOudoewI&domainName='

app.get('/', (req, res) => {
  request(url, async function (error, response, body) {
    if (!error) {
      const $ = cheerio.load(body);
      const list = $('.field-item.even > p:last-child')
        .html()
        .split('\n');

      // whois.lookup('abuse.com', function(err, data) {
      //   console.log('data', /No match for domain/.test(data), data)
      // })

      for(let i = 0; i < list.length; i++) {
        const domain = list[i].replace(/\<br>/g, '') + '.com';

        if (!domain.length) {
          console.log('check length', domain)
        }

        await whois.lookup(domain, function(err, data) {
          if(/No match for domain/.test(data)) {
            console.log('data', domain)
          }
        })

      }
    } else {
      console.log("Произошла ошибка: " + error);
    }
  });

  res.end();
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
