import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuIcon,
  UsersIcon,
  SearchIcon,
  GlobeAltIcon
} from "@heroicons/react/solid";

import ProfileMenu from "../ProfileMenu";
import { loadUser } from "../../redux/actions/userAction";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Header = ({ placeholder }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [guest, setGuest] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection"
  };

  const user = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();

    if (location.trim()) {
      router.push({
        pathname: "/rooms",
        query: {
          location: location.trim(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          guests: guest
        }
      });
    } else {
      router.push("/rooms");
    }
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleReset = () => {
    setLocation("");
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md px-2 py-4 md:px-5">
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Link href="/" passHref>
          <Image
            className="header_icon"
            src="/static/mylogo.svg"
            height="100px"
            width="100px"
            layout="fixed"
            objectFit="contain"
            objectPosition="left"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <form className="w-full" onSubmit={submitHandler}>
          <input
            type="text"
            value={location}
            placeholder={placeholder || "Start your search"}
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
            onChange={(e) => setLocation(e.target.value)}
          />
        </form>
        <SearchIcon
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
          onClick={submitHandler}
        />
      </div>
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline">Become a host</p>
        <GlobeAltIcon className="hidden md:inline h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 md:border-2 rounded-full">
          <MenuIcon className="hidden md:inline-flex h-6" />
          <ProfileMenu user={user} className="h-6" />
        </div>
      </div>

      {location && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
              value={guest}
              min={1}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-500" onClick={handleReset}>
              Cancel
            </button>
            <button className="flex-grow text-red-400" onClick={submitHandler}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
