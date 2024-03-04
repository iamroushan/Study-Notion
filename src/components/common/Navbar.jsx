import React, { useEffect, useState } from 'react'
import { Link, Route, matchPath } from 'react-router-dom'
import logo from "../../assets/logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart, AiOutlineMenu} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { ACCOUNT_TYPE } from '../../utils/constant'

// const subLinks = [
//     {
//         title: "python",
//         link: "/catalog/python"
//     },
//     {
//         title: "web dev",
//         link: "/catalog/web-development"
//     }
// ]

const Navbar = () => {
    const {token} = useSelector( (state) => state.auth)
    const {user} =  useSelector((state)=> state.profile)
    const {totalItems} = useSelector( (state) => state.cart)
    const location = useLocation()

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)

   const fetchSubLinks = async() =>{
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
                if (result?.data?.data?.length > 0) {
                    setSubLinks(result?.data?.data);
                }
                localStorage.setItem("sublinks", JSON.stringify(result.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSubLinks()
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/* Image */}
        <Link to="/">
            <img src={logo} width={160} height={42} loading='lazy' />
        </Link>

        {/* Nav Links */}
        <nav className='hidden md:block'>
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                <>
                                    <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                        matchRoute("/catalog/:catalogName")
                                        ? "text-yellow-25"
                                        : "text-richblack-25"
                                    }`}>
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle />

                                        <div className='invisible absolute left-[50%] translate-x-[-50%] 
                                        translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                        <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                        </div>
                                        {loading ? (
                                                <p className='text-center'>Loading...</p>
                                            ) : (subLinks && subLinks.length) ? (
                                                <>
                                                    {subLinks
                                                    ?.filter(
                                                        (subLink) => subLink ?.courses?.length > 0
                                                    )
                                                    ?.map((subLink,i)=>(
                                                        <Link to={`/catalog/${subLink.name
                                                        .split(" ")
                                                        .join("-")
                                                        .toLowerCase()}`}
                                                        className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' key={i}
                                                    >
                                                    <p>{subLink.name}</p>

                                                        </Link>
                                                    ))}
                                                </>
                                            ):(
                                                <p className='text-center'>No Courses Found</p>
                                            )
                                        }

                                        {/* {
                                            subLinks.length ? (
                                                subLinks.map( (subLink, index) => (
                                                    <Link to={`${subLink.link}`} key={index}>
                                                        <p>{subLink.title}</p>
                                                    </Link>
                                                ))
                                                
                                            ) : (<div></div>)
                                        } */}

                                        </div>

                                    </div>
                                </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                        
                                    </Link>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>

        {/* Login/Singup/Dashboard */}
        <div className='md:flex gap-x-4 items-center hidden'>

            {
                user && user?.accountType != ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        {
                            totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }

            {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                        text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }

            {
                token === null && (
                    <Link to="/signup">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                        text-richblack-100 rounded-md'>
                            Sign up
                        </button>
                    </Link>
                )
            }

            {
                token !== null && <ProfileDropDown />
            }

        </div>

        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

        </div>
    </div>
  )
}

export default Navbar