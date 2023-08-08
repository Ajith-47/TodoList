import React from "react"
import './styles.css'


function Footers(){
    function getYear(){
        var d=new Date();

        return d.getFullYear();
    }
    return(
        <footer className="footers">
            
        
        <div>
        <p>Made in India</p>

            <a href="https://www.linkedin.com/in/ajith-kumar-2b327727a/"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://www.instagram.com/iamak2002/"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/ajith-kumar-2b327727a/"><i height="40px" class="fa-brands fa-linkedin"></i></a>
            
        <p>&copy; Ajith Kumar {getYear()}</p>

        </div>            

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </footer>
    )
}

export default Footers