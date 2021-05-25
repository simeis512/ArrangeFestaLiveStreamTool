'use strict'

const os = require('os')
const fs = require('fs')
const path = require('path')

const axios = require('axios')

const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const pug = require('pug')

/* const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const compiler = webpack(webpackConfig) */

const WebSocketServer = require('ws').Server


const dataPath = './data.json'
let data;

try {
  fs.statSync(dataPath)
  data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
} catch (error) {
  data = {
    members: [],
    currentMemberId: 0,
    showingItems: []
  }
}

const app = express()

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html', 'png', 'jpg', 'gif'] }))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'pug')

/*app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}))
app.use(require("webpack-hot-middleware")(compiler)) */

// トップページ
app.get('/', (req, res, next) => {
  console.log('/')
  res.render('index')
})

app.get('/viewer', (req, res, next) => {
  console.log('/viewer')
  res.render('viewer')
})

app.listen(8080, () => {
  console.log('Server start')
})


const editorWss = new WebSocketServer({ port: 8881 });
const viewerWss = new WebSocketServer({ port: 8882 });

let viewerConnections = []

editorWss.on('connection', (ws) => {
  ws.on('close', () => {

  })

  ws.on('message', (msg) => {
    data = JSON.parse(msg)
    viewerConnections.forEach((viewerConnection) => {
      viewerConnection.send(getSendDataString())
    })
    saveData()
  })

  ws.send(JSON.stringify(data))
})

viewerWss.on('connection', (ws) => {
  viewerConnections.push(ws)

  ws.on('close', () => {
    viewerConnections = viewerConnections.filter((conn) => !(conn === ws))
  })

  ws.send(getSendDataString())
})

function getSendData()
{
  const index = idToIndex(data.currentMemberId)
  const originalMember = index !== -1 ? data.members[index] : { original: {} }
  const arrangeIndex = index !== -1 ? idToIndex(originalMember.arrangeId) : null
  const arrangeMember = index !== -1 ? data.members[arrangeIndex] : { arrange: {} }
  return {
    originalMember,
    arrangeMember,
    showingItems: data.showingItems
  }
}

function getSendDataString()
{
  return JSON.stringify(getSendData())
}


function idToIndex(id)
{
  return data.members.findIndex((member) => member.id === id)
}

function saveData()
{
  fs.writeFile(dataPath, JSON.stringify(data), (err) => {
    if (err) {
      console.log('データ保存失敗')
    } else {
      console.log('データ保存完了')
    }
  })
}
