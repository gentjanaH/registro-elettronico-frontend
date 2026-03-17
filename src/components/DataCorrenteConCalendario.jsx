
import { addDays, subDays, format } from "date-fns";
import { it } from "date-fns/locale";
import { Button } from "react-bootstrap";
const DataCorrenteConCalendario = ({ selectedDate, onChangeDate }) => {

    const prevDay = () => onChangeDate(subDays(selectedDate, 1));
    const nextDay = () => onChangeDate(addDays(selectedDate, 1));

    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };


    return (



        <div className="d-flex align-items-center gap-3 my-3">

            <Button variant="light" onClick={prevDay}>
                ‹
            </Button>

            <div
                className="px-4 py-2 rounded"
                style={{
                    backgroundColor: isToday(selectedDate) ? "#d1e7dd" : "#f8f9fa",
                    border: "1px solid #ccc",
                    fontWeight: "bold"
                }}
            >
                {format(selectedDate, "dd/MM/yyyy", { locale: it })}
            </div>

            <Button variant="light" onClick={nextDay}>
                ›
            </Button>

        </div>



    );

}

export default DataCorrenteConCalendario;