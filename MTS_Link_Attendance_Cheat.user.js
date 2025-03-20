// ==UserScript==
// @name         MTS Link | Attendance Cheat
// @namespace    https://t.me/xhable
// @version      2025-03-20
// @description  Automatically pass the attendance check in MTS Link without hassle!
// @author       xhable (t.me/xhable)
// @match        https://www.tampermonkey.net/index.php?version=5.3.3&ext=dhdg&updated=true
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mts-link.ru
// @grant        none
// @include      *://*.mts-link.ru/*
// @include      *://mts-link.ru/*
// ==/UserScript==

(function() {
    'use strict';

    function passAttendanceCheck() {
        let currentDt = new Date().toLocaleTimeString();

        let button = Array.from(document.querySelectorAll("button")).find(
            (button) => button.textContent.toLowerCase().trim() === "подтверждаю"
        );

        if (!button) {
            console.debug("👀 | No attendance check found");
            return;
        }

        button.click();

        setTimeout(() => {
            let buttonClose = Array.from(document.querySelectorAll("button")).find(
                (button) => button.textContent.toLowerCase().trim() === "закрыть"
            );

            if (!buttonClose) {
                console.debug("👀 | No close button on attendance check found");
                return;
            }

            buttonClose.click();

            console.info(`✅ | Attendance check passed at ${currentDt}!`);
        }, 1000);
    }

    function stopAttendanceCheck() {
        clearInterval(document.attendanceIntervalId);
        console.info(
            `Interval ${document.attendanceIntervalId} for attendance check cleared.\nTo start it again, paste to console and hit Enter:\nstartAttendanceCheck()`
        );
    }

    function startAttendanceCheck() {
        if (document.attendanceIntervalId) stopAttendanceCheck();
        document.attendanceCheckCount = 0;

        document.attendanceIntervalId = setInterval(() => {
            passAttendanceCheck();
        }, 5000);

        console.warn("🚀 Attendance check auto-passer started!");

        console.info(
            `👀 Interval ${document.attendanceIntervalId} for attendance check set at 5 seconds.\nTo cancel it, paste to console and hit Enter:\nstopAttendanceCheck()`
        );
    }

    startAttendanceCheck();
})();