const express = require('express');
const Analytics = require('../models/Analytics');



function router(app) {
	app.post('/metrics', (req, res) => {
		let data = req.body

		if (!data.url && !data.date) {
			return res.status(400).send({
				message: "URL or date is missing!",
			})
		}

		const metric = new Analytics({
			url: data.url,
			date: data.date,
			ttfb: data.ttfb,
			fcp: data.fcp,
			domLoad: data.domLoad,
			windowLoad: data.windowLoad
		})

		metric.save()
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

	app.get('/measures', (req, res) => {

		const findDates = async () => {
			return await Analytics.find({
				"date": {
					'$gte': req.query.startDate,
					'$lt': req.query.endDate,
				}
			}).exec().then((query) => {
				return query
			})
		}

		findDates().then((measure) => {
			let measures = []

			measure.forEach((measure) => {
				measures.push({
					id: measure._id,
					url: measure.url,
					date: moment(measure.date).format('lll'),
					ttfb: measure.ttfb,
					fcp: measure.fcp,
					domLoad: measure.domLoad,
					windowLoad: measure.windowLoad,
				})
			})

			res.status(200).send({
				measures
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