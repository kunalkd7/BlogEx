const blogmodel = require('../../models/blogmodel')
const formidable = require('formidable'); //to save image on server
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

exports.createblog = function (req, res, next) {
   const form = formidable({ multiples: true });

   form.parse(req, async (err, fields, files) => {

      //when we not send any image then the image key will includes in fields instead of files

      const { title, body, description, slug, username, userid } = fields;

      const errors = [];

      if (title.trim() === '') {
         errors.push({ msg: "Title Required" })
      }
      if (body.trim() === '') {
         errors.push({ msg: "Body Required" })
      }
      if (description.trim() === '') {
         errors.push({ msg: "Description Required" })
      }

      if (slug.trim() === '') {
         errors.push({ msg: "Slug Required" })
      } else {
         const data = await blogmodel.findOne({ slug: slug })
            .then(data => {
               if (data) {
                  errors.push({ msg: "Please Try Different URl" })
               }
            }).catch(err => { })
      }

      if (Object.keys(files).length === 0) { // not files.image cz image will go to fields if its empty
         errors.push({ msg: "Image Required" })
      } else {
         const split = files.image.type.split('/')
         const ext = split[1].toLowerCase();

         if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {

            if (errors.length === 0) {
               files.image.name = uuidv4() + '.' + ext;
               const newpath = __dirname + `/../../../frontend/public/images/${files.image.name}`;

               fs.copyFile(files.image.path, newpath, (err) => {
                  if (!err) {
                     console.log("uploaded")
                  }
               })
            }

         } else {
            errors.push({ msg: "please upload jpg, jpeg or png images only" })
         }
      }

      if (errors.length > 0) {
         res.status(400).json({ "errors": errors })
      } else {
         // res.json({ fields, files })
         const newblog = new blogmodel({
            title: title,
            body: body,
            description: description,
            slug: slug,
            username: username,
            userid: userid,
            image: files.image.name
         })

         newblog.save()
            .then(data => {
               res.status(200).json({
                  msg: "blog created successfully",
                  // blog: data
               })
            })
            .catch(err => { res.status(500).json({ errors: [{ msg: "Server Error" }] }) })  //mongo db schema validation error 
      }

   });
};

exports.getuserblogs = function (req, res, next) {
   const user = req.params.name;

   blogmodel.find({ username: req.params.name }).then(data => {
         res.status(200).json({ blogs: data })
   }).catch(err => { res.status(500).json(err) }) //if there's err in response above
}

exports.getallblogs = function (req, res, next) {
   blogmodel.find({}).then(data => {
      // if (data.length > 0) {
      //    res.status(200).json({ blogs: data })
      // } else {
      //    res.status(400).json({ msg: "No Blogs Yet" })
      // }
      res.status(200).json({blogs : data })
   }).catch(err => { res.status(500).json(err) }) //if there's err in response above
}

exports.getblogview = function (req, res, next) {
   const slug = req.params.slug;

   blogmodel.find({ slug: slug }).then(data => {
      if (data.length > 0) {
         res.status(200).json({ blogs: data })
      } else {
         res.status(400).json({ msg: "No Blog Found" })
      }
   }).catch(err => { res.status(500).json(err) }) //if there's err in response above
}

exports.deleteblog = function (req, res, next) {
   const id = req.params.id;
   
   blogmodel.findByIdAndDelete(id).then(data => {
      res.status(200).json({ msg: "successfully deleted" })
   }).catch(err => { res.status(400).json(err) })
}