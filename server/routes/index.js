const express = require('express')

const CONSTANTS = require('../constants')

const sampleData = require('../sampleData')

const { Pool, Client } = require('pg')
const connectionString = 'postgres://stint:uylYiPTLBFJp5ybwqBgPq5WMTdkWh3gy@dpg-ca0dpnf9re0tac78ed30-a.singapore-postgres.render.com/stint';

const pool = new Pool({
  connectionString,
})




const router = express.Router()
// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
  res.json(sampleData.textAssets)
})

// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
  res.json(sampleData.textAssets)
})

router.post(CONSTANTS.ENDPOINT.POSTSESSIONRECORDING, (req, res) => {
  //console.log('--req: ', req.body.events)
  console.log('---called0---')
  pool.query('SELECT NOW()', (err, res) => {
    console.log('--err--', err)
    console.log('--res--', res)
    pool.end()
  })
  res.json("{}")
})

router.get("/test", (req, res) => {
  res.json('{"a":"b"}')
})


module.exports = router
