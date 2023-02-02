import { useState } from "react"
import { Link } from "react-router-dom"
import "./user.css"
import { RiImageAddLine } from "react-icons/ri"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"

type Props = {}

const user = (props: Props) => {
  //#region : declarations

  //#endregion

  //#region : custom-declarations
  const user = true
  const [isProfileOpen, setIsProfileOpen] = useState<Boolean>(false)
  //#endregion

  //#region : side-effects

  //#endregion

  //#region : functions

  //#endregion

  //jsx rendering
  return (
    <>
      <div className="profile">
        {
          user ? (
            <>
              <button className="img" onClick={() => setIsProfileOpen(prev => !prev)}>
                <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              </button>
              {
                isProfileOpen && (
                  <div className="openProfile boxItems">
                    <Link to="/account">
                      <div className="image">
                        <div className="img">
                          <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </div>
                        <div className="text">
                          <h4>Selva Ganesh M</h4>
                          <p>tuticorin, TN</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/create">
                      <button className="box">
                        <RiImageAddLine className="icon" />
                        <h4>Create Post</h4>
                      </button>
                    </Link>
                    <button className="box">
                      <IoSettingsOutline className="icon" />
                      <h4>My Account</h4>
                    </button>
                    <button className="box">
                      <BsBagCheck className="icon" />
                      <h4>My Order</h4>
                    </button>
                    <button className="box">
                      <GrHelp className="icon" />
                      <h4>Help</h4>
                    </button>
                    <button className="box">
                      <AiOutlineHeart className="icon" />
                      <h4>Whislist</h4>
                    </button>
                    <button className="box">
                      <BiLogOut className="icon" />
                      <h4>Logout</h4>
                    </button>
                  </div>
                )
              }

            </>
          ) : (
            <Link to="/login" style={{ color: "inherit" }}>My Account</Link>
          )
        }
      </div>
    </>
  )
}

export default user