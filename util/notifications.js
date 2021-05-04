

const notify = (req,res)=>{
  let desc = encodeURIComponent(req.body.description);
  let title  = encodeURIComponent(req.body.title);
  let date = encodeURIComponent(req.body.date);
  res.redirect(`http://localhost:3000/?desc=${desc}&title=${title}&date=${date}#/notification/`);
};

module.exports = {notify}