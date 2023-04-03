// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import request from 'request';

const FEED_URL = "https://www.essentiallysports.com/feed/";

export default function handler(req, res) {
	return new Promise((resolve, reject) => {
		request(FEED_URL, (err, resp, body) => {
			if (err === null) {
				res.setHeader('Content-Type', 'application/xml');
				res.status(200).end(body);
			}
			else {
				res.status(500).end();
			}
			resolve();
		});
	});
}
