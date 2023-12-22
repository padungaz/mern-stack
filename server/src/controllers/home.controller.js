
const getHomepage = (req, res) => {
    res.render('test.ejs')
}


const getTest = (req, res) => {
    res.send('#24. Áp dụng mô hình MVC với Node.js (Part 1) | Node.JS (SQL/MongoDB) Cho Beginners')
}

module.exports = {
    getHomepage, getTest
};
