let express=require('express');
let router=express.Router();
let mongoose=require('mongoose');

//create a reference to model
let BusinessContact= require('../models/bcontact');

module.exports.displayBusinessContactList = (req,res,next) =>{
    BusinessContact.find((err, bcontactList) =>{
if(err)
{
     return console.error(err);
}
else {
    res.render('businessContact/list',{title: 'Business Contact List',BusinessContactList: bcontactList, displayName: req.user ? req.user.displayName: ''})
}
 }).sort({Contact_name:1});
}

module.exports.displayAddPage= (req,res,next)=>{
    res.render('businessContact/add',{title: 'Add Business Contact List',
     displayName: req.user ? req.user.displayName: ''})
}

module.exports.processAddPage=(req,res,next)=>{
    let newBusinessContact =BusinessContact({
        "Contact_name":req.body.Contact_name,
        "Contact_number":req.body.Contact_number,
        "Email":req.body.Email
    });
   
    BusinessContact.create(newBusinessContact, (err, newBusinessContact)=>{
            if(err){
                console.log(err);
                res.end(err);
            }
            else
            {
                //refresh the business list
                res.redirect('/business-contact-list');
            }
        });
}

module.exports.displayEditPage=(req,res,next)=>{
    let id=req.params.id;

    BusinessContact.findById(id,(err,contactToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit view
            
            res.render('businessContact/edit', {title: 'Edit Business contact', contacts: contactToEdit, displayName: req.user ? req.user.displayName: ''});
        }
    });


}

module.exports.processEditPage=(req,res,next)=>{
    let id=req.params.id

    let updatedContact=   BusinessContact({
        "_id":id,
        "Contact_name":req.body.Contact_name,
        "Contact_number":req.body.Contact_number,
        "Email":req.body.Email
    }); 
    BusinessContact.updateOne({_id: id}, updatedContact,(err)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //show edit view
        res.redirect('/business-contact-list');
    }
 });

}

module.exports.performDeletePage=(req,res,next)=>{
    let id=req.params.id;

    BusinessContact.remove({_id: id},(err)=>{
        if(err)
        {
            consolelog(err);
            res.end(err);
        }
        else 
        {
            //refresh buisness contact list
            res.redirect('/business-contact-list');
        }
    });
}