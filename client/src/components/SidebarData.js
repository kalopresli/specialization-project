import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Generate Password',
    path: '/create',
    icon: <IoIcons.IoMdCodeWorking />,
    cName: 'nav-text'
  },
  {
    title: 'Save Password',
    path: '/save',
    icon: <FaIcons.FaLock />,
    cName: 'nav-text'
  },
  {
    title: 'Saved Passwords',
    path: '/passwords',
    icon: <IoIcons.IoMdCloud />,
    cName: 'nav-text'
  },/*
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }*/
];