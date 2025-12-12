import imagekit from "../utils/imageKit.js";

export const getAuthParams = (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.json(authParams);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadImage = async (req,res)=>{
    try {
        const {folderName} = req.body;
        if(!req.file){
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const result = await imagekit.upload({
            file:req.file.buffer.toString("base64"),
            fileName:req.file.originalname,
            folder:`/quizHub/courses/${folderName}`
        });

        res.status(201).json({
            success:true,
            url:result.url,
            fileId:result.fileId
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
