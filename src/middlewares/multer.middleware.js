const storage = multer.diskStorage(
  {
    //this line sets up where the uploaded file will be saved
    destination: function(req,file,cb){
     cb(null, './public/temp')
    },
    // this line sets up the filenaame of the uploaded file
    filename: function(req,file,cb){
      cb(null, file.originalname)// the file name will be saved as the name of the file on user's computer
    }
  }
)
export const upload=multer({storage});