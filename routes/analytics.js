const express = require('express');
const Analytics = require('../models/analytics');

function router(app) {
	app.post('/metrics', (req, res) => {
		const data = req.body

		if (!data.url && !data.date) {
			return res.status(400).send({
				message: "URL or date is missing!",
			})
		}
		console.log("req.body", data)
		Analytics.create(data)
			.then((success) => {
				res.status(200).send({
					message: "Success",
				})
			})
			.catch((error) => {
				res.status(500).send({
					message: error.message
				})
			})
	});

	app.get('/metrics', (req, res) => {
		const startDate = req.query.startDate
		const endDate = req.query.endDate
		let filter = {}
		if (startDate && endDate) {		
			filter = { date : { $gt :  startDate, $lt : endDate}}
		}
		const findDates = async () => {
			return await Analytics.find(filter).exec().then((query) => {
				return query
			})
		}
		
		findDates().then((resp) => {
			let metrics = []
			console.log("resp", resp)
			resp.forEach((val) => {
				metrics.push({
					id: val._id,
					url: val.url,
					date: val.date,
					ttfb: val.ttfb,
					fcp: val.fcp,
					domLoad: val.domLoad,
					windowLoad: val.windowLoad,
				})
			})
			res.status(200).send({
				metrics
			})
		})
	});

	app.get('/', (req, res) => {
		return res.status(200).send({
			message: "Connected to the API"
		})
	});
}

module.exports = router;