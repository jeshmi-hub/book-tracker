const sendEmail = require('../utils/sendEmail');


const scheduleEmail = async({id, email})=>{
    try{
        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: "About returning the book that you have borrowed",
            html: <p>Return book</p>
        }

        await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.html);

    }catch(err){
        throw new Error(err.message);
    }

}
