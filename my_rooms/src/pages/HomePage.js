import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get(`${window.location.origin}/api/mern_rooms/getallrooms`)).data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filterByDate = (dates) => {
    if (dates && dates.length === 2) {
      const fromDateObject = dates[0].$d;
      const toDateObject = dates[1].$d;
      const fromDateFormatted = moment(fromDateObject).format("DD-MM-YYYY");
      const toDateFormatted = moment(toDateObject).format("DD-MM-YYYY");

      console.log("Booking From Date:", fromDateFormatted);
      console.log("Booking To Date:", toDateFormatted);

      setFromDate(fromDateFormatted);
      setToDate(toDateFormatted);

      const filteredRooms = duplicateRooms.filter((room) => {
        let availability = true;
        for (const booking of room.currentbookings) {
          const bookingFromDate = moment(booking.fromDate, "DD-MM-YYYY");
          const bookingToDate = moment(booking.toDate, "DD-MM-YYYY");

          const fromDateInRange = moment(
            fromDateFormatted,
            "DD-MM-YYYY"
          ).isBetween(bookingFromDate, bookingToDate, null, "[]");
          const toDateInRange = moment(toDateFormatted, "DD-MM-YYYY").isBetween(
            bookingFromDate,
            bookingToDate,
            null,
            "[]"
          );

          if (fromDateInRange || toDateInRange) {
            availability = false;
            break;
          }
        }
        return availability;
      });

      setRooms(filteredRooms);
    }
  };

  const filterBySearch = () => {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  };

  const filterByType = (e) => {
    setType(e);
    if (e !== "all") {
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  };

  return (
    <div>
      <div className="home_container">
        <div className="dateContainer">
          <div className="dateBox">
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </div>
          <div className="serachFilter">
            <input
              type="text"
              placeholder="Search Rooms"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              onKeyUp={filterBySearch}
            />
          </div>

          <div className="selectDiv">
            <select
              value={type}
              onChange={(e) => {
                filterByType(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="non-delux">Non-Delux</option>
            </select>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          rooms.map((room) => (
            <div className="home_box" key={room.id}>
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
