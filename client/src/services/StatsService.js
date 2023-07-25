import $api from '../http/index';
import moment from "moment";

const fetchDayUsers = async () => {
    const startOfWeek = moment().startOf('day').format('YYYY-MM-DD');
    const endOfWeek = moment().startOf('day').add(1, 'day').format('YYYY-MM-DD');
    return await $api
        .post("/users", {
            "startDate": `${startOfWeek}`,
            "endDate": `${endOfWeek}`
        }, { headers: {
                "Content-Type": "application/json",
            },})
        .then((response) => {
            return response.data.length
        });
};

const fetchWeakUsers = async () => {
    const startOfWeek = moment().startOf('month').format('YYYY-MM-DD');
    const endOfWeek = moment().endOf('month').format('YYYY-MM-DD');
    return await $api
        .post("/users", {
            "startDate": `${startOfWeek}`,
            "endDate": `${endOfWeek}`
        }, { headers: {
                "Content-Type": "application/json",
            },})
        .then((response) => {
            return response.data.length
        });
};

const fetchYearUsers = async () => {
    const startOfWeek = moment().startOf('year').format('YYYY-MM-DD');
    const endOfWeek = moment().endOf('year').format('YYYY-MM-DD');
    return await $api
        .post("/users", {
            "startDate": `${startOfWeek}`,
            "endDate": `${endOfWeek}`
        }, { headers: {
                "Content-Type": "application/json",
            },})
        .then((response) => {
            return response.data.length
        });
};

const fetchAllUsers = async () => {
    return await $api
        .post("/users", {
            "startDate": "1970-05-30",
            "endDate": "2100-01-01"
        }, { headers: {
                "Content-Type": "application/json",
            },})
        .then((response) => {
            return response.data.length
        });
};

const fetchPatternsByLikes = async () => {
    return await $api
        .get("/patterns_by_likes", )
        .then((response) => {
            return response.data
        });
};


const fetchPatternsByUses = async () => {
    return await $api
        .get("/patterns_by_uses", )
        .then((response) => {
            return response.data
        });
};
const StatsService = {
    fetchDayUsers,
    fetchWeakUsers,
    fetchYearUsers,
    fetchAllUsers,
    fetchPatternsByLikes,
    fetchPatternsByUses
};

export default StatsService;