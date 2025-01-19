import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import "./Calendar.css";

const Calendar = ({ courses }) => {
  return (
    <div className="grid-calendar-container">
      {courses.map((course, index) => (
        <div
          key={index}
          className="solid-cal-slot cal-slot cal-slot-no-drag-and-drop"
          style={{
            gridArea: `${course.starttime} / ${course.day} / ${course.endtime}`,
            color: "grey",
            backgroundColor: "#E8DEF8",
          }}
          draggable="true"
        >
          <div className="cal-slot-container">
            <div className="cal-slot-details">
              <div>{course.name}</div>
            </div>
            <div>{course.section}</div>
          </div>
        </div>
      ))}

      {/* Making the Grif */}
      <div
        className="first-col first-row cal-background-grid"
        style={{ gridArea: "1 / times", zIndex: 2 }}
      ></div>
      <div
        id="MON"
        className="second-col cal-background-grid first-row"
        style={{ gridArea: "1 / Mon", zIndex: 2 }}
      >
        MON
      </div>
      <div
        id="TUE"
        className="cal-background-grid first-row"
        style={{ gridArea: "1 / Tue", zIndex: 2 }}
      >
        TUE
      </div>
      <div
        id="WED"
        className="cal-background-grid first-row"
        style={{ gridArea: "1 / Wed", zIndex: 2 }}
      >
        WED
      </div>
      <div
        id="THU"
        className="cal-background-grid first-row"
        style={{ gridArea: "1 / Thu", zIndex: 2 }}
      >
        THU
      </div>
      <div
        id="Fri"
        className="cal-background-grid first-row"
        style={{ gridArea: "1 / Fri", zIndex: 2 }}
      >
        FRI
      </div>
      <div
        id="8:00"
        className="second-row first-col cal-background-grid"
        style={{ gridArea: "2 / times / 4", zIndex: 2 }}
      >
        8:00
      </div>
      <div
        id="9:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "4 / times / 6", zIndex: 2 }}
      >
        9:00
      </div>
      <div
        id="10:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "6 / times / 8", zIndex: 2 }}
      >
        10:00
      </div>
      <div
        id="11:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "8 / times / 10", zIndex: 2 }}
      >
        11:00
      </div>
      <div
        id="12:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "10 / times / 12", zIndex: 2 }}
      >
        12:00
      </div>
      <div
        id="13:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "12 / times / 14", zIndex: 2 }}
      >
        13:00
      </div>
      <div
        id="14:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "14 / times / 16", zIndex: 2 }}
      >
        14:00
      </div>
      <div
        id="15:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "16 / times / 18", zIndex: 2 }}
      >
        15:00
      </div>
      <div
        id="16:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "18 / times / 20", zIndex: 2 }}
      >
        16:00
      </div>
      <div
        id="17:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "20 / times / 22", zIndex: 2 }}
      >
        17:00
      </div>
      <div
        id="18:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "22 / times / 24", zIndex: 2 }}
      >
        18:00
      </div>
      <div
        id="19:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "24 / times / 26", zIndex: 2 }}
      >
        19:00
      </div>
      <div
        id="20:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "26 / times / 28", zIndex: 2 }}
      >
        20:00
      </div>
      <div
        id="21:00"
        className=" first-col cal-background-grid"
        style={{ gridArea: "28 / times / 30", zIndex: 2 }}
      >
        21:00
      </div>
      <div
        id="8:00MON"
        className="second-row second-col cal-background-grid"
        style={{ gridArea: "2 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="8:00TUE"
        className="second-row second-col cal-background-grid"
        style={{ gridArea: "2 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="8:00WED"
        className="second-row second-col cal-background-grid"
        style={{ gridArea: "2 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="8:00THU"
        className="second-row second-col cal-background-grid"
        style={{ gridArea: "2 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="8:00FRI"
        className="second-row second-col cal-background-grid"
        style={{ gridArea: "2 / Fri", zIndex: 2 }}
      ></div>
      <div
        id="8:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "3 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="8:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "3 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="8:30WED"
        className="cal-background-grid"
        style={{ gridArea: "3 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="8:30THU"
        className="cal-background-grid"
        style={{ gridArea: "3 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="8:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "3 / Fri", zIndex: 2 }}
      ></div>
      <div
        id="9:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "4 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="9:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "4 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="9:00WED"
        className="cal-background-grid"
        style={{ gridArea: "4 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="9:00THU"
        className="cal-background-grid"
        style={{ gridArea: "4 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="9:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "4 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="9:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "5 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="9:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "5 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="9:30WED"
        className="cal-background-grid"
        style={{ gridArea: "5 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="9:30THU"
        className="cal-background-grid"
        style={{ gridArea: "5 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="9:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "5 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="10:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "6 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="10:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "6 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="10:00WED"
        className="cal-background-grid"
        style={{ gridArea: "6 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="10:00THU"
        className="cal-background-grid"
        style={{ gridArea: "6 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="10:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "6 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="10:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "7 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="10:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "7 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="10:30WED"
        className="cal-background-grid"
        style={{ gridArea: "7 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="10:30THU"
        className="cal-background-grid"
        style={{ gridArea: "7 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="10:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "7 / Fri", zIndex: 2 }}
      ></div>
      <div
        id="11:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "8 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="11:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "8 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="11:00WED"
        className="cal-background-grid"
        style={{ gridArea: "8 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="11:00THU"
        className="cal-background-grid"
        style={{ gridArea: "8 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="11:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "8 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="11:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "9 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="11:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "9 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="11:30WED"
        className="cal-background-grid"
        style={{ gridArea: "9 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="11:30THU"
        className="cal-background-grid"
        style={{ gridArea: "9 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="11:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "9 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="12:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "10 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="12:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "10 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="12:00WED"
        className="cal-background-grid"
        style={{ gridArea: "10 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="12:00THU"
        className="cal-background-grid"
        style={{ gridArea: "10 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="12:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "10 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="12:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "11 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="12:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "11 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="12:30WED"
        className="cal-background-grid"
        style={{ gridArea: "11 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="12:30THU"
        className="cal-background-grid"
        style={{ gridArea: "11 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="12:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "11 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="13:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "12 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="13:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "12 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="13:00WED"
        className="cal-background-grid"
        style={{ gridArea: "12 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="13:00THU"
        className="cal-background-grid"
        style={{ gridArea: "12 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="13:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "12 / Fri", zIndex: 2 }}
      ></div>
      <div
        id="13:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "13 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="13:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "13 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="13:30WED"
        className="cal-background-grid"
        style={{ gridArea: "13 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="13:30THU"
        className="cal-background-grid"
        style={{ gridArea: "13 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="13:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "13 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="14:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "14 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="14:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "14 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="14:00WED"
        className="cal-background-grid"
        style={{ gridArea: "14 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="14:00THU"
        className="cal-background-grid"
        style={{ gridArea: "14 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="14:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "14 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="14:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "15 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="14:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "15 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="14:30WED"
        className="cal-background-grid"
        style={{ gridArea: "15 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="14:30THU"
        className="cal-background-grid"
        style={{ gridArea: "15 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="14:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "15 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="15:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "16 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="15:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "16 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="15:00WED"
        className="cal-background-grid"
        style={{ gridArea: "16 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="15:00THU"
        className="cal-background-grid"
        style={{ gridArea: "16 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="15:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "16 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="15:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "17 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="15:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "17 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="15:30WED"
        className="cal-background-grid"
        style={{ gridArea: "17 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="15:30THU"
        className="cal-background-grid"
        style={{ gridArea: "17 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="15:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "17 / Fri", zIndex: 2 }}
      ></div>
      <div
        id="16:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "18 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="16:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "18 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="16:00WED"
        className="cal-background-grid"
        style={{ gridArea: "18 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="16:00THU"
        className="cal-background-grid"
        style={{ gridArea: "18 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="16:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "18 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="16:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "19 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="16:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "19 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="16:30WED"
        className="cal-background-grid"
        style={{ gridArea: "19 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="16:30THU"
        className="cal-background-grid"
        style={{ gridArea: "19 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="16:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "19 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="17:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "20 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="17:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "20 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="17:00WED"
        className="cal-background-grid"
        style={{ gridArea: "20 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="17:00THU"
        className="cal-background-grid"
        style={{ gridArea: "20 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="17:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "20 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="17:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "21 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="17:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "21 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="17:30WED"
        className="cal-background-grid"
        style={{ gridArea: "21 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="17:30THU"
        className="cal-background-grid"
        style={{ gridArea: "21 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="17:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "21 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="18:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "22 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="18:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "22 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="18:00WED"
        className="cal-background-grid"
        style={{ gridArea: "22 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="18:00THU"
        className="cal-background-grid"
        style={{ gridArea: "22 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="18:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "22 / Fri", zIndex: 2 }}
      ></div>
      <div
        id="18:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "23 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="18:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "23 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="18:30WED"
        className="cal-background-grid"
        style={{ gridArea: "23 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="18:30THU"
        className="cal-background-grid"
        style={{ gridArea: "23 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="18:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "23 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="19:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "24 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="19:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "24 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="19:00WED"
        className="cal-background-grid"
        style={{ gridArea: "24 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="19:00THU"
        className="cal-background-grid"
        style={{ gridArea: "24 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="19:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "24 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="19:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "25 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="19:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "25 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="19:30WED"
        className="cal-background-grid"
        style={{ gridArea: "25 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="19:30THU"
        className="cal-background-grid"
        style={{ gridArea: "25 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="19:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "25 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="20:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "26 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="20:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "26 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="20:00WED"
        className="cal-background-grid"
        style={{ gridArea: "26 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="20:00THU"
        className="cal-background-grid"
        style={{ gridArea: "26 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="20:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "26 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="20:30MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "27 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="20:30TUE"
        className="cal-background-grid"
        style={{ gridArea: "27 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="20:30WED"
        className="cal-background-grid"
        style={{ gridArea: "27 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="20:30THU"
        className="cal-background-grid"
        style={{ gridArea: "27 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="20:30FRI"
        className="cal-background-grid"
        style={{ gridArea: "27 / Fri", zIndex: 2 }}
      ></div>
      <div
        id="21:00MON"
        className="second-col cal-background-grid"
        style={{ gridArea: "28 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="21:00TUE"
        className="cal-background-grid"
        style={{ gridArea: "28 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="21:00WED"
        className="cal-background-grid"
        style={{ gridArea: "28 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="21:00THU"
        className="cal-background-grid"
        style={{ gridArea: "28 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="21:00FRI"
        className="cal-background-grid"
        style={{ gridArea: "28 / Fri", zIndex: 2 }}
      ></div>

      <div
        id="21:30MON"
        className="last-row second-col cal-background-grid"
        style={{ gridArea: "29 / Mon", zIndex: 2 }}
      ></div>

      <div
        id="21:30TUE"
        className="last-row cal-background-grid"
        style={{ gridArea: "29 / Tue", zIndex: 2 }}
      ></div>

      <div
        id="21:30WED"
        className="last-row cal-background-grid"
        style={{ gridArea: "29 / Wed", zIndex: 2 }}
      ></div>

      <div
        id="21:30THU"
        className="last-row cal-background-grid"
        style={{ gridArea: "29 / Thu", zIndex: 2 }}
      ></div>

      <div
        id="21:30FRI"
        className="last-row last-col cal-background-grid"
        style={{ gridArea: "29 / Fri", zIndex: 2 }}
      ></div>
    </div>
  );
};

export default Calendar;
