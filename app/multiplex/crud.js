const Multiplex = require('../model/multiplex');

exports.createshow = async function (req, res) {
    try {
        let newShow = new Multiplex();
        newShow.name = req.body.multiplexname;
        newShow.screens = typeof (req.body.screens) === 'string' ? JSON.parse(req.body.screens) : req.body.screens;
        await newShow.save();
        res.status(200).json({});
    } catch (ex) {
        console.log("Error occurred while creating show info", ex);
        res.status(500).json({ error: "Error occurred while creating show information" });
    }
}

exports.getallshowinfo = async function (req, res) {
    try {
        const sDocs = await Multiplex.find({});
        res.status(200).json({ shows: sDocs });
    } catch (ex) {
        console.log("Error occurred while all show info", ex);
        res.status(500).json({ error: "Error occurred while all show information" });
    }
}

exports.searchshows = async function (req, res) {
    try {
        let searchCretaria = {};
        if (req.body.multiplexname) {
            searchCretaria.name = req.body.multiplexname;
        }
        if (req.body.language) {
            searchCretaria['screens.language'] = req.body.language;
        }
        if (req.body.visualization) {
            searchCretaria['screens.visualization'] = req.body.visualization;
        }

        const info = await Multiplex.aggregate([
            { $match: searchCretaria },
            { $unwind: '$screens.showtiming' },
            { $match: { $and: [{ 'screens.showtimg': { $gte: req.body.timning } }, { 'screens.showtimg': { $lte: req.body.timning } }] } }
        ]).toArray();
        res.status(200).json({ showinfo: info });
    } catch (ex) {
        console.log("Error occurred while search show ", ex);
        res.status(500).json({ error: "Error occurred while search show" });
    }
}

exports.updateshow = async function (req, res) {
    try {
        const parsedScreens = typeof (req.body.screens) === 'string' ? JSON.parse(req.body.screens) : req.body.screens;
        const upDoc = await Multiplex.findByIdAndUpdate(req.body.multiplexid, { $set: { screens: parsedScreens, name: req.body.multiplexname } }, { new: true });
        res.status(200).json({ updatedinfo: upDoc });
    } catch (ex) {
        console.log("Error occurred while updating show info", ex);
        res.status(500).json({ error: "Error occurred while updating show information" });
    }
}

exports.removeshow = async function (req, res) {
    try {
        console.log(JSON.parse(req.body.multiplexids));
        await Multiplex.deleteMany({ _id: { $in: typeof (req.body.multiplexids) === 'string' ? JSON.parse(req.body.multiplexids) : req.body.multiplexids } })
        res.status(200).json({});
    } catch (ex) {
        console.log("Error occurred while removing show info", ex);
        res.status(500).json({ error: "Error occurred while removing show information" });
    }
}