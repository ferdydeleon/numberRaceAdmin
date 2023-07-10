var today = new Date();
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
var dd = String(today.getDate()).padStart(2, "0");
var star = yyyy + "-" + mm + "-" + dd;
var end = yyyy + "-" + mm + "-" + dd;

const getdate = {
    start: star,
    end: end,
}

export default getdate;