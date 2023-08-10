import React, { useEffect, useState } from "react";
import '../nav.css';

function Nav() {
    const [show, setShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 330) {
                setShow(true);
            } else setShow(false);
        });
    },[])
    return (
        <>
            <div className={`nav ${show && "nav_black"}`}>
                <img className="nav_logo" src="../../pngwing.com.png" />
                <img className="nav_avatar" src="../../Netflix-avatar.png" />
            </div>
        </>
    )
}
export default Nav;