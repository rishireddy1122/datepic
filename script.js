import { format, fromUnixTime, getUnixTime, subMonths, addMonths, startOfWeek, startOfMonth, endOfISOWeek, eachDayOfInterval, getDate, endOfMonth, endOfWeek, isSameMonth, isSameDay } from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datepickerHeaderText = document.querySelector(".current-month");
const nextMonthButton = document.querySelector(".next-month-button");
const prevMonthButton = document.querySelector(".prev-month-button");
const dategrid = document.querySelector(".date-picker-grid-dates")
let currentDate = new Date();


datePickerButton.addEventListener('click', () => {
  datePicker.classList.toggle('show');
  const selectedDate = fromUnixTime(datepickerHeaderText.dataset.selectedDate);
  currentDate = selectedDate;
//   setDate(selectedDate);
});

function setDate(date) {
  datePickerButton.innerText = format(date, 'MMMM do, yyyy');
  datepickerHeaderText.dataset.selectedDate = getUnixTime(date);
  setDatepicker(date);
}

function setDatepicker(selectedDate) {
  datepickerHeaderText.innerText = format(currentDate, "MMMM - yyyy");
  setDates(selectedDate)
 
}

    function setDates(selectedDate)
    {
        const firstWeek = startOfWeek(startOfMonth(currentDate))
        const endWeek = endOfWeek(endOfMonth(currentDate))
        const dates = eachDayOfInterval({start: firstWeek , end : endWeek})
        dategrid.innerHTML=""
        
        dates.forEach(date =>{
            const dateElement = document.createElement("button")
            dateElement.classList.add("date")
            dateElement.innerText = date.getDate()
            if (!isSameMonth(date,currentDate)) {

                dateElement.classList.add("date-picker-other-month-date")
                
            }
            if (isSameDay(date,selectedDate)) {

                dateElement.classList.add("selected")
                
            }
            
             dateElement.addEventListener("click",() =>{
                setDate(date)
                datePicker.classList.remove("show")
             })

            dategrid.appendChild(dateElement)
        })
    }


  nextMonthButton.addEventListener("click", () => {
    currentDate = addMonths(currentDate, 1)
    setDatepicker();
  });

  prevMonthButton.addEventListener("click", () => {
    currentDate = subMonths(currentDate, 1)
    setDatepicker();
  });


// Initialize the date picker with the current date
setDate(new Date());
