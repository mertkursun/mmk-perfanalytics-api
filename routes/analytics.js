const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

router.post('/metrics', (req, res) => {
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
				message: error.message || "Some error occurred while saving data."
			})
		})
});

router.get('/measures', (req, res) => {
	let startDate = req.query.startDate
	let endDate = req.query.endDate

	const findMetricsWithDates = async () => {
		return await PerfanalyticsModel.find({
			"date": {
				'$gte': startDate,
				'$lt': endDate,
			}
		}).exec().then((query) => {
			return query
		})
	}

	findMetricsWithDates().then((measure) => {
		let measures = []

		measure.forEach((measure) => {
			measures.push({
				_id: measure._id,
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

router.get('/', (req, res) => {
	return res.status(200).send({
		message: "Connected to the Perfanalytics API. Created by MMK"
	})
});

module.exports = router;