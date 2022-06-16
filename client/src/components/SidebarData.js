import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';



export const SidebarData = [
  {
    title: 'Password Test',
    path: '/',
    icon: <AiIcons.AiOutlineSecurityScan />,
    cName: 'nav-text'
  },
  {
    title: 'Generate Password',
    path: '/create',
    icon: <GiIcons.GiGears />,
    cName: 'nav-text'
  },
  {
    title: 'Save Password',
    path: '/save',
    icon: <FaIcons.FaLock />,
    cName: 'nav-text'
  },
  {
    title: 'Generate Pin',
    path: '/generatepin',
    icon: <GiIcons.GiGears />,
    cName: 'nav-text'
  },
  {
    title: 'Saved Passwords',
    path: '/passwords',
    icon: <IoIcons.IoMdCloud />,
    cName: 'nav-text'
  },

  {
    title: 'Saved PINs',
    path: '/pins',
    icon: <IoIcons.IoMdCode />,
    cName: 'nav-text'
  },

  {
    title: 'Logout',
    path: '/logout',
    icon: <FaIcons.FaSignOutAlt />,
    cName: 'nav-text'
  }
];