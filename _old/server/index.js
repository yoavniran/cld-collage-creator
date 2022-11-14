const express = require("express"),
	cors = require("cors"),
	app = express(),
	FormData = require("form-data");
// const https = require("https");

const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.post("/collage", function (req, res) {
	const { cloud, preset, collage } = req.body;
	const fd = new FormData();

	console.log("CREATING COLLAGE WITH CLOUDINARY",  req.body);

	fd.append("upload_preset", preset);
	fd.append("public_id", collage.id);
	fd.append("manifest_json", JSON.stringify(collage.manifest));


	fd.submit(`https://api.cloudinary.com/v1_1/${cloud}/image/create_collage`, (err, cldRes) => {
		if (err) {
			console.log("ERROR !!!! ", err);
		} else {
			console.log("GOT CLD STATUS CODE !!!!!! ", cldRes.statusCode);
			console.log("GOT CLD STATUS MSG !!!!!! ", cldRes.statusMessage);
			console.log("GOT CLD STATUS HEADErs !!!!!! ", cldRes.headers);
		}

		const success = !err && cldRes.statusCode === 200;
		res.status(200).json({ success });
	});
});

app.listen(port, function () {
	console.log("server started on PORT: ", port);
});
