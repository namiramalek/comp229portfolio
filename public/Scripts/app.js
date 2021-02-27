/* COMP229,Namirabanu Malek,301178112,10 feb 2021 */
//IIFE : Immediately Invoked Function Expression
(function()
{
    function Start()
    {
        console.log("App started..");

        let deleteButtons = document.querySelectorAll('.btn-danger')
        
        for(button of deleteButtons)
        {
            button.addEventListener('click',(event)=>{

              if(!confirm("Are you sure?")){
                  event.preventDefault();
                  window.location.assign('/business-contact-list');
              }  

            });
        }
    }

    window.addEventListener("load", Start);
})();