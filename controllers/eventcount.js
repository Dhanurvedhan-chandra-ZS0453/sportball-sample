const db = require("../models");
const programs = db.programs;
const countries = db.countries;
const states = db.states;
const cities = db.cities;
const seasons = db.seasons;

module.exports = {
    eventCount: async (req, res) => {
        const { country, season, city, state, dob } = req.query;
        // console.log(country);
        // console.log(season);
        // console.log(city);
        let whereClause = {};
        let includeClause = [];
        
        if (country) {
            includeClause.push({
                model: countries,
                attributes: ['country_name'],
                where: { country_name: country } 
            });
        }
        if (season) {
            includeClause.push({
                model: seasons,
                attributes: ['season_name'],
                where: { season_name: season } 
            });
        }
        if (city) {
            includeClause.push({
                model: cities,
                attributes: ['city_name'],
                where: { city_name: city } 
            });
        }

        if (state) {
            includeClause.push({
                model: states,
                attributes: ['state_name'],
                where: { state_name: state } 
            });
        }

        try {
            const filteredPrograms = await programs.findAll({
                attributes : ['id', 'program_name', 'program_image', 'program_season', 'program_duration'],
                where: whereClause,
                include: includeClause
            });
            const totalCount = await programs.count({
                where: whereClause,
                include: includeClause
            });

            if (filteredPrograms.length > 0) {
                res.status(200).json({
                    message: "Fetched programs with filters",
                    programs: filteredPrograms,
                    count: totalCount
                });
            } else {
                res.status(404).json({
                    message: "No programs found matching the criteria"
                });
            }
        } catch (error) {
            console.error("Error fetching programs:", error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
};
