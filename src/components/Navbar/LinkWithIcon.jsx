import React, { useEffect } from 'react'
import './LinkWithIcon.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../Services/userServices'

const LinkWithIcon = ({title, link, emoji, sidebar}) => {
  const user = getUser();

  return (   
 
      <NavLink to={link} className={sidebar ? "align_center sidebar_link" : "align_center"}>
          {title}
          <img src={emoji} alt="" className="link_emoji" />
      </NavLink>
   
  )
}

export default LinkWithIcon
